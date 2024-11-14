import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

//pages
import SuperAdminApproval from "./pages/superadmin";
import Categoryupload from "./pages/Categoryupload";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Carouselupload from "./pages/Carouselupload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <SuperAdminApproval />,
      },
      {
        path: "/categoryupload",
        element: <Categoryupload />,
      },
      {
        path: "/carouselUpload",
        element: <Carouselupload />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
