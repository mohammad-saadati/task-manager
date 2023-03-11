import { FC, ReactNode } from "react";

import Sidebar from "../components/Sidebar";
import Appbar from "../components/Appbar";

import { useLocation } from "react-router-dom";

export interface Props {
  children?: ReactNode;
}

const defaultLayout: FC<Props> = ({ children }) => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/login" ? (
        <>
          <Appbar />
          <Sidebar />
        </>
      ) : null}

      <div className="py-20 px-6">{children}</div>
    </div>
  );
};

export default defaultLayout;
