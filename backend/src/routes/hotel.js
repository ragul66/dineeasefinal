const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const Hotel = require("../modules/hoteldetail"); // Hotel model
const Admin = require("../modules/admin"); // Admin model

// Configure Multer to store images in specific folders
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine folder based on field name
    if (file.fieldname === "hotelPhotos") {
      cb(null, "uploads/hotels/");
    } else if (file.fieldname === "FssaicertificateImage") {
      cb(null, "uploads/fssaicertificateimage/");
    } else if (file.fieldname === "nocImage") {
      cb(null, "uploads/nocimage/");
    } else if (file.fieldname === "HTLcertificate") {
      cb(null, "uploads/HTLcertificate/");
    } else {
      cb(null, "/uploads/");
    }
  },
  filename: (req, file, cb) => {
    // Ensure each file has a unique name
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Multer setup to handle multiple files
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// POST: Add a hotel with images
router.post(
  "/add-hotel/:userId",
  upload.fields([
    { name: "hotelPhotos", maxCount: 4 }, // Allows up to 4 hotel photos
    { name: "FssaicertificateImage", maxCount: 1 },
    { name: "nocImage", maxCount: 1 },
    { name: "HTLcertificate", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // Extract text data from request body
      const { hotelName } = req.body;
      const { foodName, price, AvailabilityTime } = req.body;

      // Extract file paths for the uploaded images
      const hotelPhotos = req.files["hotelPhotos"]
        ? req.files["hotelPhotos"].map((file) => file.path)
        : [];
      const FssaicertificateImage = req.files["FssaicertificateImage"]
        ? req.files["FssaicertificateImage"][0].path
        : null;
      const nocImage = req.files["nocImage"]
        ? req.files["nocImage"][0].path
        : null;
      const HTLcertificate = req.files["HTLcertificate"]
        ? req.files["HTLcertificate"][0].path
        : null;

      // Assuming adminId is available from authentication middleware
      const { userId } = req.params;

      // Create the hotel entry
      const newHotel = new Hotel({
        hotelName,
        hotelPhotos,
        FssaicertificateImage,
        nocImage,
        HTLcertificate,
      });

      const savedHotel = await newHotel.save();

      // Find the admin by ID and associate the new hotel with them
      const admin = await Admin.findById(userId);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      admin.hotels.push(savedHotel._id); // Add hotel reference to admin
      await admin.save();

      res
        .status(201)
        .json({ message: "Hotel added successfully", hotel: savedHotel });
    } catch (error) {
      console.error("Error adding hotel:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// GET: Retrieve hotels associated with an admin
router.get("/admin-hotels/:userId", async (req, res) => {
  try {
    // Assuming the adminId is available from authentication (e.g., JWT token)
    const { userId } = req.params; // The adminId should come from authentication middleware

    // Find the admin by ID and populate the hotels they have added
    const admin = await Admin.findById(userId).populate("hotels");
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Return the hotels linked to this admin
    res.status(200).json({ hotels: admin.hotels });
  } catch (error) {
    console.error("Error fetching admin hotels:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
