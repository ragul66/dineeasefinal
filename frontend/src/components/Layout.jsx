// src/components/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar
import Footer from "../components/Footer"; // Import Footer

const Layout = () => {
  return (
    <div>
      <Navbar /> {/* Navbar is always displayed */}
      <main>
        <Outlet /> {/* Content will be rendered here */}
      </main>
      <Footer /> {/* Footer is always displayed */}
    </div>
  );
};

export default Layout;
