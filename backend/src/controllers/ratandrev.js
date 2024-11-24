const RatingReview = require("../modules/ratandrev"); // Correct import path
const Hotel = require("../modules/hoteldetail");

const postRatingAndReview = async (req, res) => {
  const { hotelIds } = req.params;
  const { rating, comments } = req.body;

  try {
    const hotel = await Hotel.findById(hotelIds);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const newRatingReview = new RatingReview({
      rating,
      comments,
    });

    const savedRatingReview = await newRatingReview.save();

    hotel.RatandRev.push(savedRatingReview._id);
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
