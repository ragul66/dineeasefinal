// components/Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 font-primary">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
        <p className="mt-4 text-lg font-medium text-gray-600">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loader;
