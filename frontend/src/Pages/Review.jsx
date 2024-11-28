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
              rating: review.rating,
              comment: review.comment,
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
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-gray-700">Error</h1>
        <p className="text-red-500 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-700">Review Page</h1>
      <p className="text-gray-600 mt-2">
        User: {user.name} ({user.email})
      </p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-700">Reviews:</h2>
        {reviews.length > 0 ? (
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            {reviews.map((review, index) => (
              <li key={index}>
                <strong>{review.hotelName}</strong> - Rating: {review.rating}{" "}
                <br />
                Comment: {review.comment}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default Review;
