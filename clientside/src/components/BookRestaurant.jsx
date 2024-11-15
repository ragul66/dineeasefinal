import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import Swal from "sweetalert2"; // Import SweetAlert2

const BookHotel = () => {
  const [hotelData, setHotelData] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [restaurantName, setRestaurantName] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [orderItems, setOrderItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get userId from localStorage (in real app this would be set during login)
  const userId = localStorage.getItem("clientId");

  useEffect(() => {
    // Get the current URL and extract the restaurant name (in this case, the 3rd part of the path)
    const path = window.location.pathname.split("/");
    const hotelId = path[4]; // The restaurant name should be at the second index in the path
    setRestaurantName(hotelId);
    // console.log(restaurantName);
  }, []);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}hotel/${restaurantName}`
        );
        if (!response.ok) throw new Error("Failed to fetch hotel data");
        const data = await response.json();

        setHotelData(data); // Assuming data is the full hotel data, not an array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [restaurantName]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}food/hotels/${restaurantName}/food-items`
        );
        // console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch food items");
        }
        const data = await response.json();
        setFoodItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, [hotelData]);

  useEffect(() => {
    // Calculate total amount whenever order items change
    if (hotelData) {
      const newTotal = Object.entries(orderItems).reduce(
        (sum, [id, quantity]) => {
          const item = hotelData.FoodItem.find((item) => item._id === id);
          return sum + (item ? item.price * quantity : 0);
        },
        0
      );
      setTotalAmount(newTotal);
    }
  }, [orderItems, hotelData]);

  // Generate time slots based on opentime
  const generateTimeSlots = () => {
    if (!hotelData) return [];

    const [startTime] = hotelData.opentime.split("-");
    const baseTime = new Date(`2024-01-01 ${startTime}`);

    return Array.from({ length: 5 }, (_, i) => {
      const slotTime = new Date(baseTime.getTime() + i * 60 * 60 * 1000);
      return {
        time: slotTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        type:
          i < 2 ? "Standard Room" : i < 4 ? "Deluxe Suite" : "Premium Suite",
      };
    });
  };

  const handleBooking = (slot) => {
    setSelectedSlot(slot);
    console.log(selectedSlot);
  };

  const handleGuestChange = (increment) => {
    setGuestCount((prev) => Math.max(1, prev + increment));
  };

  const handleQuantityChange = (id, change) => {
    setOrderItems((prevOrderItems) => {
      const updatedOrderItems = {
        ...prevOrderItems,
        [id]: (prevOrderItems[id] || 0) + change,
      };

      if (updatedOrderItems[id] <= 0) {
        delete updatedOrderItems[id];
      }

      return updatedOrderItems;
    });
  };

  //update the total amount
  useEffect(() => {
    const newTotalAmount = Object.keys(orderItems).reduce((total, id) => {
      const item = foodItems.find((item) => item._id === id);
      return total + item.price * (orderItems[id] || 0);
    }, 0);
    setTotalAmount(newTotalAmount);
  }, [orderItems]);

  const handleConfirmBooking = async () => {
    try {
      // Pre-submission validation
      if (!selectedSlot) {
        throw new Error("Please select a time slot");
      }

      if (!userId) {
        throw new Error("Please log in to make a booking");
      }

      if (!hotelData || !hotelData._id) {
        throw new Error("Restaurant information is missing");
      }

      if (guestCount < 1) {
        throw new Error("Please select at least one guest");
      }

      // Validate food order
      const foodOrder = Object.entries(orderItems).map(([itemId, quantity]) => {
        const item = foodItems.find((item) => item._id === itemId);
        // {
        //   console.log(foodOrder);
        // }
        if (!item) {
          console.log(`Food item not found: ${itemId}`);
          throw new Error(`Invalid food item selected`);
        }
        return {
          itemId: item._id,
          itemName: item.foodname, // Use the item's foodname property
          quantity: quantity,
          price: item.price, // Use the item's price property
          category: item.category,
          subcategory: item.subcategory,
        };
      });

      if (foodOrder.length === 0) {
        throw new Error("Please select at least one food item");
      }

      setLoading(true);

      // Construct booking object according to schema
      const booking = {
        userId: userId,
        hotelId: hotelData._id, // Using hotelId instead of hotelName
        bookingDetails: {
          bookingTime: selectedSlot,
          guests: guestCount,
          foodOrder: foodOrder,
          totalAmount: totalAmount,
        },
        status: {
          confirmed: true,
          checkedIn: false,
          checkedOut: false,
        },
      };

      // Make API call
      const response = await fetch(
        `${import.meta.env.VITE_API}booking/restaurantbooking/${userId}/${
          hotelData._id
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}` // Optional: Add token for authorization if needed
          },
          body: JSON.stringify(booking),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Booking failed");
      }

      // Display success message with SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Booking Confirmed!",
        text: "Thank you for Choosing Dineease Have a great day!",
        confirmButtonText: "Go to Bookings",
      }).then(() => {
        // Reset form and navigate
        setSelectedSlot(null);
        setGuestCount(1);
        setOrderItems({});
        navigate("/booking");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to create booking. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!hotelData) {
    return (
      <div className="p-4 text-center text-red-600">
        Failed to load hotel data
      </div>
    );
  }

  const timeSlots = generateTimeSlots();

  return (
    <div className="p-4 font-primary max-w-4xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">
        {hotelData.hotelName}
      </h1>
      <p className="text-gray-600 mb-4">Location: {hotelData.location}</p>
      <p className="text-gray-600 mb-4">Open: {hotelData.opentime}</p>

      {/* Time Slots */}
      {/* Time Slots */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Time Slot</h2>
        <div className="flex flex-wrap gap-4">
          {hotelData.timeslots &&
            hotelData.timeslots.map((slot, index) => (
              <div
                key={index}
                onClick={() => !selectedSlot && handleBooking(slot)}
                className={`border rounded-lg p-4 lg:w-32 w-24 lg:h-24 text-center cursor-pointer transition duration-200
          ${
            selectedSlot
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-orange-500"
          }
          ${selectedSlot === slot ? "border-orange-500 bg-orange-100" : ""}
        `}
              >
                <div className="text-green-500 font-bold text-md lg:text-lg">
                  {slot}
                </div>
              </div>
            ))}
        </div>
      </div>

      {selectedSlot && (
        <>
          {/* Guest Count */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Number of Guests</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleGuestChange(-1)}
                className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200"
              >
                <Minus size={20} />
              </button>
              <span className="text-xl font-semibold">{guestCount}</span>
              <button
                onClick={() => handleGuestChange(1)}
                className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Menu Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Select Menu Items</h2>
            <div className="space-y-4">
              {foodItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.foodname}</h3>
                    <p className="text-sm text-gray-600">
                      ₹{item.price.toFixed(2)}
                    </p>
                    <div className="flex gap-2">
                      <p className="text-xs text-gray-500">{item.category}</p>
                      {item.subcategory && (
                        <p className="text-xs text-gray-500">
                          • {item.subcategory}
                        </p>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    <button
                      onClick={() => handleQuantityChange(item._id, -1)}
                      className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 disabled:opacity-50"
                      disabled={!orderItems[item._id]}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">
                      {orderItems[item._id] || 0}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item._id, 1)}
                      className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mb-8 mt-8 p-4 bg-orange-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Selected Time:</span>
                  <span className="font-semibold">{selectedSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of Guests:</span>
                  <span className="font-semibold">{guestCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-semibold">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirmBooking}
            className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200 "
          >
            Confirm Booking
          </button>
        </>
      )}
    </div>
  );
};

export default BookHotel;
