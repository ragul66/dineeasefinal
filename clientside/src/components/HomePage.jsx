import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const clientId = localStorage.getItem("clientId");

    if (clientId) {
      // Fetch user profile from the server using the clientId (assuming the userId is the same as clientId)
      fetch(`${import.meta.env.VITE_API}user/profile/${clientId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setUser(data); // Store the fetched user data
          }
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}category`); // Adjust the API endpoint accordingly
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 300; // Adjust this value based on your card width
      const newPosition =
        direction === "left"
          ? Math.max(scrollPosition - scrollAmount, 0)
          : Math.min(
              scrollPosition + scrollAmount,
              container.scrollWidth - container.clientWidth
            );

      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-primary">
      <div className="flex flex-col items-center justify-center text-center px-6 py-12  rounded-lg shadow-lg">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-4">
          Welcome to Dineease
        </h2>
        <p className="text-lg md:text-xl font-medium text-orange-400">
          Your Alltime Favorite Bookings!
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-orange-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left Section (Text) */}
            <div className="text-center md:text-left md:w-1/2">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 mt-4">
                Delicious Foods Near Your House
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Choose from thousands of restaurants and book your favorite
                seats
              </p>
              {/* Mobile Search */}
              <div className="relative max-w-2xl mx-auto md:hidden">
                <input
                  type="text"
                  placeholder="Search for restaurants or dishes..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Search
                  className="absolute right-3 top-3.5 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            {/* Right Section (Image) */}
            <div className="md:w-96 mt-8 md:mt-0">
              <img
                src="../src/assets/h1.jpg" // Add your image path here
                alt="Delicious Food"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Food Categories
          </h2>

          {/* Main Categories Carousel */}
          <div className="relative">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white"
            >
              <ChevronLeft size={24} />
            </button>

            <div
              ref={scrollRef}
              className="flex overflow-x-hidden md:gap-4 gap-2 scroll-smooth pb-4"
            >
              {categories.map((category) => (
                <div key={category._id} className="flex-none w-36 p-4">
                  <div className="bg-white rounded-full shadow-sm overflow-hidden">
                    <div
                      className="relative cursor-pointer group rounded-full"
                      onClick={() =>
                        setOpenCategory(
                          openCategory === category._id ? null : category._id
                        )
                      }
                    >
                      <img
                        src={`${import.meta.env.VITE_API}${
                          category.categoryphoto
                        }`}
                        alt={category.category}
                        className="w-28 h-28 object-cover transition-transform duration-300 group-hover:scale-105 rounded-full"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                        <h3 className="text-white text-xl font-semibold">
                          {category.category}
                        </h3>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <ChevronDown
                          className={`text-white transform transition-transform ${
                            openCategory === category._id ? "rotate-180" : ""
                          }`}
                          size={24}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Subcategories Grid */}
          {categories.map(
            (category) =>
              openCategory === category._id && (
                <div
                  key={`sub-${category._id}`}
                  className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn"
                >
                  {category.subcategories.map((sub) => (
                    <div
                      key={sub._id}
                      className="relative group cursor-pointer overflow-hidden rounded-full w-28 h-28  shadow-sm"
                    >
                      <img
                        src={`${import.meta.env.VITE_API}${sub.photo}`}
                        alt={sub.name}
                        className="w-40 h-40 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <span className="text-white font-medium">
                          {sub.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )
          )}
        </div>
      </section>

      {/* Featured Restaurants Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Featured Restaurants
          </h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      </section>

      {/* All Restaurants Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            All Restaurants
          </h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

// import React, { useState, useRef } from "react";
// import { ChevronDown, Search, Star, Clock, MapPin } from "lucide-react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// const categories = [
//   {
//     id: 1,
//     name: "Fast Food",
//     image: "../src/assets/Admin Back1.jpg",
//     subcategories: [
//       { name: "Burgers", image: "/api/placeholder/200/150" },
//       { name: "Pizza", image: "/api/placeholder/200/150" },
//       { name: "Sandwiches", image: "/api/placeholder/200/150" },
//       { name: "Hot Dogs", image: "/api/placeholder/200/150" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Asian Cuisine",
//     image: "/api/placeholder/300/200",
//     subcategories: [
//       { name: "Chinese", image: "/api/placeholder/200/150" },
//       { name: "Japanese", image: "/api/placeholder/200/150" },
//       { name: "Thai", image: "/api/placeholder/200/150" },
//       { name: "Korean", image: "/api/placeholder/200/150" },
//     ],
//   },
//   {
//     id: 3,
//     name: "Indian",
//     image: "/api/placeholder/300/200",
//     subcategories: [
//       { name: "North Indian", image: "/api/placeholder/200/150" },
//       { name: "South Indian", image: "/api/placeholder/200/150" },
//       { name: "Biryani", image: "/api/placeholder/200/150" },
//       { name: "Street Food", image: "/api/placeholder/200/150" },
//     ],
//   },
//   {
//     id: 4,
//     name: "Desserts",
//     image: "/api/placeholder/300/200",
//     subcategories: [
//       { name: "Ice Cream", image: "/api/placeholder/200/150" },
//       { name: "Cakes", image: "/api/placeholder/200/150" },
//       { name: "Pastries", image: "/api/placeholder/200/150" },
//       { name: "Chocolates", image: "/api/placeholder/200/150" },
//     ],
//   },
//   {
//     id: 5,
//     name: "Mediterranean",
//     image: "/api/placeholder/300/200",
//     subcategories: [
//       { name: "Greek", image: "/api/placeholder/200/150" },
//       { name: "Turkish", image: "/api/placeholder/200/150" },
//       { name: "Lebanese", image: "/api/placeholder/200/150" },
//       { name: "Falafel", image: "/api/placeholder/200/150" },
//     ],
//   },
//   {
//     id: 6,
//     name: "Mexican",
//     image: "/api/placeholder/300/200",
//     subcategories: [
//       { name: "Tacos", image: "/api/placeholder/200/150" },
//       { name: "Burritos", image: "/api/placeholder/200/150" },
//       { name: "Enchiladas", image: "/api/placeholder/200/150" },
//       { name: "Quesadillas", image: "/api/placeholder/200/150" },
//     ],
//   },
// ];

// const restaurants = [
//   {
//     id: 1,
//     name: "The Tasty Corner",
//     rating: 4.5,
//     cuisine: "Multi-cuisine",
//     deliveryTime: "30-40",
//     priceRange: "$$",
//     image: "/api/placeholder/400/250",
//     featured: true,
//   },
//   {
//     id: 2,
//     name: "Spice Garden",
//     rating: 4.2,
//     cuisine: "Indian",
//     deliveryTime: "25-35",
//     priceRange: "$",
//     image: "/api/placeholder/400/250",
//   },
//   {
//     id: 3,
//     name: "Pizza Paradise",
//     rating: 4.7,
//     cuisine: "Italian",
//     deliveryTime: "20-30",
//     priceRange: "$$$",
//     image: "/api/placeholder/400/250",
//     featured: true,
//   },
// ];

// const HomePage = () => {
//   const [openCategory, setOpenCategory] = useState(null);
//   const scrollRef = useRef(null);
//   const [scrollPosition, setScrollPosition] = useState(0);

//   const scroll = (direction) => {
//     const container = scrollRef.current;
//     if (container) {
//       const scrollAmount = 300; // Adjust this value based on your card width
//       const newPosition =
//         direction === "left"
//           ? Math.max(scrollPosition - scrollAmount, 0)
//           : Math.min(
//               scrollPosition + scrollAmount,
//               container.scrollWidth - container.clientWidth
//             );

//       container.scrollTo({
//         left: newPosition,
//         behavior: "smooth",
//       });
//       setScrollPosition(newPosition);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-primary">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-2xl font-bold text-orange-600">DineNow</h1>
//             <div className="relative flex-1 mx-8 hidden md:block">
//               <input
//                 type="text"
//                 placeholder="Search for restaurants or dishes..."
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <Search
//                 className="absolute right-3 top-2.5 text-gray-400"
//                 size={20}
//               />
//             </div>
//             <nav className="space-x-4">
//               <button className="px-4 py-2 text-gray-600 hover:text-orange-600">
//                 Login
//               </button>
//               <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
//                 Sign Up
//               </button>
//             </nav>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <div className="bg-orange-100 py-12">
//         <div className="container mx-auto px-4">
//           <div className="text-center">
//             <h2 className="text-4xl font-bold text-gray-800 mb-4">
//               Delicious Foods At near your Houses
//             </h2>
//             <p className="text-xl text-gray-600 mb-8">
//               Choose from thousands of restaurants and Book your Favourite Seats
//             </p>
//             <div className="relative max-w-2xl mx-auto md:hidden">
//               <input
//                 type="text"
//                 placeholder="Search for restaurants or dishes..."
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <Search
//                 className="absolute right-3 top-3.5 text-gray-400"
//                 size={20}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">
//             Food Categories
//           </h2>

//           {/* Main Categories Carousel */}
//           <div className="relative">
//             <button
//               onClick={() => scroll("left")}
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white"
//             >
//               <ChevronLeft size={24} />
//             </button>

//             <div
//               ref={scrollRef}
//               className="flex overflow-x-hidden gap-2 scroll-smooth pb-4"
//             >
//               {categories.map((category) => (
//                 <div key={category.id} className="flex-none w-28 lg:w-64 p-4">
//                   <div className="bg-white rounded-full shadow-sm overflow-hidden w-28">
//                     <div
//                       className="relative cursor-pointer group"
//                       onClick={() =>
//                         setOpenCategory(
//                           openCategory === category.id ? null : category.id
//                         )
//                       }
//                     >
//                       <img
//                         src={category.image}
//                         alt={category.name}
//                         className="w-28 h-28 object-cover transition-transform duration-300 group-hover:scale-105 rounded-full"
//                       />
//                       <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
//                         <h3 className="text-white text-xl font-semibold">
//                           {category.name}
//                         </h3>
//                       </div>
//                       <div className="absolute bottom-2 right-2">
//                         <ChevronDown
//                           className={`text-white transform transition-transform ${
//                             openCategory === category.id ? "rotate-180" : ""
//                           }`}
//                           size={24}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <button
//               onClick={() => scroll("right")}
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white"
//             >
//               <ChevronRight size={24} />
//             </button>
//           </div>

//           {/* Subcategories Grid */}
//           {categories.map(
//             (category) =>
//               openCategory === category.id && (
//                 <div
//                   key={`sub-${category.id}`}
//                   className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn "
//                 >
//                   {category.subcategories.map((sub, index) => (
//                     <div
//                       key={index}
//                       className="relative group cursor-pointer overflow-hidden rounded-full w-40 h-40 shadow-sm"
//                     >
//                       <img
//                         src={sub.image}
//                         alt={sub.name}
//                         className="w-28 h-28 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
//                       />
//                       <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                         <span className="text-white font-medium">
//                           {sub.name}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )
//           )}
//         </div>
//       </section>
//       {/* Featured Restaurants */}
//       <section className="py-12 bg-gray-100">
//         <div className="container mx-auto px-4">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">
//             Featured Restaurants
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {restaurants
//               .filter((r) => r.featured)
//               .map((restaurant) => (
//                 <div
//                   key={restaurant.id}
//                   className="bg-white rounded-lg shadow-sm overflow-hidden"
//                 >
//                   <img
//                     src={restaurant.image}
//                     alt={restaurant.name}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-4">
//                     <div className="flex items-center justify-between mb-2">
//                       <h3 className="text-xl font-semibold">
//                         {restaurant.name}
//                       </h3>
//                       <span className="flex items-center text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
//                         <Star size={16} className="mr-1" fill="currentColor" />
//                         {restaurant.rating}
//                       </span>
//                     </div>
//                     <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
//                     <div className="flex items-center justify-between text-sm text-gray-500">
//                       <span className="flex items-center">
//                         <Clock size={16} className="mr-1" />
//                         {restaurant.deliveryTime} mins
//                       </span>
//                       <span className="flex items-center">
//                         <MapPin size={16} className="mr-1" />
//                         2.5 km
//                       </span>
//                       <span>{restaurant.priceRange}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </section>

//       {/* All Restaurants */}
//       <section className="py-12">
//         <div className="container mx-auto px-4">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">
//             All Restaurants
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {restaurants.map((restaurant) => (
//               <div
//                 key={restaurant.id}
//                 className="bg-white rounded-lg shadow-sm overflow-hidden"
//               >
//                 <img
//                   src={restaurant.image}
//                   alt={restaurant.name}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <h3 className="text-xl font-semibold">{restaurant.name}</h3>
//                     <span className="flex items-center text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
//                       <Star size={16} className="mr-1" fill="currentColor" />
//                       {restaurant.rating}
//                     </span>
//                   </div>
//                   <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
//                   <div className="flex items-center justify-between text-sm text-gray-500">
//                     <span className="flex items-center">
//                       <Clock size={16} className="mr-1" />
//                       {restaurant.deliveryTime} mins
//                     </span>
//                     <span className="flex items-center">
//                       <MapPin size={16} className="mr-1" />
//                       2.5 km
//                     </span>
//                     <span>{restaurant.priceRange}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;
