const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hoteldetailSchema = new Schema(
  {
    hotelName: {
      type: String,
      required: true,
    },
    hotelPhotos: {
      type: [String],
    },
    FssaicertificateImage: {
      type: String,
    },
    nocImage: {
      type: String,
    },
    HTLcertificate: {
      type: String,
    },
    location: {
      type: String,
    },
    opentime: {
      type: String,
    },
    timeslots: {
      type: [String],
    },
    Amenties: {
      type: [String],
    },
    //upload a food details too
    FoodItem: [
      {
        type: Schema.Types.ObjectId,
        ref: "fooditems",
      },
    ],
    RatandRev: [
      {
        type: Schema.Types.ObjectId,
        ref: "ratandrev",
      },
    ],
    booking: [
      {
        type: Schema.Types.ObjectId,
        ref: "booking",
      },
    ],
    RatandRev: [
      {
        type: Schema.Types.ObjectId,
        ref: "ratandrev",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("hotels", hoteldetailSchema);
