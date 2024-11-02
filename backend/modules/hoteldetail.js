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
    //upload a food details too
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("hotels", hoteldetailSchema);
