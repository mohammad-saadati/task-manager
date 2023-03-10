import { FC } from "react";
import { userDetails } from "../Types/props";
import Canvas from "../components/CanvasBoard";
import TaskManagment from "./TaskManagment";
interface homeData {
  userDetails: any;
}

const Home: FC<homeData> = ({ userDetails }) => {
  const user = userDetails;

  ;
  return (
    <div>
      <div className="inline" onClick={logout}>
        log out
      </div>
      {/* <TaskManagment /> */}
    </div>
  );
};

export default Home;
