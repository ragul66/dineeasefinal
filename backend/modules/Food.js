const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fooditemSchema = new Schema(
  {
    foodname: {
      type: String,
      required: true,
    },
    foodphoto: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
    },
    subcategory: {
      type: String,
    },
    timing: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("fooditems", fooditemSchema);
