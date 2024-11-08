import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";

// Restaurant Card Component
const RestaurantCard = ({ hotel }) => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-4  ">
      <div
        onClick={() => navigate(`/restaurantdetails/${hotel._id}`)}
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={`${import.meta.env.VITE_API}${hotel.hotelPhotos[0]}`}
            alt={hotel.hotelName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{hotel.hotelName}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {hotel.location || "Location not specified"}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{hotel.opentime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Restaurants List Component
const RestaurantsList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}hotel/admin-hotels`
        );

        // Log the response for debugging
        console.log("Response Status:", response.status);
        console.log(
          "Response Content-Type:",
          response.headers.get("content-type")
        );

        if (!response.ok)
          throw new Error(`Failed to fetch hotels: ${response.status}`);

        // Check if the response is JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setHotels(data);
          } else {
            throw new Error("Unexpected data format");
          }
        } else {
          throw new Error("Expected JSON response, received something else");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Restaurants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <RestaurantCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantsList;
