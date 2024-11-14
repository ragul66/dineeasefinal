const express = require("express");
const router = express.Router();
const {
  uploadDesktop,
  uploadMobile,
  createCarousel,
  getCarousel,
} = require("../controllers/carouselcontroller");

// Route to handle uploading carousel images
router.post(
  "/uploadcarousel",
  uploadDesktop.array("desktopImages", 4), // Accept up to 4 images for desktop
  uploadMobile.array("mobileImages", 4), // Accept up to 4 images for mobile
  createCarousel
);

// Route to get the carousel images
router.get("/", getCarousel);

module.exports = router;
