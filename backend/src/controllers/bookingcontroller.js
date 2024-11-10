const Booking = require("../modules/booking"); // Adjust the path if necessary
const User = require("../modules/user");
const hotel = require("../modules/hoteldetail");
const path = require("path");
const fs = require("fs");

// GET all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId hotelId adminId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve bookings", error });
  }
};

// GET a single booking by ID
exports.getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id).populate(
      "userId hotelId adminId"
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve booking", error });
  }
};

// POST a new booking
exports.createBooking = async (req, res) => {
  const { ...booking } = req.body;
  const { userId, hotelId } = req.params;

  try {
    // Step 1: Create a new booking
    const newBooking = new Booking(booking);
    const savedBooking = await newBooking.save();

    // Step 2: Find the user by userID and add the booking ID to their booking array
    await User.findByIdAndUpdate(userId, {
      $push: { booking: savedBooking._id },
    });

    await User.findByIdAndUpdate(hotelId, {
      $push: { booking: savedBooking._id },
    });

    await res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: "Failed to create booking", error });
  }
};

// UPDATE an existing booking
exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBooking)
      return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: "Failed to update booking", error });
  }
};

// DELETE a booking
exports.deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking)
      return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete booking", error });
  }
};
