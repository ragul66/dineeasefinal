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
        setCarouselData(
          isMobile ? data.carouselImagesMobile : data.carouselImages
        );
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

// // src/components/Carousel.js
// import React, { useState, useEffect } from "react";

// const carouselData = [
//   {
//     id: 1,
//     image: "../public/assets/image6.AVIF", // Replace with image URL from DB or use a placeholder
//   },
//   {
//     id: 2,
//     image: "../public/assets/image2.AVIF",
//   },
//   {
//     id: 3,
//     image: "../public/assets/image4.AVIF",
//   },
// ];

// const Carousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Automatic slide functionality
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 4000); // Change slide every 3 seconds

//     return () => clearInterval(interval); // Clear interval on component unmount
//   }, []);

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const goToPrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div className="relative w-full overflow-hidden mt-4">
//       <div
//         className="flex scale-110 translate-x-4 transition-transform duration-500 ease-in-out"
//         style={{
//           transform: `translateX(-${currentIndex * 100}%)`, // Adjusted to simplify transition
//         }}
//       >
//         {carouselData.map((item, index) => (
//           <div
//             key={item.id}
//             className="w-full  flex-shrink-0 px-2" // Use px-2 to reduce extra white space
//           >
//             <img
//               src={item.image}
//               alt={item.title}
//               className="w-full h-64 object-cover md:h-96 rounded-lg"
//             />
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
//               <h2 className="text-white text-xl font-bold">{item.title}</h2>
//               <p className="text-white">{item.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation Buttons */}
//       <button
//         onClick={goToPrev}
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md focus:outline-none"
//       >
//         &#9664;
//       </button>
//       <button
//         onClick={goToNext}
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md focus:outline-none"
//       >
//         &#9654;
//       </button>
//     </div>
//   );
// };

// export default Carousel;
