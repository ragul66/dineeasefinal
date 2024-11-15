import React, { useState } from "react";

const CarouselUpload = () => {
  const [desktopImages, setDesktopImages] = useState([]);
  const [mobileImages, setMobileImages] = useState([]);
  const [message, setMessage] = useState("");

  const handleDesktopImagesChange = (e) => {
    setDesktopImages(Array.from(e.target.files));
  };

  const handleMobileImagesChange = (e) => {
    setMobileImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        const data = await response.json();
        setMessage(data.message || "Images uploaded successfully!");
        setDesktopImages([]);
        setMobileImages([]);
      } else {
        const errorText = await response.text();
        console.error("Error response text:", errorText);
        setMessage("Failed to upload images. Please try again.");
      }
    } catch (error) {
      console.error("Error while uploading images:", error);
      setMessage("An error occurred while uploading images.");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Upload Carousel Images</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
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

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Upload Images
        </button>
      </form>

      {message && <p className="mt-4 text-lg font-medium">{message}</p>}
    </div>
  );
};

export default CarouselUpload;
