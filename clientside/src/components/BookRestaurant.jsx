import React, { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { useParams } from "react-router-dom";

// Sample menu data (in real app, this would come from your API/DB)
const menuItems = [
  { id: 1, name: "Classic Burger", price: 12.99, category: "Main Course" },
  { id: 2, name: "Caesar Salad", price: 8.99, category: "Starters" },
  { id: 3, name: "Margherita Pizza", price: 14.99, category: "Main Course" },
  { id: 4, name: "Chocolate Cake", price: 6.99, category: "Desserts" },
  { id: 5, name: "French Fries", price: 4.99, category: "Sides" },
];

const timeSlots = [
  { time: "10:00 AM", type: "Standard Room" },
  { time: "11:00 AM", type: "Deluxe Suite" },
  { time: "1:00 PM", type: "Executive Suite" },
  { time: "3:00 PM", type: "Penthouse Suite" },
  { time: "8:00 PM", type: "Penthouse Suite" },
];

const BookRestaurant = () => {
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [orderItems, setOrderItems] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [restaurantName, setRestaurantName] = useState("");

  // Get IDs from localStorage (in real app these would be set during login/navigation)
  const userId = localStorage.getItem("clientId");

  useEffect(() => {
    // Get the current URL and extract the restaurant name (in this case, the 3rd part of the path)
    const path = window.location.pathname.split("/");
    const name = path[4]; // The restaurant name should be at the second index in the path
    setRestaurantName(name);
    console.log(restaurantName);
  }, []);

  useEffect(() => {
    // Calculate total amount whenever order items change
    const newTotal = Object.entries(orderItems).reduce(
      (sum, [id, quantity]) => {
        const item = menuItems.find((item) => item.id === parseInt(id));
        return sum + (item ? item.price * quantity : 0);
      },
      0
    );
    setTotalAmount(newTotal);
  }, [orderItems]);

  const handleBooking = (slot) => {
    setSelectedSlot(slot);
  };

  const handleGuestChange = (increment) => {
    setGuestCount((prev) => Math.max(1, prev + increment));
  };

  const handleQuantityChange = (itemId, increment) => {
    setOrderItems((prev) => {
      const currentQty = prev[itemId] || 0;
      const newQty = Math.max(0, currentQty + increment);

      if (newQty === 0) {
        const { [itemId]: removed, ...rest } = prev;
        return rest;
      }

      return { ...prev, [itemId]: newQty };
    });
  };

  const handleConfirmBooking = async () => {
    if (!selectedSlot || !userId) {
      alert("Please select a slot and ensure you are logged in");
      return;
    }

    setLoading(true);

    const foodOrder = Object.entries(orderItems).map(([itemId, quantity]) => {
      const item = menuItems.find((item) => item.id === parseInt(itemId));
      return {
        itemName: item.name,
        quantity: quantity,
        price: item.price,
      };
    });

    const Booking = {
      userId,
      restaurantName,
      bookingDetails: {
        bookingTime: new Date(selectedSlot.time),
        guests: guestCount,
        foodOrder,
        totalAmount,
      },
      status: {
        confirmed: true,
        checkedIn: false,
        checkedOut: false,
      },
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}booking/restaurantbooking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Booking),
        }
      );

      if (!response.ok) throw new Error("Booking failed");

      alert("Booking confirmed successfully!");
      // Reset form
      setSelectedSlot(null);
      setGuestCount(1);
      setOrderItems({});
    } catch (error) {
      alert("Failed to create booking. Please try again.");
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

  return (
    <div className="p-4 font-primary max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Book a Slot</h1>

      {/* Time Slots */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Time Slot</h2>
        <div className="flex flex-wrap gap-4">
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              onClick={() => !selectedSlot && handleBooking(slot)}
              className={`border rounded-lg p-4 lg:w-32 w-24 lg:h-24 text-center cursor-pointer transition duration-200
                ${
                  selectedSlot
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-orange-500"
                }
                ${
                  selectedSlot === slot ? "border-orange-500 bg-orange-100" : ""
                }
              `}
            >
              <div className="text-orange-600 font-bold text-md lg:text-lg">
                {slot.time}
              </div>
              <div className="text-gray-600 text-xs lg:text-sm">
                {slot.type}
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
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">
                      {orderItems[item.id] || 0}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="mb-8 p-4 bg-orange-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Selected Time:</span>
                <span className="font-semibold">{selectedSlot.time}</span>
              </div>
              <div className="flex justify-between">
                <span>Number of Guests:</span>
                <span className="font-semibold">{guestCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-semibold">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirmBooking}
            className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200"
          >
            Confirm Booking
          </button>
        </>
      )}
    </div>
  );
};

export default BookRestaurant;

// import React, { useState } from "react";

// const timeSlots = [
//   { time: "10:00 AM", type: "Standard Room" },
//   { time: "11:00 AM", type: "Deluxe Suite" },
//   { time: "1:00 PM", type: "Executive Suite" },
//   { time: "3:00 PM", type: "Penthouse Suite" },
//   { time: "8:00 PM", type: "Penthouse Suite" },
// ];

// const BookRestaurant = () => {
//   const [loading, setLoading] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   const handleBooking = (slot) => {
//     setSelectedSlot(slot);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 font-primary">
//       <h1 className="text-2xl font-bold mb-4 text-gray-800">Book a Slot</h1>

//       {/* Slots List */}
//       <div className="flex flex-wrap gap-4">
//         {timeSlots.map((slot, index) => (
//           <div
//             key={index}
//             onClick={() => !selectedSlot && handleBooking(slot)}
//             className={`border rounded-lg p-4 lg:w-32 w-24 lg:h-24 text-center cursor-pointer transition duration-200
//               ${
//                 selectedSlot
//                   ? "opacity-50 cursor-not-allowed"
//                   : "hover:border-orange-500"
//               }
//               ${selectedSlot === slot ? "border-orange-500 bg-orange-100" : ""}
//             `}
//             style={{
//               pointerEvents: selectedSlot
//                 ? selectedSlot === slot
//                   ? "auto"
//                   : "none"
//                 : "auto",
//             }}
//           >
//             <div className="text-orange-600 font-bold text-md lg:text-lg">
//               {slot.time}
//             </div>
//             <div className="text-gray-600 text-xs lg:text-sm">{slot.type}</div>
//           </div>
//         ))}
//       </div>

//       {/* Selected Slot Display */}
//       {selectedSlot && (
//         <div className="mt-8 p-4 border-t border-gray-300">
//           <h2 className="text-xl font-semibold text-gray-800">
//             Selected Slot:
//           </h2>
//           <p className="text-gray-600 mt-2">
//             <span className="font-bold text-orange-600">
//               {selectedSlot.time}
//             </span>{" "}
//             - {selectedSlot.type}
//           </p>
//           <button
//             onClick={() => setSelectedSlot(null)}
//             className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-200"
//           >
//             Choose Again
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookRestaurant;
