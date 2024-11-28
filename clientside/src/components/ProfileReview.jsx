import React, { useEffect, useState } from "react";

const ProfileReviewPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("clientId");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}rat/client-reviews/${userId}`
        );
        if (!response.ok) {
          throw new Error(await response.text());
        }
        const data = await response.json();
        setUserDetails(data.user);
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);

  if (loading) {
    return <div className="text-center text-orange-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-bold">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-20 font-primary">
      {/* Profile Header */}
      <div className=" rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-orange-400 text-2xl font-bold">
          {userDetails.name}
        </h1>
        <p className="text-black text-sm">{userDetails.email}</p>
      </div>

      {/* Reviews Section */}
      <div className="space-y-6">
        <h2 className="text-black text-xl font-semibold">Reviews</h2>
        {userDetails.reviews.length > 0 ? (
          userDetails.reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-orange-400 font-bold text-lg">
                {review.reviewername}
              </h3>
              <p className="text-gray-600 text-sm">{review.reviewermailid}</p>
              <p className="text-gray-800 mt-2">{review.comment}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">
                  Rating: {review.rating} / 5
                </span>
                <span className="text-gray-400 text-xs">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileReviewPage;
