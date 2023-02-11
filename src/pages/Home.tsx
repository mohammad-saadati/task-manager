import { FC } from "react";
import { userDetails } from "../Types/props";

interface homeData {
  userDetails: userDetails;
}

const Home: FC<homeData> = ({ userDetails }) => {
  const user = userDetails.user;
  const logout = () => {
    window.open(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/logout`,
      "_self"
    );
  };
  return (
    <div>
      <h1>home page</h1>
      <div>welcome {user.name}</div>
      <div onClick={logout}>log out</div>
    </div>
  );
};

export default Home;
