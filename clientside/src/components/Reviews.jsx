import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa"; // Import star icons for ratings

const Reviews = ({ hotelId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}rat/reviews/${hotelId}`
        );
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [hotelId]);

  if (loading) return <div>Loading...</div>;

  // Helper function to render stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-500" />
        ) : (
          <FaRegStar key={i} className="text-gray-300" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Reviews</h2>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-2">
                <div className="flex">{renderStars(review.rating)}</div>
                <span className="ml-2 text-gray-600">{review.rating} / 5</span>
              </div>
              <p className="text-gray-700">{review.comments}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No reviews available for this hotel.</p>
      )}
    </div>
  );
};

export default Reviews;
