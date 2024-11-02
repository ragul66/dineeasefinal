import React, { useEffect, useState } from "react";

const AdminHotels = () => {
  const [hotels, setHotels] = useState([]); // Set initial state as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/hotel/admin-hotels/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch hotels");
        }
        const data = await response.json();
        console.log(data);
        setHotels(data.hotels || []); // Ensure `data.hotels` is an array
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [userId]);

  if (loading)
    return (
      <div className="text-center text-lg font-semibold text-gray-500">
        Loading...
      </div>
    );
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Admin Hotels
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {hotels && hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                {hotel.hotelName}
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {hotel.hotelPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={`http://localhost:3000/${photo}`}
                    alt={`Hotel ${hotel.hotelName} - Photo ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  FSSAI Certificate:{" "}
                  {hotel.FssaicertificateImage ? (
                    <img
                      src={`${import.meta.env.VITE_API}/${
                        hotel.FssaicertificateImage
                      }`}
                      alt="FSSAI Certificate"
                      className="rounded-md w-20 h-20 object-cover"
                    />
                  ) : (
                    "N/A"
                  )}
                </p>
                <p className="text-sm text-gray-600">
                  NOC Image:{" "}
                  {hotel.nocImage ? (
                    <img
                      src={`${import.meta.env.VITE_API}/${hotel.nocImage}`}
                      alt="NOC"
                      className="rounded-md w-20 h-20 object-cover"
                    />
                  ) : (
                    "N/A"
                  )}
                </p>
                <p className="text-sm text-gray-600">
                  HTL Certificate:{" "}
                  {hotel.HTLcertificate ? (
                    <img
                      src={`${import.meta.env.VITE_API}/${
                        hotel.HTLcertificate
                      }`}
                      alt="HTL Certificate"
                      className="rounded-md w-20 h-20 object-cover"
                    />
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No hotels found</p>
        )}
      </div>
    </div>
  );
};

export default AdminHotels;
