const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../modules/user");
const Booking = require("../modules/booking");
const router = express.Router();

//
// Route to get user profile details by userId
router.get("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user details based on userId
    const user = await User.findById(userId).select("-password"); // Exclude password from response

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

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

// Backend route for user login
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

    // Return user ID and success message if login is successful
    res.status(200).json({
      message: "User logged in successfully",
      clientId: user._id, // Sending the client ID to be stored in localStorage
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//get the bookings for the user
// GET /api/bookings/:userId - Get bookings for a user
// router.get("/bookingdetail/:clientId", async (req, res) => {
//   const { clientId } = req.params;
//   try {
//     // Find the user in userDb and populate the bookings field
//     const user = await User.findById(clientId).populate("bookings");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user.bookings);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching bookings", error });
//   }
// });
// GET /api/bookings/:clientId - Get bookings for a user
router.get("/bookingdetail/:clientId", async (req, res) => {
  const { clientId } = req.params;
  try {
    // Directly fetch bookings from the Booking collection using the clientId
    const bookings = await Booking.find({ userId: clientId });

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
});

// DELETE /api/bookings/:id - Cancel a booking
router.delete("/bookings/:bookingId", async (req, res) => {
  const { bookingId } = req.params;
  try {
    // Find the booking to get the userId
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Remove the booking reference from the user's document
    await User.updateOne(
      { _id: booking.userId },
      { $pull: { bookings: bookingId } }
    );

    // Delete the booking from the Booking collection
    await Booking.findByIdAndDelete(bookingId);

    res.json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error canceling booking", error });
  }
});

module.exports = router;
