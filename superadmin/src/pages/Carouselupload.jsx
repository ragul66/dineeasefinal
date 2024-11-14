import React, { useState } from "react";

const CarouselUpload = () => {
  const [desktopImages, setDesktopImages] = useState([]);
  const [mobileImages, setMobileImages] = useState([]);
  const [message, setMessage] = useState("");

  // Handle file selection for desktop images
  const handleDesktopImagesChange = (e) => {
    setDesktopImages(Array.from(e.target.files));
  };

  // Handle file selection for mobile images
  const handleMobileImagesChange = (e) => {
    setMobileImages(Array.from(e.target.files));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send files
    const formData = new FormData();
    desktopImages.forEach((image) => formData.append("desktopImages", image));
    mobileImages.forEach((image) => formData.append("mobileImages", image));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}carousel/uploadcarousel`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setMessage("Images uploaded successfully!");
      } else {
        setMessage("Failed to upload images. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred while uploading images.");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Upload Carousel Images</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Desktop Images Upload */}
        <div>
          <label
            className="block text-lg font-medium mb-2"
            htmlFor="desktopImages"
          >
            Upload Desktop Images (Up to 4)
          </label>
          <input
            type="file"
            id="desktopImages"
            multiple
            accept="image/*"
            onChange={handleDesktopImagesChange}
            className="block w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Mobile Images Upload */}
        <div>
          <label
            className="block text-lg font-medium mb-2"
            htmlFor="mobileImages"
          >
            Upload Mobile Images (Up to 4)
          </label>
          <input
            type="file"
            id="mobileImages"
            multiple
            accept="image/*"
            onChange={handleMobileImagesChange}
            className="block w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Upload Images
        </button>
      </form>

      {/* Message Display */}
      {message && <p className="mt-4 text-lg font-medium">{message}</p>}
    </div>
  );
};

export default CarouselUpload;
