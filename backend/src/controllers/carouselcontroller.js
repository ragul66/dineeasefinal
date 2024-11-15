const multer = require("multer");
const path = require("path");

const fs = require("fs");
const CarouselImage = require("../modules/carousel");

// Configure Multer storage for desktop and mobile images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir =
      file.fieldname === "desktopImages"
        ? "uploads/Carousels/desktop"
        : "uploads/Carousels/mobile";
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create a single Multer uploader to handle both fields
const upload = multer({
  storage: storage,
}).fields([
  { name: "desktopImages", maxCount: 4 },
  { name: "mobileImages", maxCount: 4 },
]);

const createCarousel = async (req, res) => {
  try {
    console.log("Request received to upload images");

    // Log the entire req.files to understand its structure
    console.log("Files received:", req.files);

    // Check if req.files is structured as expected
    if (!req.files || !req.files.desktopImages || !req.files.mobileImages) {
      return res.status(400).json({
        message: "No files uploaded. Please check your input.",
      });
    }

    // Ensure `req.files.desktopImages` and `req.files.mobileImages` are arrays
    const desktopImages = req.files.desktopImages.map((file) => file.path);
    const mobileImages = req.files.mobileImages.map((file) => file.path);

    // Log the paths to verify them
    console.log("Desktop Image Paths:", desktopImages);
    console.log("Mobile Image Paths:", mobileImages);

    // Create and save the new carousel document
    const carousel = new CarouselImage({
      desktopImages: desktopImages,
      mobileImages: mobileImages,
    });

    await carousel.save();

    res.status(201).json({
      message: "Carousel images uploaded successfully!",
    });
  } catch (error) {
    console.error("Error while uploading images:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getCarousel = async (req, res) => {
  try {
    const carousel = await CarouselImage.findOne();
    if (!carousel) {
      return res.status(404).json({ message: "No images found" });
    }
    res.status(200).json(carousel);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  upload,
  createCarousel,
  getCarousel,
};
