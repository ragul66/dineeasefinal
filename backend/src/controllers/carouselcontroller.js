// Required Libraries
const multer = require("multer");
const path = require("path");
const CarouselImage = require("../modules/carousel");

// Configure Multer for Desktop Images
const storageDesktop = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/Carousels/desktop");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Configure Multer for Mobile Images
const storageMobile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/Carousels/mobile");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create Multer Uploaders
const uploadDesktop = multer({ storage: storageDesktop });
const uploadMobile = multer({ storage: storageMobile });

// Controller Functions

// Create Carousel Images
const createCarousel = async (req, res) => {
  try {
    console.log("Files received:", req.files);
    // Extract files from the request
    const { desktopImages, mobileImages } = req.files;

    // Map paths of uploaded images
    const desktopPaths = desktopImages.map((file) => file.path);
    const mobilePaths = mobileImages.map((file) => file.path);

    // Create a new CarouselImage document
    const carousel = new CarouselImage({
      carouselImages: desktopPaths,
      carouselImagesMobile: mobilePaths,
    });

    // Save to database
    await carousel.save();
    res.status(201).json({ message: "Carousel images uploaded successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Carousel Images
const getCarousel = async (req, res) => {
  try {
    const carousel = await CarouselImage.findOne();
    if (!carousel) return res.status(404).json({ message: "No images found" });

    res.status(200).json(carousel);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Export Upload Middleware and Controllers
module.exports = {
  uploadDesktop,
  uploadMobile,
  createCarousel,
  getCarousel,
};
