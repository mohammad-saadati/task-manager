import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import api from "./utils/axios";
import DefaultLayout from "./layouts/default";
import Home from "./pages/Home";
import Board from "./pages/Board";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAppDispatch } from "./store/hooks";
import { setCurrentUser } from "./store/features/currentUser";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const getUser = useCallback(async () => {
    if (location.pathname === "/login" || loading) return;

    setLoading(true);

    try {
      const url = `/auth/login/success`;
      const res = await api.get(url);
      console.log("**************", res, res.data, res.data.error);
      if (!res.data.error) {
        setUser({ ...res.data.user });
        dispatch(setCurrentUser(res.data.user));
      }
      console.log("res.data.user", res.data.user);
    } catch (err) {
      console.log("getUser", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  if ((!user || loading) && window.location.pathname !== "/login")
    return <div>Loading ...</div>;

  return (
    <div className="container">
      <DefaultLayout>
        <Routes>
          <Route
            path="/"
            element={
              user ? <Home userDetails={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/board/:id"
            element={user ? <Board /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={user ? <Signup /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </DefaultLayout>
    </div>
  );
}

export default App;
