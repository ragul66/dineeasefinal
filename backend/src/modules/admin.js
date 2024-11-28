const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const RestaurantadminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true, // Make sure password is required to avoid missing data
    },
    phonenumber: {
      type: Number,
    },
    emailid: {
      type: String,
      required: true, // Ensure email ID is required to avoid missing data
    },
    address: {
      type: String,
    },
    ownerphoto: {
      type: String,
    },
    status: {
      type: String,
    },
    hotels: [
      {
        type: Schema.Types.ObjectId,
        ref: "hotels",
      },
    ],
    FoodItem: [
      {
        type: Schema.Types.ObjectId,
        ref: "fooditems",
      },
    ],
    Reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "RatingReview",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
RestaurantadminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
      return next(err); // Pass any error to next middleware
    }
  }
  next();
});

// Method to validate password
RestaurantadminSchema.methods.isPasswordValid = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Admin", RestaurantadminSchema);
