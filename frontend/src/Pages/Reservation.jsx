import React, { useEffect, useState } from "react";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  // console.log(reservations);
  const adminId = localStorage.getItem("userId"); // Retrieve adminId from localStorage

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}admin/hotel-bookings/${adminId}`
        );
        const data = await response.json();
        const { bookings } = data;
        setReservations(bookings);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    if (adminId) {
      fetchReservations();
    }
  }, [adminId]);

  return (
    <div className="font-primary">
      <div className="p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Reservations</h2>
        <table className="min-w-full table-auto border-collapse border">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left border-r">Booking ID</th>
              <th className="px-4 py-2 text-left border-r">Customer</th>
              <th className="px-4 py-2 text-center border-r">Guests</th>
              <th className="px-4 py-2 text-left border-r">Food Items</th>
              <th className="px-4 py-2 text-left border-r">Booking Time</th>
              <th className="px-4 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((booking) => (
              <tr key={booking._id} className="bg-white border-b">
                <td className="px-4 py-2 border-r">{booking._id}</td>
                <td className="px-4 py-2 border-r">{booking.userName}</td>
                <td className="px-4 py-2 text-center border-r">
                  {booking.bookingDetails.guests}
                </td>
                <td className="px-4 py-2 border-r">
                  {booking.bookingDetails.foodOrder.map((item) => (
                    <div key={item._id}>
                      <p>
                        {item.itemName} - Quantity: {item.quantity}, Price: ₹
                        {item.price}
                      </p>
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2 border-r">
                  {booking.bookingDetails.bookingTime}
                </td>
                <td className="px-4 py-2 text-center">
                  {booking.status.confirmed ? "Confirmed" : "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;
