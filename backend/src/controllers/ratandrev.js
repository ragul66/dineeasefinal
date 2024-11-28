const RatingReview = require("../modules/ratandrev"); // Correct import path
const Hotel = require("../modules/hoteldetail");
const user = require("../modules/user");
const admin = require("../modules/admin");

const postRatingAndReview = async (req, res) => {
  const { hotelId } = req.params;
  const { clientId } = req.params;
  const { rating, comments, reviewername, reviewermailid } = req.body;

  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const newRatingReview = new RatingReview({
      rating,
      comments,
      reviewername,
      reviewermailid,
    });

    const User = await user.findById(clientId);
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    const savedRatingReview = await newRatingReview.save();

    hotel.RatandRev.push(savedRatingReview._id);
    await hotel.save();

    User.Review.push(savedRatingReview._id);
    await User.save();

    res.status(201).json({
      message: "Rating and review added successfully",
      data: savedRatingReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error posting rating and review", error });
  }
};

// Get reviews by hotelId
const getReviewsByHotelId = async (req, res) => {
  try {
    const { hotelId } = req.params;

    // Find the hotel by ID and populate the RatandRev field
    const hotel = await Hotel.findById(hotelId).populate("RatandRev");

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel.RatandRev);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

//for the user individual purposes
const getReviewByclientId = async (req, res) => {
  const { userId } = req.params; // Extract userId from route parameters

  try {
    // Fetch the user with their reviews populated
    const userWithReviews = await user
      .findById(userId)
      .select("name emailid") // Select only name and emailid fields from the user collection
      .populate({
        path: "Review", // The field in `user` that references `ratingreview`
        select: "reviewername reviewermailid rating comments createdAt", // Fields to include from the ratingreview documents
      });

    // Check if the user or reviews exist
    if (
      !userWithReviews ||
      !userWithReviews.Review ||
      userWithReviews.Review.length === 0
    ) {
      return res.status(404).json({
        message: "No reviews found for the specified user.",
      });
    }

    // Send the user's name, email, and reviews in the response
    res.status(200).json({
      message: "Reviews retrieved successfully.",
      user: {
        name: userWithReviews.name,
        email: userWithReviews.emailid,
        reviews: userWithReviews.Review.map((review) => ({
          reviewername: review.reviewername,
          reviewermailid: review.reviewermailid,
          rating: review.rating,
          comment: review.comments,
          createdAt: review.createdAt,
        })), // Map over the reviews to send required fields
      },
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      message: "An error occurred while retrieving reviews.",
      error: error.message,
    });
  }
};

//for admin-review purposes
const getUserWithHotelsAndRatings = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch the user and populate hotels with RatandRev
    const userWithDetails = await admin.findById(userId).populate({
      path: "hotels",
      populate: {
        path: "RatandRev",
        select: "reviewername reviewermailid rating comments createdAt",
      },
    });

    // Debugging: Log the data fetched
    console.log("User Details:", JSON.stringify(userWithDetails, null, 2));

    // Check if the user exists and has hotels
    if (!userWithDetails) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!userWithDetails.hotels || userWithDetails.hotels.length === 0) {
      return res
        .status(404)
        .json({ message: "No hotels found for this user." });
    }

    // Check if hotels contain ratings and reviews
    const hotelsWithData = userWithDetails.hotels.map((hotel) => ({
      hotelName: hotel.hotelName || "Unnamed Hotel",
      location: hotel.location || "No location provided",
      ratingsAndReviews:
        hotel.RatandRev.length > 0
          ? hotel.RatandRev.map((ratAndRev) => ({
              reviewername: ratAndRev.reviewername,
              reviewermailid: ratAndRev.reviewermailid,
              rating: ratAndRev.rating,
              comment: ratAndRev.comments,
              createdAt: ratAndRev.createdAt,
            }))
          : "No ratings or reviews available",
    }));

    res.status(200).json({
      message: "User details retrieved successfully.",
      user: {
        name: userWithDetails.name,
        email: userWithDetails.emailid,
        hotels: hotelsWithData,
      },
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({
      message: "An error occurred while retrieving user details.",
      error: error.message,
    });
  }
};

module.exports = {
  postRatingAndReview,
  getReviewsByHotelId,
  getReviewByclientId,
  getUserWithHotelsAndRatings,
};
