const express = require("express");
const router = express.Router();
const {
  postRatingAndReview,
  getReviewsByHotelId,
  getReviewByclientId,
  getUserWithHotelsAndRatings,
} = require("../controllers/ratandrev"); // Adjust the path as needed

// Route for posting ratings and reviews
router.post("/:hotelId/:clientId/hotels/ratingreview", postRatingAndReview);

router.get("/reviews/:hotelId", getReviewsByHotelId);

//for client purposes
router.get("/client-reviews/:userId", getReviewByclientId);

//for admin-purposes
router.get("/admin-reviews/:userId", getUserWithHotelsAndRatings);

module.exports = router;
