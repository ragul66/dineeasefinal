import React, { useState } from "react";
import {
  Bell,
  Home,
  Menu,
  X,
  Users,
  Settings,
  Hotel,
  Coffee,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "Dashboard",
      path: "/home",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Reservation",
      path: "/reservation",
    },
    {
      icon: <Hotel className="w-5 h-5" />,
      label: "Hotel Info",
      path: "/hotel",
    },
    {
      icon: <Coffee className="w-5 h-5" />,
      label: "Food Items",
      path: "/fooditems",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Profile",
      path: "/profile",
    },
  ];

  const handlelogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-gray-800">Admin</span>
              <span className="text-2xl font-bold text-gray-800">Panel</span>
              <span className="text-2xl font-bold text-indigo-600">
                Dineease
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out
                  ${
                    isActive(item.path)
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right side items */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            </button>
            <button
              onClick={() => handlelogout()}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-2">Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium
                ${
                  isActive(item.path)
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => handlelogout()}
            className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-2">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { useState } from "react";
// import {
//   Bell,
//   Home,
//   Menu,
//   X,
//   Users,
//   Settings,
//   FileText,
//   BarChart2,
//   LogOut,
// } from "lucide-react";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activePath, setActivePath] = useState("/dashboard");

//   const toggleMenu = () => setIsOpen(!isOpen);

//   const isActive = (path) => activePath === path;

//   const navItems = [
//     {
//       icon: <Home className="w-5 h-5" />,
//       label: "Dashboard",
//       path: "/home",
//     },
//     {
//       icon: <BarChart2 className="w-5 h-5" />,
//       label: "Analytics",
//       path: "/analytics",
//     },
//     {
//       icon: <FileText className="w-5 h-5" />,
//       label: "Reservation",
//       path: "/reservation",
//     },
//     { icon: <Users className="w-5 h-5" />, label: "Users", path: "/users" },
//     {
//       icon: <Settings className="w-5 h-5" />,
//       label: "profile",
//       path: "/profile",
//     },
//   ];

//   return (
//     <nav className="bg-white shadow-lg border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Logo and Brand */}
//           <div className="flex items-center">
//             <div className="flex-shrink-0 flex items-center">
//               <span className="text-2xl font-bold text-indigo-600">Admin</span>
//               <span className="text-2xl font-bold text-gray-800">Panel</span>
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex md:items-center md:space-x-4">
//             {navItems.map((item) => (
//               <button
//                 key={item.path}
//                 onClick={() => setActivePath(item.path)}
//                 className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out
//                   ${
//                     isActive(item.path)
//                       ? "bg-indigo-100 text-indigo-700"
//                       : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                   }`}
//               >
//                 {item.icon}
//                 <span className="ml-2">{item.label}</span>
//               </button>
//             ))}
//           </div>

//           {/* Right side items */}
//           <div className="hidden md:flex md:items-center md:space-x-4">
//             <button className="p-2 text-gray-600 hover:text-gray-900 relative">
//               <Bell className="w-6 h-6" />
//               <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
//             </button>
//             <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
//               <LogOut className="w-5 h-5" />
//               <span className="ml-2">Logout</span>
//             </button>
//           </div>

//           {/* Mobile menu button */}
//           <div className="flex items-center md:hidden">
//             <button
//               onClick={toggleMenu}
//               className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
//             >
//               {isOpen ? (
//                 <X className="block h-6 w-6" />
//               ) : (
//                 <Menu className="block h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//           {navItems.map((item) => (
//             <button
//               key={item.path}
//               onClick={() => {
//                 setActivePath(item.path);
//                 setIsOpen(false);
//               }}
//               className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium
//                 ${
//                   isActive(item.path)
//                     ? "bg-indigo-100 text-indigo-700"
//                     : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                 }`}
//             >
//               {item.icon}
//               <span className="ml-2">{item.label}</span>
//             </button>
//           ))}
//           <button className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
//             <LogOut className="w-5 h-5" />
//             <span className="ml-2">Logout</span>
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
