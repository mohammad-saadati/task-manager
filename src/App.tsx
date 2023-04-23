import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import api from "./utils/axios";
import DefaultLayout from "./layouts/default";
import Home from "./pages/Home";
import Board from "./pages/Board";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch";
import Test from "./pages/Test";
import EditorTest from "./pages/EditorTest";
import Disconnected from "./pages/Disconnected";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setCurrentUser } from "./store/features/currentUser";

function App() {
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const getUser = useCallback(async () => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/disconnected" ||
      loading
    )
      return;

    setLoading(true);

    try {
      const url = `/auth/login/success`;
      const res = await api.get(url);

      if (!res.data.error) {
        dispatch(setCurrentUser(res.data.user));
      }
    } catch (err) {
      console.log("getUser", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <div>Loading ...</div>;
  if (Object.keys(currentUser).length === 0) <Navigate to="/login" />;

  return (
    <div className="">
      <DefaultLayout>
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? (
                <Home userDetails={currentUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/test-editor" element={<EditorTest />} />
          <Route path="/test" element={<Test />} />
          <Route
            path="/board/:id"
            element={currentUser ? <Board /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={currentUser ? <Signup /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/disconnected" element={<Disconnected />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </DefaultLayout>
    </div>
  );
}

export default App;
