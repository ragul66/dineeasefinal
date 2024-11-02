const express = require("express");
const multer = require("multer");
const Admin = require("../modules/admin");
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads/"); // Make sure to create this directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST the prerequirements details of the Hotel owner and hotel name
router.post("/admininfo", upload.single("ownerphoto"), async (req, res) => {
  try {
    const { name, password, phonenumber, emailid, address } = req.body;
    const ownerphoto = req.file ? req.file.path : null; // store the file path

    const admin = await Admin.create({
      name,
      password,
      phonenumber,
      emailid,
      address,
      ownerphoto,
      status: "pending",
    });

    return res.status(201).json(admin);
  } catch (error) {
    console.error("Error while posting", error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding info" });
  }
});

router.get("/admininfo/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Admin.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error while fetching the details:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the details" });
  }
});

//for login
router.get("/admininfo", async (req, res) => {
  try {
    const { email } = req.query;
    console.log("Searching for user with emailid:", email); // Add this line to check the value

    // Query by emailid field, not ObjectId
    const user = await Admin.findOne({ emailid: email });
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error while fetching the details:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the details" });
  }
});

//post login
router.post("/login", async (req, res) => {
  const { emailid, password } = req.body;

  try {
    const user = await Admin.findOne({ emailid });

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Validate password
    const isValidPassword = await user.isPasswordValid(password);
    if (!isValidPassword) {
      console.log("Invalid password");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.json({ userId: user._id });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
