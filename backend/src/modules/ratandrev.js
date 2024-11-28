const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratandrevSchema = new Schema(
  {
    reviewername: {
      type: String,
    },
    reviewermailid: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
    },
    comments: {
      type: String, // This should likely be a String instead of Number for comments
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
const RatingReview = mongoose.model("RatingReview", ratandrevSchema);
module.exports = RatingReview;
