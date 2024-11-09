const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingDetailsSchema = new Schema({
  bookingTime: {
    type: Date,
    required: true, // Ensure booking time is provided
  },
  guests: {
    type: Number,
    required: true, // Ensure number of guests is provided
    min: [1, "At least one guest is required."], // Minimum of 1 guest
  },
  foodOrder: [
    {
      itemName: {
        type: String,
        required: true, // Ensure food item name is provided
      },
      quantity: {
        type: Number,
        required: true, // Ensure quantity is provided
        min: [1, "Quantity must be at least 1."], // Minimum of 1
      },
      price: {
        type: Number,
        required: true, // Ensure price is provided
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true, // Ensure total amount is provided
  },
});

const statusSchema = new Schema({
  confirmed: {
    type: Boolean,
    default: false, // Default to false when the booking is created
  },
  checkedIn: {
    type: Boolean,
    default: false, // Default to false when the booking is created
  },
  checkedOut: {
    type: Boolean,
    default: false, // Default to false when the booking is created
  },
});

const bookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users", // Reference to the Users collection
      required: true, // Ensure user ID is provided
    },
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: "hotels", // Reference to the Hotels collection
      required: true, // Ensure hotel ID is provided
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "admins", // Reference to the Admins collection
      required: true, // Ensure admin ID is provided
    },
    bookingDetails: {
      type: bookingDetailsSchema,
      required: true, // Ensure booking details are provided
    },
    status: {
      type: statusSchema,
      required: true, // Ensure status is provided
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("bookings", bookingSchema);
