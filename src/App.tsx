import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const location = useLocation();
  const dispatch = useAppDispatch();

  const getUser = async () => {
    if (location.pathname === "/login") return;
    try {
      const url = `/auth/login/success`;
      const res = await api.get(url);
      if (res) setUser((prevState) => ({ ...prevState, ...res.data.user }));
      console.log("user after setUser", user);
      dispatch(setCurrentUser(user));
      console.log("res.data.user", res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>
      </DefaultLayout>
    </div>
  );
}

export default App;
