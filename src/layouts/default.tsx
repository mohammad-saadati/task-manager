import { FC, ReactNode } from "react";

import Sidebar from "../components/Sidebar";
import Appbar from "../components/Appbar";

export interface Props {
  children?: ReactNode;
}

const defaultLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Appbar />
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

export default defaultLayout;
