const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../modules/user");
const router = express.Router();

//manual register
router.post("/register", async (req, res) => {
  try {
    const { name, password, phoneNumber, emailid, address } = req.body;
    const existingUser = await User.findOne({ emailid });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, password, phoneNumber, emailid, address });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//google-signin
router.post("/google-signin", async (req, res) => {
  try {
    const { name, emailid, googleId, phoneNumber, address } = req.body;
    let user = await User.findOne({ emailid });

    // If user doesn't exist, create a new one
    if (!user) {
      user = new User({ name, emailid, googleId, phoneNumber, address });
      await user.save();
    }

    res
      .status(200)
      .json({ message: "User signed in with Google successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//login to the home page
router.post("/login", async (req, res) => {
  try {
    const { emailid, password } = req.body;
    const user = await User.findOne({ emailid });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    } else {
      return res.status(400).json({ message: "Please use Google Sign-In" });
    }

    res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
