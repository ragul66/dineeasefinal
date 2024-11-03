import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Bell,
  Settings,
  User,
  Search,
  Home,
  Users,
  BarChart2,
  Box,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  const navItems = [
    { icon: Home, text: "Dashboard", href: "/dashboard" },
    { icon: Users, text: "Users", href: "#" },
    { icon: Box, text: "categoryupload", href: "/categoryupload" },
    { icon: BarChart2, text: "Analytics", href: "#" },
  ];

  // Update active page based on current URL
  useEffect(() => {
    const path = window.location.pathname;
    // Remove leading slash and convert to lowercase for comparison
    const currentPath = path.slice(1).toLowerCase();

    // Find matching nav item
    const matchingItem = navItems.find((item) => {
      const itemPath = item.href.slice(1).toLowerCase();
      return (
        currentPath === itemPath || (currentPath === "" && item.href === "/")
      );
    });

    if (matchingItem) {
      setActivePage(matchingItem.text);
    }
  }, []);

  // Function to handle navigation clicks
  const handleNavClick = (text) => {
    setActivePage(text);
    setIsOpen(false);
  };

  // Function to determine if a nav item is active
  const isActive = (text) => activePage === text;

  return (
    <nav className="bg-white  text-gray-600 shadow-lg font-primary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-indigo-600">
              SuperAdmin
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.text}
                href={item.href}
                onClick={() => handleNavClick(item.text)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors duration-200
                  ${
                    isActive(item.text)
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                <item.icon
                  size={18}
                  className={isActive(item.text) ? "animate-pulse" : ""}
                />
                <span>{item.text}</span>
              </a>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-white border-2 border-black rounded-lg px-3 py-1">
            <Search size={18} className="text-black" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none focus:outline-none text-black placeholder-black ml-2"
            />
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="hover:text-indigo-200 transition-colors duration-200 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
                3
              </span>
            </button>
            <button className="hover:text-indigo-200 transition-colors duration-200">
              <Settings size={20} />
            </button>
            <button className="flex items-center space-x-2 hover:text-indigo-200 transition-colors duration-200">
              <User size={20} />
              <span>Admin</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-indigo-200 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="flex items-center bg-white borer-2 border-black rounded-lg px-3 py-2">
                <Search size={18} className="text-indigo-200" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none focus:outline-none text-white placeholder-indigo-200 ml-2 w-full"
                />
              </div>

              {/* Mobile Nav Items */}
              {navItems.map((item) => (
                <a
                  key={item.text}
                  href={item.href}
                  onClick={() => handleNavClick(item.text)}
                  className={`flex items-center space-x-2 px-2 py-2 rounded-md transition-colors duration-200
                    ${
                      isActive(item.text)
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                >
                  <item.icon
                    size={18}
                    className={isActive(item.text) ? "animate-pulse" : ""}
                  />
                  <span>{item.text}</span>
                </a>
              ))}

              {/* Mobile Action Items */}
              <div className="border-t border-indigo-500 pt-4 space-y-4">
                <button className="flex items-center space-x-2 text-white hover:bg-indigo-500 transition-colors duration-200 w-full px-2 py-2 rounded-md">
                  <Bell size={18} />
                  <span>Notifications</span>
                  <span className="bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center ml-auto">
                    3
                  </span>
                </button>
                <button className="flex items-center space-x-2 text-white hover:bg-indigo-500 transition-colors duration-200 w-full px-2 py-2 rounded-md">
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
                <button className="flex items-center space-x-2 text-white hover:bg-indigo-500 transition-colors duration-200 w-full px-2 py-2 rounded-md">
                  <User size={18} />
                  <span>Profile</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
