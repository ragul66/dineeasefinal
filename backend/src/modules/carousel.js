// models/CarouselImage.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarouselImageSchema = new Schema(
  {
    desktopImages: {
      type: [String],
      requied: true,
    },
    mobileImages: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CarouselImage", CarouselImageSchema);
