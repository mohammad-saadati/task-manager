import { FC, ReactNode } from "react";

import Sidebar from "../components/Sidebar";
import Appbar from "../components/Appbar";
import Modal from "../components/Modal";

import { useLocation } from "react-router-dom";

export interface Props {
  children?: ReactNode;
}

const defaultLayout: FC<Props> = ({ children }) => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/login" &&
      location.pathname !== "/disconnected" ? (
        <>
          <Appbar />
          <Sidebar />
        </>
      ) : null}

      <div className="py-20 px-6">{children}</div>
      <Modal />
    </div>
  );
};

export default defaultLayout;
