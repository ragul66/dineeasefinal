import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";

const Review = () => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const userId = localStorage.getItem("userId"); // Get userId from localStorage

      if (!userId) {
        setError("User ID not found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}rat/admin-reviews/${userId}` // Replace with your API endpoint
        );
        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
          // Extract reviews from the hotels array in the response
          const allReviews = data.user.hotels.flatMap((hotel) =>
            hotel.ratingsAndReviews.map((review) => ({
              hotelName: hotel.hotelName,
              reviewername: review.reviewername,
              reviewermailid: review.reviewermailid,
              rating: review.rating,
              comment: review.comment,
              createdAt: review.createdAt,
            }))
          );
          setReviews(allReviews);
        } else {
          setError(data.message || "Failed to fetch reviews.");
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("An error occurred while fetching reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="p-8 max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-700">Error</h1>
        <p className="text-red-500 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg font-primary">
      <h1 className="text-3xl font-semibold text-gray-800">Review Page</h1>
      <p className="text-lg text-gray-600 mt-2">
        User: <span className="font-bold text-gray-800">{user.name}</span> (
        <span className="text-blue-600">{user.email}</span>)
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700">Reviews:</h2>

        {reviews.length > 0 ? (
          <div className="space-y-4 mt-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">
                    {review.reviewername}
                  </span>
                  <span className="text-sm text-gray-500">
                    {review.reviewermailid}
                  </span>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="text-yellow-500">
                    {"★".repeat(review.rating)}
                  </span>
                  <span className="text-gray-600 ml-2">
                    Rating: {review.rating}
                  </span>
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
                <span className="text-gray-400 text-xs">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-4">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default Review;
