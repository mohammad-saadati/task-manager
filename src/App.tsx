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
        setUser((prevState) => ({ ...prevState, ...res.data.user }));
        dispatch(setCurrentUser(res.data.user));
      } else {
        window.location.pathname === "/login";
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

  if (!user && loading) return <div>Loading ...</div>;

  return (
    <div className="container">
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Home userDetails={user} />} />
          <Route path="/board/:id" element={<Board />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </DefaultLayout>
    </div>
  );
}

export default App;
