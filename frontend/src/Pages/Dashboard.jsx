// pages/Dashboard.js
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [hotelId, setHotelId] = useState(null);
  const [hotelData, setHotelData] = useState(null);
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setMessage("Please login Admin to see all your updated Histories.");
        return;
      }

      try {
        // Fetch user data to get the hotelId
        const response = await fetch(
          `${import.meta.env.VITE_API}admin/admininfo/${userId}`
        );
        const data = await response.json();
        // console.log(data);

        if (response.ok) {
          if (data.hotels && data.hotels.length > 0) {
            const fetchedHotelId = data.hotels[0]; // Get the first hotel ID
            setHotelId(fetchedHotelId);
            fetchHotelData(fetchedHotelId); // Fetch hotel data using hotelId
          } else {
            setMessage("Go to profile and update your hotel details.");
          }
        } else {
          setMessage("Error loading data. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Error loading data. Please try again later.");
      }
    };

    const fetchHotelData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}hotel/admin-hotels/${userId}`
        );
        const hotel = await response.json();
        // console.log(hotel);
        if (response.ok) {
          setHotelData(hotel);
        } else {
          setMessage("Could not load hotel data.");
        }
      } catch (error) {
        console.error("Error fetching hotel data:", error);
        setMessage("Error loading hotel data.");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-4 font-primary">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {message ? (
        <p className="text-blue-600 font-bold">{message}</p>
      ) : (
        <>
          {hotelData ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-200 p-4 rounded shadow">
                <h3>Total Bookings</h3>
                <p className="text-3xl font-bold">150</p>
              </div>
              <div className="bg-blue-200 p-4 rounded shadow">
                <h3>Active Restaurants</h3>
                <p className="text-3xl font-bold">50</p>
              </div>
              <div className="bg-red-200 p-4 rounded shadow">
                <h3>Pending Reservations</h3>
                <p className="text-3xl font-bold">12</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Loading hotel information...</p>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
