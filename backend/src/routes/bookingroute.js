const express = require("express");
const router = express.Router();
const {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingcontroller");

// GET all bookings
router.get("/", getAllBookings);

// GET a single booking by ID
router.get("/:id", getBookingById);

// POST a new booking
router.post("/restaurantbooking/:userID", createBooking);

// UPDATE an existing booking
router.put("/:id", updateBooking);

// DELETE a booking
router.delete("/:id", deleteBooking);

module.exports = router;
