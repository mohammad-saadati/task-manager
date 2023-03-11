import { FC } from "react";
import axios from "../utils/axios";
import Button from "@mui/material/Button";
// icons
import GoogleIcon from "@mui/icons-material/Google";
//
import { useLocation } from "react-router-dom";

const Login: FC = () => {
  const location = useLocation();

  console.log(location);

  const googleAuth = () => {
    window.open(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">Log in</h1>
      <button
        className="flex justify-center items-center"
        type="button"
        onClick={googleAuth}
      >
        <GoogleIcon fontSize="small" color="primary" />
        Continue with Goggle
      </button>
    </div>
  );
};

export default Login;
