import React, { useEffect, useState } from "react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const clientId = localStorage.getItem("clientId");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}user/bookingdetail/${clientId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [clientId]);

  const handleCancelBooking = async (bookingId) => {
    // console.log(bookingId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}user/bookings/${bookingId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        My Bookings
      </h1>
      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-lg shadow-md p-6 transition transform hover:scale-105 duration-300"
            >
              <div className="text-xl font-semibold mb-3">
                Booking Time:{" "}
                <span className="text-blue-600">
                  {booking.bookingDetails?.bookingTime || "N/A"}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                Guests: {booking.bookingDetails?.guests || 0}
              </div>
              <div className="mb-4">
                <h3 className="font-medium text-gray-700 mb-2">
                  Food Ordered through booking:
                </h3>
                <div className="space-y-2">
                  {booking.bookingDetails?.foodOrder?.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div className="font-medium text-gray-800">
                        {item.itemName}
                      </div>
                      <div className="text-sm text-gray-500">
                        Quantity: {item.quantity} x Price: ₹{item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-lg font-bold text-gray-800">
                Total Amount: ₹{booking.bookingDetails.totalAmount || 0}
              </div>
              <button
                onClick={() => handleCancelBooking(booking._id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Cancel Booking
              </button>
              <p className="text-red-600 mt-2">
                Note:Cancel Booking Before 1Hour
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          No bookings available.
        </div>
      )}
    </div>
  );
};

export default Bookings;

// import React, { useEffect, useState } from "react";

// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const clientId = localStorage.getItem("clientId");

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_API}user/bookingdetail/${clientId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch bookings");
//         }
//         const data = await response.json();
//         setBookings(data);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       }
//     };
//     fetchBookings();
//   }, []);

//   const handleCancelBooking = async (bookingId) => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API}user/bookings/${bookingId}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to cancel booking");
//       }
//       setBookings((prevBookings) =>
//         prevBookings.filter((booking) => booking._id !== bookingId)
//       );
//     } catch (error) {
//       console.error("Error cancelling booking:", error);
//     }
//   };

//   return (
//     <div className="p-4 max-w-screen-lg mx-auto">
//       <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
//       {bookings.length > 0 ? (
//         bookings.map((booking) => (
//           <div
//             key={booking._id}
//             className="bg-white p-4 rounded-lg shadow-md mb-4"
//           >
//             <div className="text-lg font-semibold mb-2">
//               Booking Time: {booking.bookingDetails.bookingTime}
//             </div>
//             <div className="text-sm text-gray-500 mb-4">
//               Guests: {booking.bookingDetails.guests}
//             </div>
//             <div className="space-y-2">
//               {booking.bookingDetails.foodOrder.map((item) => (
//                 <div
//                   key={item._id}
//                   className="flex justify-between items-center"
//                 >
//                   <div className="font-medium">{item.itemName}</div>
//                   <div>
//                     Quantity: {item.quantity} x Price: ₹{item.price}
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 font-semibold">
//               Total Amount: ₹{booking.totalAmount}
//             </div>
//             <button
//               onClick={() => handleCancelBooking(booking._id)}
//               className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
//             >
//               Cancel Booking
//             </button>
//           </div>
//         ))
//       ) : (
//         <div className="text-center text-gray-500">No bookings available.</div>
//       )}
//     </div>
//   );
// };

// export default Bookings;
