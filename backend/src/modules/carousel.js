// models/CarouselImage.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarouselImageSchema = new Schema({
  carouselImages: {
    type: [String],
    required: true,
  },
  carouselImagesMobile: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("CarouselImage", CarouselImageSchema);
