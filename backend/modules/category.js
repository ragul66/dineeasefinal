const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryphoto: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  subcategoryphoto: {
    type: String,
  },
  subcategory: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("category", categorySchema);
