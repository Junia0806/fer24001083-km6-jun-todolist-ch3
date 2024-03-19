import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RamadhanListApp from "./RamadhanApp.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/ritual-app",
    element: <RamadhanListApp/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
