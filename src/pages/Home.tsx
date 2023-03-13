import { FC } from "react";
import { userDetails } from "../Types/props";
import TaskManagment from "./TaskManagment";
interface homeData {
  userDetails: any;
}

const Home: FC<homeData> = ({ userDetails }) => {
  const user = userDetails;

  return <div>{/* <TaskManagment /> */}</div>;
};

export default Home;
