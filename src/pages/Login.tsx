import { FC } from "react";
import axios from "../utils/axios";
import Button from "@mui/material/Button";
// icons
import GoogleIcon from "@mui/icons-material/Google";
//
import { useLocation } from "react-router-dom";

const Login: FC = () => {
  const location = useLocation();

  const googleAuth = () => {
    window.open(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-10">Log in</h1>
      <Button
        onClick={googleAuth}
        variant="outlined"
        startIcon={<GoogleIcon fontSize="small" color="primary" />}
      >
        Continue with Google
      </Button>
    </div>
  );
};

export default Login;
