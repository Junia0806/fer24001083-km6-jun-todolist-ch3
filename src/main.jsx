import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RamadhanListApp from "./RamadhanApp.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home.jsx";

//mengisiasi object router 
const router = createBrowserRouter([
  {
    path: "/", //menentukan url
    element: <Home/>, //komponen yang akan ditampilkan
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
