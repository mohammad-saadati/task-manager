import { FC } from "react";
import { Link } from "react-router-dom";

const Singup: FC = () => {
  const googleAuth = () => {
    window.open(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };
  return (
    <>
      <button type="button" onClick={googleAuth}>
        Sign up with google
      </button>
      <p>
        already have account? <Link to="/login">login</Link>
      </p>
    </>
  );
};
export default Singup;
