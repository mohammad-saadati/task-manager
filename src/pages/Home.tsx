import { FC } from "react";
import { userDetails } from "../Types/props";
interface homeData {
  userDetails: any;
}

const Home: FC<homeData> = ({ userDetails }) => {
  const user = userDetails;

  return <div></div>;
};

export default Home;
