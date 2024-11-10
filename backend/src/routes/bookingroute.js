const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingcontroller");

// GET all bookings
router.get("/", bookingController.getAllBookings);

// GET a single booking by ID
router.get("/:id", bookingController.getBookingById);

// POST a new booking
router.post(
  "/restaurantbooking/:userId/:hotelId",
  bookingController.createBooking
);

// UPDATE an existing booking
router.put("/:id", bookingController.updateBooking);

// DELETE a booking
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
