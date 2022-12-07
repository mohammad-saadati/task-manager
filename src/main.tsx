import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import TaskManagment from "./views/TaskManagment";
import { Provider } from "react-redux";
import store from "./store/index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/task-managment" element={<TaskManagment />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
