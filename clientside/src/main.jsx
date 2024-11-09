import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

//Pages
import Layout from "./components/Layout";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import RestaurantsList from "./Pages/Restaurants";
import RestaurantDetail from "./components/RestaurantDetail";
import AboutUs from "./Pages/AboutUs";
import Bookings from "./Pages/Bookings";
import BookRestaurant from "./components/BookRestaurant";
import Profile from "./Pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/restaurants",
        element: <RestaurantsList />,
      },
      {
        path: `/restaurantdetails/:hotelid`,
        element: <RestaurantDetail />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/booking",
        element: <Bookings />,
      },
      {
        path: "/restaurantsdetails/bookrestaurant/:hotelName/:hotelId",
        element: <BookRestaurant />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
