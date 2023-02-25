import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./utils/axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  const getUser = async () => {
    if (location.pathname === "/login") return;
    try {
      const url = `/auth/login/success`;
      const res = await api.get(url);
      if (res) setUser((prevState) => ({ ...prevState, ...res.data.user }));
      console.log("res.data.user", res.data.user);
      console.log("user", user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            user ? <Home userDetails={user} /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
    </div>
  );
}

export default App;
