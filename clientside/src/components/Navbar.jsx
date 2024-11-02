import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuIcon, XIcon, SearchIcon } from "@heroicons/react/outline";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Bookings", path: "/bookings" },
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-orange-400 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center lg:border-b-0 border-b-2 border-gray-400">
        {/* Logo and Company Name */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 flex items-center rounded-full">
            <img
              className="rounded-lg"
              src="../src/assets/Admin Back1.jpg"
              alt="Dineease Logo"
            />
          </div>
          <NavLink to="/" className="text-2xl font-bold text-white">
            Dineease
          </NavLink>
        </div>

        {/* Desktop Search Bar (hidden on mobile) */}
        <div className="hidden md:flex flex-grow items-center mx-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 rounded-md text-gray-800"
            />
            <SearchIcon className="absolute left-3 top-2 w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Mobile Search Bar (visible on mobile only) */}
        <div className="flex items-center md:hidden">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search..."
              className="py-2 pl-10 pr-4 rounded-md text-gray-800 w-40"
            />
            <SearchIcon className="absolute left-3 top-2 w-5 h-5 text-gray-500" />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="text-gray-300 focus:outline-none"
          >
            {isOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex space-x-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 font-medium rounded-md transition ${
                  isActive
                    ? "text-white border-b-2 border-white"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <nav className="md:hidden bg-orange-400">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `block px-4 py-2 font-medium rounded-md transition ${
                    isActive
                      ? "text-white border-b-2 border-white w-fit"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
