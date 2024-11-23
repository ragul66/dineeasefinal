import React, { useState, useEffect } from "react";
import Loader from "../components/LOader";

const Review = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Simulated loading delay

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-700">Review Page</h1>
      <p className="text-gray-600 mt-2">This is the review content.</p>
    </div>
  );
};

export default Review;
