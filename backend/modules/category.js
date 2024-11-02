const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
});

const categorySchema = new Schema({
  categoryphoto: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  subcategories: [subcategorySchema], // Array of subcategories
});

module.exports = mongoose.model("Category", categorySchema);
