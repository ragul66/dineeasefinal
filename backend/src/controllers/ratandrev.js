const RatingReview = require("../modules/ratandrev"); // Adjust the path as needed
const Hotel = require("../modules/hoteldetail"); // Adjust the path as needed

const postRatingAndReview = async (req, res) => {
  const { hotelIds } = req.params; // Get hotelId from params
  const { rating, comments } = req.body; // Get rating and comments from request body

  try {
    // Check if the hotel exists
    const hotel = await Hotel.findById(hotelIds);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Create a new Rating and Review document
    const newRatingReview = new RatingReview({
      rating,
      comments,
    });

    // Save the review to the database
    const savedRatingReview = await newRatingReview.save();

    // Update the Hotel document by adding the review ID to the reviews array
    hotel.reviews.push(savedRatingReview._id);
    await hotel.save();

    res.status(201).json({
      message: "Rating and review added successfully",
      data: savedRatingReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error posting rating and review", error });
  }
};

module.exports = { postRatingAndReview };
