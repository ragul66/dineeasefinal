import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

//Pages
import Register from "../src/Pages/Register";
import Login from "./Pages/Login";
import { Home } from "./Pages/Home";
import Layout from "./components/Layout";
import Reservations from "./Pages/Reservation";
import ProfilePage from "./Pages/Profile";
import AddOrDisplayHotel from "./Pages/Hotels";
import Fooditems from "./Pages/Fooditems";

import AdminHotels from "./components/dummy";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <Layout />, // Only applied to these children routes
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/reservation",
        element: <Reservations />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/hotel",
        element: <AddOrDisplayHotel />,
      },

      {
        path: "/fooditems",
        element: <Fooditems />,
      },
      {
        path: "/dummy",
        element: <AdminHotels />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
