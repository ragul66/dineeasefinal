import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Search,
  Home,
  CalendarCheck,
  UtensilsCrossed,
  Info,
  Phone,
  Star,
  LogOut,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("clientId");
    navigate("/");
  };

  const menuItems = [
    { label: "Home", path: "/home", icon: Home },
    { label: "Restaurants", path: "/restaurants", icon: UtensilsCrossed },
    { label: "Special Events", path: "/spclevents", icon: Star },
    { label: "Bookings", path: "/booking", icon: CalendarCheck },
    { label: "About Us", path: "/about", icon: Info },
    { label: "Contact", path: "/contactDineease", icon: Phone },
  ];

  // Close menu on navigation
  const handleNavLinkClick = () => setIsMenuOpen(false);

  return (
    <nav className="bg-orange-50 shadow-lg font-primary fixed top-0  w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl md:text-3xl font-bold font-secondary text-orange-600">
              Dineease
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 group ${
                      isActive
                        ? "text-blue-600 bg-gray-100"
                        : "text-black hover:text-blue-600"
                    }`
                  }
                >
                  <IconComponent className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              onClick={() => navigate("/profile")}
            >
              <User className="h-5 w-5 text-black" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-2">Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  onClick={handleNavLinkClick} // Close menu on navigation
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600 bg-gray-100"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Menu,
//   X,
//   User,
//   Search,
//   ShoppingBag,
//   Home,
//   CalendarCheck,
//   UtensilsCrossed,
//   Info,
//   Phone,
//   Star,
//   LogOut,
// } from "lucide-react";
// import { NavLink, useLocation } from "react-router-dom";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handlelogout = () => {
//     localStorage.removeItem("clientId");
//     navigate("/");
//   };

//   const menuItems = [
//     { label: "Home", path: "/home", icon: Home },
//     { label: "Restaurants", path: "/restaurants", icon: UtensilsCrossed },
//     { label: "Special Events", path: "/spclevents", icon: Star },
//     { label: "Bookings", path: "/booking", icon: CalendarCheck },
//     { label: "About Us", path: "/about", icon: Info },
//     { label: "Contact", path: "/contact", icon: Phone },
//   ];

//   // Close menu on navigation
//   const handleNavLinkClick = () => setIsMenuOpen(false);

//   return (
//     <nav className="bg-orange-50 shadow-lg font-primary">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0 flex items-center">
//             <span className="text-2xl md:text-3xl font-bold font-secondary text-orange-600">
//               Dineease
//             </span>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-6">
//             {menuItems.map((item) => {
//               const IconComponent = item.icon;
//               return (
//                 <NavLink
//                   key={item.label}
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 group ${
//                       isActive
//                         ? "text-blue-600 bg-gray-100"
//                         : "text-black hover:text-blue-600"
//                     }`
//                   }
//                 >
//                   <IconComponent className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
//                   <span>{item.label}</span>
//                 </NavLink>
//               );
//             })}
//           </div>

//           {/* Right side icons */}
//           <div className="flex items-center space-x-4 ">
//             <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
//               <Search className="h-5 w-5 text-gray-600" />
//             </button>
//             <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
//               <User
//                 className="h-5 w-5 text-black"
//                 onClick={() => navigate("/profile")}
//               />
//             </button>
//             {/* <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 relative">
//               <ShoppingBag className="h-5 w-5 text-gray-600" />
//               <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
//                 0
//               </span>
//             </button> */}
//             <button
//               onClick={() => handlelogout()}
//               className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//             >
//               <LogOut className="w-5 h-5" />
//               <span className="ml-2">Logout</span>
//             </button>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-200"
//             >
//               {isMenuOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             {menuItems.map((item) => {
//               const IconComponent = item.icon;
//               return (
//                 <NavLink
//                   key={item.label}
//                   to={item.path}
//                   onClick={handleNavLinkClick} // Close menu on navigation
//                   className={({ isActive }) =>
//                     `flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
//                       isActive
//                         ? "text-blue-600 bg-gray-100"
//                         : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
//                     }`
//                   }
//                 >
//                   <IconComponent className="h-5 w-5" />
//                   <span>{item.label}</span>
//                 </NavLink>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
