const express = require("express");
const router = express.Router();
const {
  postRatingAndReview,
  getReviewsByHotelId,
} = require("../controllers/ratandrev"); // Adjust the path as needed

// Route for posting ratings and reviews
router.post("/:hotelId/:clientId/hotels/ratingreview", postRatingAndReview);

router.get("/reviews/:hotelId", getReviewsByHotelId);

module.exports = router;
