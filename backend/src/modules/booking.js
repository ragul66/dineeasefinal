const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Food Item schema for booking
const foodOrderSchema = new Schema({
  itemName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1."],
  },
  price: {
    type: Number,
    required: true,
  },
});

// Booking details schema
const bookingDetailsSchema = new Schema({
  hotelName: {
    type: String,
  },
  bookingTime: {
    type: String,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
    min: [1, "At least one guest is required."],
  },
  foodOrder: [foodOrderSchema],
  totalAmount: {
    type: Number,
    required: true,
  },
});

// Status schema for booking
const statusSchema = new Schema({
  confirmed: { type: Boolean, default: false },
  checkedIn: { type: Boolean, default: false },
  checkedOut: { type: Boolean, default: false },
});

// Main booking schema
const bookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: "hotels",
      required: true,
    },
    bookingDetails: {
      type: bookingDetailsSchema,
      required: true,
    },
    status: {
      type: statusSchema,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("booking", bookingSchema);
