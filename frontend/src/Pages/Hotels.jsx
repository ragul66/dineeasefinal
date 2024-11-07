import React, { useState, useEffect } from "react";

const AddOrDisplayHotel = () => {
  const [hotelData, setHotelData] = useState(null);
  const [hotelName, setHotelName] = useState("");
  const [hotellocation, sethotellocation] = useState("");
  const [hotelPhotos, setHotelPhotos] = useState([]);
  const [FssaicertificateImage, setFssaicertificateImage] = useState(null);
  const [nocImage, setNocImage] = useState(null);
  const [HTLcertificate, setHTLcertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [hotels, setHotels] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API}hotel/admin-hotels/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch hotels");
        }
        const data = await response.json();
        setHotels(data.hotels || []);
      } catch (err) {
        setMessage(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [userId]);

  const handleHotelPhotosChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length !== 4) {
      setMessage("Please select exactly 4 photos.");
    } else {
      setHotelPhotos(selectedFiles);
      setMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("hotelName", hotelName);
    hotelPhotos.forEach((photo) => formData.append("hotelPhotos", photo));
    if (FssaicertificateImage)
      formData.append("FssaicertificateImage", FssaicertificateImage);
    if (nocImage) formData.append("nocImage", nocImage);
    if (HTLcertificate) formData.append("HTLcertificate", HTLcertificate);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}hotel/add-hotel/${userId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Hotel uploaded successfully.");
        setHotelData(data);
        setHotels([...hotels, data]);
      } else {
        setMessage(data.error || "Error uploading hotel details");
      }
    } catch (error) {
      console.error("Error uploading hotel:", error);
      setMessage("Error uploading hotel details");
    }

    setLoading(false);
  };

  if (!hotelData && (!hotels || hotels.length === 0)) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl mt-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-2xl">🏨</span>
          <h1 className="text-3xl font-bold text-gray-800">Add New Hotel</h1>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-lg flex items-center gap-2">
            <span className="text-lg">ℹ️</span>
            <p>{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span className="text-lg">🏨</span>
              Hotel Name
            </label>
            <input
              type="text"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter hotel name"
            />
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span className="text-lg">🏨</span>
              Hotel Location with Pincode
            </label>
            <input
              type="text"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter hotel Location with Pincode"
            />
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span className="text-lg">📸</span>
              Hotel Photos (4 required)
            </label>
            <div className="relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleHotelPhotosChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <span className="absolute right-3 top-3 text-gray-400">📤</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <span className="text-lg">📜</span>
                FSSAI Certificate
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFssaicertificateImage(e.target.files[0])}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <span className="absolute right-3 top-3 text-gray-400">📤</span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <span className="text-lg">📄</span>
                NOC Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNocImage(e.target.files[0])}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <span className="absolute right-3 top-3 text-gray-400">📤</span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <span className="text-lg">📜</span>
                HTL Certificate
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setHTLcertificate(e.target.files[0])}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <span className="absolute right-3 top-3 text-gray-400">📤</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || hotelPhotos.length !== 4}
            className="w-full py-4 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
          >
            {loading ? (
              <>
                <span className="animate-spin">⌛</span>
                Uploading...
              </>
            ) : (
              <>
                <span>📤</span>
                Submit
              </>
            )}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-gray-50 p-10 rounded-xl shadow-xl mt-12">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-2xl">🏨</span>
        <h2 className="text-3xl font-bold text-gray-800">
          Admin Hotel Information
        </h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <span className="text-3xl animate-spin">⌛</span>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {hotels && hotels.length > 0 ? (
            hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg transition-all hover:shadow-2xl"
              >
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xl">🏨</span>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {hotel.hotelName}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {hotel.hotelPhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={`${import.meta.env.VITE_API}${photo}`}
                      alt={`Hotel ${hotel.hotelName} - Photo ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-xl">📜</span>
                    <div>
                      <p className="font-semibold text-gray-700">
                        FSSAI Certificate
                      </p>
                      {hotel.FssaicertificateImage ? (
                        <img
                          src={`${import.meta.env.VITE_API}${
                            hotel.FssaicertificateImage
                          }`}
                          alt="FSSAI Certificate"
                          className="mt-2 rounded-lg shadow-md w-32 h-32 object-cover"
                        />
                      ) : (
                        <span className="text-gray-500">N/A</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xl">📄</span>
                    <div>
                      <p className="font-semibold text-gray-700">NOC Image</p>
                      {hotel.nocImage ? (
                        <img
                          src={`${import.meta.env.VITE_API}${hotel.nocImage}`}
                          alt="NOC"
                          className="mt-2 rounded-lg shadow-md w-32 h-32 object-cover"
                        />
                      ) : (
                        <span className="text-gray-500">N/A</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xl">📜</span>
                    <div>
                      <p className="font-semibold text-gray-700">
                        HTL Certificate
                      </p>
                      {hotel.HTLcertificate ? (
                        <img
                          src={`${import.meta.env.VITE_API}${
                            hotel.HTLcertificate
                          }`}
                          alt="HTL Certificate"
                          className="mt-2 rounded-lg shadow-md w-32 h-32 object-cover"
                        />
                      ) : (
                        <span className="text-gray-500">N/A</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 flex items-center justify-center p-12">
              <p className="text-gray-500 flex items-center gap-2">
                <span>⚠️</span>
                No hotels found
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddOrDisplayHotel;

// import React, { useState, useEffect } from "react";

// const AddOrDisplayHotel = () => {
//   const [hotelData, setHotelData] = useState(null);
//   const [hotelName, setHotelName] = useState("");
//   const [hotelPhotos, setHotelPhotos] = useState([]);
//   const [FssaicertificateImage, setFssaicertificateImage] = useState(null);
//   const [nocImage, setNocImage] = useState(null);
//   const [HTLcertificate, setHTLcertificate] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [hotels, setHotels] = useState([]);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           `${import.meta.env.VITE_API}/hotel/admin-hotels/${userId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch hotels");
//         }
//         const data = await response.json();
//         setHotels(data.hotels || []);
//       } catch (err) {
//         setMessage(err.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHotels();
//   }, [userId]);

//   const handleHotelPhotosChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     if (selectedFiles.length !== 4) {
//       setMessage("Please select exactly 4 photos.");
//     } else {
//       setHotelPhotos(selectedFiles);
//       setMessage("");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("hotelName", hotelName);
//     hotelPhotos.forEach((photo) => formData.append("hotelPhotos", photo));
//     if (FssaicertificateImage)
//       formData.append("FssaicertificateImage", FssaicertificateImage);
//     if (nocImage) formData.append("nocImage", nocImage);
//     if (HTLcertificate) formData.append("HTLcertificate", HTLcertificate);

//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API}/hotel/add-hotel/${userId}`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         setMessage("Hotel uploaded successfully.");
//         setHotelData(data); // Update hotelData with newly added data
//         setHotels([...hotels, data]); // Add new hotel to hotels array
//       } else {
//         setMessage(data.error || "Error uploading hotel details");
//       }
//     } catch (error) {
//       console.error("Error uploading hotel:", error);
//       setMessage("Error uploading hotel details");
//     }

//     setLoading(false);
//   };

//   if (!hotelData && (!hotels || hotels.length === 0)) {
//     // Show form if hotel data is not available and no hotels exist
//     return (
//       <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-lg mt-10">
//         <h1 className="text-3xl font-semibold mb-6">Add New Hotel</h1>
//         {message && <p className="text-green-500 mb-4">{message}</p>}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Hotel Name
//             </label>
//             <input
//               type="text"
//               value={hotelName}
//               onChange={(e) => setHotelName(e.target.value)}
//               required
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Hotel Photos (4 photos required)
//             </label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleHotelPhotosChange}
//               className="mt-1 block w-full text-sm text-gray-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               FSSAI Certificate Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setFssaicertificateImage(e.target.files[0])}
//               className="mt-1 block w-full text-sm text-gray-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               NOC Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setNocImage(e.target.files[0])}
//               className="mt-1 block w-full text-sm text-gray-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               HTL Certificate Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setHTLcertificate(e.target.files[0])}
//               className="mt-1 block w-full text-sm text-gray-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading || hotelPhotos.length !== 4}
//             className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
//               loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {loading ? "Uploading..." : "Submit"}
//           </button>
//         </form>
//       </div>
//     );
//   }

//   // Display hotel details if they exist
//   return (
//     <div className="max-w-screen-lg mx-auto bg-gray-50 p-10 rounded-lg shadow-lg mt-12 font-primary">
//       <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//         Welcome to Admin Hotel Information
//       </h2>
//       <div>
//         {hotels && hotels.length > 0 ? (
//           hotels.map((hotel) => (
//             <div
//               key={hotel._id}
//               className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl"
//             >
//               <div className="p-5">
//                 <h3 className="text-2xl font-semibold text-blue-500 mb-4">
//                   {hotel.hotelName}
//                 </h3>
//                 <div className="flex flex-wrap gap-3 mb-4">
//                   {hotel.hotelPhotos.map((photo, index) => (
//                     <img
//                       key={index}
//                       src={`${import.meta.env.VITE_API}/${photo}`}
//                       alt={`Hotel ${hotel.hotelName} - Photo ${index + 1}`}
//                       className="w-24 h-24 object-cover rounded-md"
//                     />
//                   ))}
//                 </div>
//                 <div className="space-y-3">
//                   <p className="text-2xl font-semibold text-blue-500 mb-4">
//                     FSSAI Certificate:{" "}
//                     {hotel.FssaicertificateImage ? (
//                       <img
//                         src={`${import.meta.env.VITE_API}/${
//                           hotel.FssaicertificateImage
//                         }`}
//                         alt="FSSAI Certificate"
//                         className="rounded-md w-24 h-24 object-cover ml-2"
//                       />
//                     ) : (
//                       <span className="ml-2">N/A</span>
//                     )}
//                   </p>
//                   <p className="text-2xl font-semibold text-blue-500 mb-4">
//                     NOC Image:{" "}
//                     {hotel.nocImage ? (
//                       <img
//                         src={`${import.meta.env.VITE_API}/${hotel.nocImage}`}
//                         alt="NOC"
//                         className="rounded-md w-24 h-24 object-cover ml-2"
//                       />
//                     ) : (
//                       <span className="ml-2">N/A</span>
//                     )}
//                   </p>
//                   <p className="text-2xl font-semibold text-blue-500 mb-4">
//                     HTL Certificate:{" "}
//                     {hotel.HTLcertificate ? (
//                       <img
//                         src={`${import.meta.env.VITE_API}/${
//                           hotel.HTLcertificate
//                         }`}
//                         alt="HTL Certificate"
//                         className="rounded-md w-24 h-24 object-cover ml-2"
//                       />
//                     ) : (
//                       <span className="ml-2">N/A</span>
//                     )}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No hotels found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddOrDisplayHotel;
