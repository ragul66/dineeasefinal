// Restaurant Detail Component
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiStar as Star,
  FiMapPin as MapPin,
  FiClock as Clock,
  FiPhone as Phone,
} from "react-icons/fi";

const RestaurantDetail = () => {
  const [hotel, setHotel] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("menu");
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/restaurantsdetails/bookrestaurant/${hotelId}`); // Navigate to the home page
  };

  // Get hotel ID from URL params
  const hotelId = window.location.pathname.split("/").pop();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const [hotelResponse, foodResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_API}hotel/${hotelId}`),
          fetch(`${import.meta.env.VITE_API}food/hotels/${hotelId}/food-items`),
        ]);

        // console.log(hotelResponse);
        // console.log(foodResponse);

        if (!hotelResponse.ok || !foodResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [hotelData, foodData] = await Promise.all([
          hotelResponse.json(),
          foodResponse.json(),
        ]);

        setHotel(hotelData);
        setFoodItems(foodData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="text-center text-red-600 p-4">
        Error: {error || "Hotel not found"}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 font-primary">
      {/* Hotel Header */}
      <div className="flex flex-col lg:flex-row bg-orange-100 text-white p-6 lg:p-8 rounded-lg lg:space-x-8 space-y-4 lg:space-y-0">
        {/* Left Section: Hotel Image */}
        <div className="relative w-full lg:w-1/3 h-64 lg:h-auto">
          <img
            src={`${import.meta.env.VITE_API}${hotel.hotelPhotos[0]}`}
            alt={hotel.hotelName}
            className="w-full h-full object-cover rounded-lg"
          />
          {/* "In hotel" Label */}
          <span className="absolute bottom-0 left-0 w-full text-center bg-black bg-opacity-80 py-2 text-sm lg:text-base">
            In hotel
          </span>
        </div>

        {/* Right Section: Hotel Info */}
        <div className="w-full lg:w-2/3 space-y-4">
          {/* Hotel Name */}
          <h1 className="text-2xl lg:text-4xl font-bold text-black ">
            {hotel.hotelName}
          </h1>

          {/* Rating */}
          <div className="flex items-center text-base lg:text-lg">
            <Star className="text-red-500 w-5 h-5 lg:w-6 lg:h-6 mr-1" />
            <span className="text-gray-700">
              {hotel.rating} / 10 ({hotel.reviewCount} Reviews)
            </span>
          </div>

          {/* Available amenities and languages */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-700 rounded-lg text-sm lg:text-base">
              WiFi
            </span>
            <span className="px-3 py-1 bg-gray-700 rounded-lg text-sm lg:text-base">
              Parking
            </span>
            <span className="px-3 py-1 bg-gray-700 rounded-lg text-sm lg:text-base">
              Restaurant
            </span>
            <span className="px-3 py-1 bg-gray-700 rounded-lg text-sm lg:text-base">
              Pool
            </span>
          </div>

          {/* Location, Hours, Phone */}
          <div className="flex flex-wrap gap-4 text-gray-700 text-sm lg:text-base">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
              <span>{hotel.location || "Location not specified"}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
              <span>{hotel.opentime || "Hours not specified"}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
              <span>{hotel.phone || "Phone not available"}</span>
            </div>
          </div>

          {/* Booking Button */}
          <button
            onClick={handleBooking}
            className="w-full lg:w-auto mt-4 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg"
          >
            Book now
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8 border-b mt-8">
        <div className="flex gap-6">
          <button
            className={`pb-2 px-1 ${
              activeTab === "menu"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("menu")}
          >
            Menu
          </button>
          <button
            className={`pb-2 px-1 ${
              activeTab === "photos"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("photos")}
          >
            Photos
          </button>
          <button
            className={`pb-2 px-1 ${
              activeTab === "info"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("info")}
          >
            Information
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "menu" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden mb-4"
            >
              <div className="relative h-48">
                <img
                  src={`${import.meta.env.VITE_API}${item.foodphoto}`}
                  alt={item.foodname}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.foodname}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>

                <div className="text-sm text-gray-500 mb-2">
                  <p>
                    Category:{" "}
                    <span className="font-medium">{item.category}</span>
                  </p>
                  <p>
                    Subcategory:{" "}
                    <span className="font-medium">{item.subcategory}</span>
                  </p>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  <p>
                    Timing: <span className="font-medium">{item.timing}</span>
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">₹{item.price}</span>
                  {/* <span className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "photos" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {hotel.hotelPhotos.map((photo, index) => (
            <div
              key={index}
              className="relative h-64 rounded-lg overflow-hidden"
            >
              <img
                src={`${import.meta.env.VITE_API}${photo}`}
                alt={`${hotel.hotelName} - Photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {activeTab === "info" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Restaurant Information
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700">Business Hours</h3>
              <p className="text-gray-600">
                {hotel.AvailabilityTime || "Not specified"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Contact</h3>
              <p className="text-gray-600">{hotel.phone || "Not available"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Address</h3>
              <p className="text-gray-600">
                {hotel.location || "Not specified"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Certifications</h3>
              <ul className="list-disc list-inside text-gray-600">
                {hotel.FssaicertificateImage && <li>FSSAI Certificate</li>}
                {hotel.nocImage && <li>NOC Certificate</li>}
                {hotel.HTLcertificate && <li>Hotel License</li>}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;
