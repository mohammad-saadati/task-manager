import { FC } from "react";
import { userDetails } from "../Types/props";
import Canvas from "../components/CanvasBoard";
import TaskManagment from "./TaskManagment";
interface homeData {
  userDetails: any;
}

const Home: FC<homeData> = ({ userDetails }) => {
  const user = userDetails;
  console.log(userDetails);
  const logout = () => {
    window.open(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/logout`,
      "_self"
    );
  };
  return (
    <div>
      <div>welcome {user.username}</div>
      <div onClick={logout}>log out</div>
      <TaskManagment />
    </div>
  );
};

export default Home;
