import React, { useState, useEffect } from "react";

const AddOrDisplayHotel = () => {
  const [hotelData, setHotelData] = useState(null);
  const [hotelName, setHotelName] = useState("");
  const [hotellocation, sethotellocation] = useState("");
  const [opentime, setopentime] = useState("");
  const [hotelPhotos, setHotelPhotos] = useState([]);
  const [FssaicertificateImage, setFssaicertificateImage] = useState(null);
  const [nocImage, setNocImage] = useState(null);
  const [HTLcertificate, setHTLcertificate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([{ time: "", period: "AM" }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [hotels, setHotels] = useState([]);
  const userId = localStorage.getItem("userId");

  //Timeslots

  const handleTimeChange = (index, value) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index].time = value;
    setTimeSlots(updatedSlots);
  };

  const handlePeriodChange = (index, value) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index].period = value;
    setTimeSlots(updatedSlots);
  };

  const addSlot = () => {
    setTimeSlots([...timeSlots, { time: "", period: "AM" }]);
  };

  const removeSlot = (index) => {
    const updatedSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(updatedSlots);
  };

  //save the slots
  const handleSave = () => {
    // Prepare data for saving in the format type:[String]
    const formattedSlots = timeSlots.map(
      (slot) => `${slot.time} ${slot.period}`
    );
    console.log("Timeslots to save:", formattedSlots);
    // Save formattedSlots to the database
  };

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
    formData.append("location", hotellocation);
    formData.append("opentime", opentime);
    hotelPhotos.forEach((photo) => formData.append("hotelPhotos", photo));
    if (FssaicertificateImage)
      formData.append("FssaicertificateImage", FssaicertificateImage);
    if (nocImage) formData.append("nocImage", nocImage);
    if (HTLcertificate) formData.append("HTLcertificate", HTLcertificate);

    // Add time slots
    const formattedSlots = timeSlots.map(
      (slot) => `${slot.time} ${slot.period}`
    );
    formattedSlots.forEach((slot) => formData.append("timeslots", slot));

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

          {/* get the lcoation from the Admin */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span className="text-lg">🏨</span>
              Hotel Location with Pincode
            </label>
            <input
              type="text"
              value={hotellocation}
              onChange={(e) => sethotellocation(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter hotel Location with Pincode"
            />
          </div>

          {/* get the opentime from the admin */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span className="text-lg">🏨</span>
              Hotel Open time With (eg. 9AM-10PM)
            </label>
            <input
              type="text"
              value={opentime}
              onChange={(e) => setopentime(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter hotel Location with Pincode"
            />
          </div>

          {/* get the hotelphotos from the admin */}
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

          <div className="bg-gray-50 p-6 rounded-lg">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span className="text-lg">🕒</span>
              Timeslots
            </label>
            {timeSlots.map((slot, index) => (
              <div key={index} className="flex gap-3 mb-2">
                <input
                  type="time"
                  value={slot.time}
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <select
                  value={slot.period}
                  onChange={(e) => handlePeriodChange(index, e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
                <button
                  onClick={() => removeSlot(index)}
                  className="text-red-500 hover:text-red-700 transition-all"
                >
                  ✖
                </button>
              </div>
            ))}
            <button
              onClick={addSlot}
              className="mt-3 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
              + Add Slot
            </button>
            <button
              onClick={handleSave}
              className="mt-3 ml-3 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
            >
              Save Slots
            </button>
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
    <div className="max-w-7xl mx-auto bg-gray-50 p-10 rounded-2xl shadow-xl mt-12">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-3xl">🏨</span>
        <h2 className="text-4xl font-bold text-gray-900">
          Admin Hotel Information
        </h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <span className="text-4xl animate-spin">⌛</span>
        </div>
      ) : (
        <div className="w-full ">
          {hotels && hotels.length > 0 ? (
            hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl text-indigo-600">🏨</span>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {hotel.hotelName}
                  </h3>
                </div>

                <div className="mb-6 text-gray-700">
                  <p className="text-lg font-semibold">Location:</p>
                  <p>{hotel.location}</p>
                </div>

                <div className="mb-6 text-gray-700">
                  <p className="text-lg font-semibold">Opening Time:</p>
                  <p>{hotel.opentime}</p>
                </div>

                <div className="mb-6 text-gray-700">
                  <p className="text-lg font-semibold">Available Timeslots:</p>
                  <p>{hotel.timeslots}</p>
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
                    <span className="text-xl text-green-500">📜</span>
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
                    <span className="text-xl text-orange-500">📄</span>
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
                    <span className="text-xl text-blue-500">📜</span>
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
