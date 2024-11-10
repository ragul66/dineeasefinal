const Booking = require("../modules/booking"); // Adjust the path if necessary
const User = require("../modules/user");
const Hotel = require("../modules/hoteldetail");
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
  const { userId, hotelId } = req.params;
  const booking = req.body; // The booking object sent from the client (React)

  try {
    // Step 1: Create a new booking using the data sent by the client
    console.log("Creating a new booking object...");
    const newBooking = new Booking(booking);

    console.log("Saving the booking to the database...");
    const savedBooking = await newBooking.save();
    console.log("Booking saved successfully:", savedBooking);

    // Step 2: Update the user's bookings with the new booking ID
    try {
      console.log(`Updating user ${userId} with new booking ID...`);
      await User.findByIdAndUpdate(userId, {
        $push: { booking: savedBooking._id },
      });
      console.log("User updated successfully.");
    } catch (userError) {
      console.error("Error updating the user:", userError);
      return res
        .status(400)
        .json({ message: "Failed to update user", error: userError });
    }

    // Step 3: Optionally, update the hotel (restaurant) to add the booking
    try {
      console.log(`Updating hotel ${hotelId} with new booking ID...`);
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { booking: savedBooking._id },
      });
      console.log("Hotel updated successfully.");
    } catch (hotelError) {
      console.error("Error updating the hotel:", hotelError);
      return res
        .status(400)
        .json({ message: "Failed to update hotel", error: hotelError });
    }

    // Return the created booking as a response
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Error creating the booking:", error);
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
