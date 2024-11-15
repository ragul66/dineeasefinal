import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch carousel images from the backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}carousel`)
      .then((response) => response.json())
      .then((data) => {
        // Choose the correct images array based on device type
        setCarouselData(isMobile ? data.mobileImages : data.desktopImages);
      })
      .catch((error) => console.error("Error fetching carousel data:", error));
  }, [isMobile]);

  // Determine if the device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Automatic slide functionality
  useEffect(() => {
    if (carouselData.length === 0) return; // Only start if data is loaded

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [carouselData]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };

  // Show a loading message or a fallback
  if (!carouselData || carouselData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full overflow-hidden mt-4">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {carouselData.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 px-2">
            <img
              src={`${import.meta.env.VITE_API}${image}`}
              alt={`Carousel ${index + 1}`}
              className="w-full h-64 object-cover md:h-96 rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md focus:outline-none"
      >
        &#9664;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md focus:outline-none"
      >
        &#9654;
      </button>
    </div>
  );
};

export default Carousel;
