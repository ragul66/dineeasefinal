const RatingReview = require("../modules/ratandrev"); // Correct import path
const Hotel = require("../modules/hoteldetail");
const user = require("../modules/user");

const postRatingAndReview = async (req, res) => {
  const { hotelId } = req.params;
  const { clientId } = req.params;
  const { rating, comments } = req.body;

  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const newRatingReview = new RatingReview({
      rating,
      comments,
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

module.exports = { postRatingAndReview, getReviewsByHotelId };
