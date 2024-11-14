// src/components/Carousel.js
import React, { useState, useEffect } from "react";

const carouselData = [
  {
    id: 1,
    image: "../src/assets/image.png", // Replace with image URL from DB or use a placeholder
    // title: "Title 1",
    // description: "Description 1",
  },
  {
    id: 2,
    image: "../src/assets/image2.AVIF",
    // title: "Title 2",
    // description: "Description 2",
  },
  {
    id: 3,
    image: "../src/assets/image4.AVIF",
    // title: "Title 3",
    // description: "Description 3",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

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
          transform: `translateX(-${currentIndex * 100}%)`, // Adjusted to simplify transition
        }}
      >
        {carouselData.map((item, index) => (
          <div
            key={item.id}
            className="w-full flex-shrink-0 px-2" // Use px-2 to reduce extra white space
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 object-cover md:h-96 rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
              <h2 className="text-white text-xl font-bold">{item.title}</h2>
              <p className="text-white">{item.description}</p>
            </div>
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
// import React, { useState } from "react";

// const carouselData = [
//   {
//     id: 1,
//     image: "../src/assets/image.png", // Replace with image URL from DB or use placeholder
//     // title: "Title 1",
//     // description: "Description 1",
//   },
//   {
//     id: 2,
//     image: "path-to-image-2",
//     // title: "Title 2",
//     // description: "Description 2",
//   },
//   {
//     id: 3,
//     image: "path-to-image-3",
//     // title: "Title 3",
//     // description: "Description 3",
//   },
// ];

// const Carousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

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
//         className="flex transition-transform duration-500 ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {carouselData.map((item) => (
//           <div
//             key={item.id}
//             className="w-full flex-shrink-0"
//             style={{ width: "100%" }}
//           >
//             <img
//               src={item.image}
//               alt={item.title}
//               className="w-full h-64 object-cover md:h-96"
//             />
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
//               <h2 className="text-white text-xl font-bold">{item.title}</h2>
//               <p className="text-white">{item.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>

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
