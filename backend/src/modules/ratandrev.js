const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratandrevSchema = new Schema({
  rating: {
    type: Number,
  },
  comments: {
    type: Number,
  },
});
