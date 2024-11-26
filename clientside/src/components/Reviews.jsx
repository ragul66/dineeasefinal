import React, { useEffect, useState } from "react";

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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review._id} className="border-b py-2">
              <p>
                <strong>Rating:</strong> {review.rating}
              </p>
              <p>
                <strong>Comment:</strong> {review.comments}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available for this hotel.</p>
      )}
    </div>
  );
};

export default Reviews;
