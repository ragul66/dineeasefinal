import React, { useState } from "react";

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

  const handleBooking = (slot) => {
    setSelectedSlot(slot);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-4 font-primary">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Book a Slot</h1>

      {/* Slots List */}
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
              ${selectedSlot === slot ? "border-orange-500 bg-orange-100" : ""}
            `}
            style={{
              pointerEvents: selectedSlot
                ? selectedSlot === slot
                  ? "auto"
                  : "none"
                : "auto",
            }}
          >
            <div className="text-orange-600 font-bold text-lg">{slot.time}</div>
            <div className="text-gray-600 text-sm">{slot.type}</div>
          </div>
        ))}
      </div>

      {/* Selected Slot Display */}
      {selectedSlot && (
        <div className="mt-8 p-4 border-t border-gray-300">
          <h2 className="text-xl font-semibold text-gray-800">
            Selected Slot:
          </h2>
          <p className="text-gray-600 mt-2">
            <span className="font-bold text-orange-600">
              {selectedSlot.time}
            </span>{" "}
            - {selectedSlot.type}
          </p>
          <button
            onClick={() => setSelectedSlot(null)}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-200"
          >
            Choose Again
          </button>
        </div>
      )}
    </div>
  );
};

export default BookRestaurant;
