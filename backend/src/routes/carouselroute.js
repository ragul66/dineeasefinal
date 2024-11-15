// Import necessary modules
const express = require("express");
const router = express.Router();
const {
  upload,
  createCarousel,
  getCarousel,
} = require("../controllers/carouselcontroller");

// Route to handle uploading carousel images
router.post("/uploadcarousel", upload, createCarousel);

// Route to get the carousel images
router.get("/", getCarousel);

module.exports = router;
