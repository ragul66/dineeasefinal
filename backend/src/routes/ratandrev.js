const express = require("express");
const router = express.Router();
const { postRatingAndReview } = require("../controllers/ratandrev"); // Adjust the path as needed

// Route for posting ratings and reviews
router.post("/:hotelId/:clientId/hotels/ratingreview", postRatingAndReview);

module.exports = router;
