import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import TaskManagment from "./views/TaskManagment";
import Test from "./views/Test";
import { Provider } from "react-redux";
import store from "./store/index";
import Modal from "./components/Modal";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/task-managment" element={<TaskManagment />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
      <Modal />
    </Provider>
  </React.StrictMode>
);
