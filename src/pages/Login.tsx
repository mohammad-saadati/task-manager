import { FC } from "react";
import axios from "../utils/axios";
import Button from '@mui/material/Button';

const Login: FC = () => {
  const googleAuth = () => {
    window.open(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };

  return (
    <div>
      <h1>Sign in</h1>
      <form action="/login/password" method="post">
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="current-password">Password</label>
          <input
            id="current-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <button type="submit">Sign in</button>
      </form>
      <button type="button" onClick={googleAuth}>
        Login with google
      </button>
    </div>
  );
};

export default Login;
