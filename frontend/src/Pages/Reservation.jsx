// pages/Reservations.js
import React from "react";

const Reservations = () => {
  const reservations = [
    {
      id: 1,
      restaurant: "La Bella",
      customer: "John Doe",
      time: "7:00 PM",
      status: "Confirmed",
    },
    {
      id: 2,
      restaurant: "Burger Hub",
      customer: "Jane Smith",
      time: "6:30 PM",
      status: "Pending",
    },
    // Add more reservations here
  ];

  return (
    <div className="font-primary">
      <div className="p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Reservations</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Restaurant</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id} className="bg-white border-b">
                <td className="px-4 py-2">{reservation.id}</td>
                <td className="px-4 py-2">{reservation.restaurant}</td>
                <td className="px-4 py-2">{reservation.customer}</td>
                <td className="px-4 py-2">{reservation.time}</td>
                <td className="px-4 py-2">{reservation.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;
