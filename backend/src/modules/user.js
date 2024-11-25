const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    emailid: {
      type: String,
      required: true,
      unique: true, // to prevent duplicate users
    },
    address: {
      type: String,
    },
    googleId: {
      type: String, // stores Google ID for users using Google Sign-In
    },
    booking: [
      {
        type: Schema.Types.ObjectId,
        ref: "hotels",
      },
    ],
    Review: [
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

// Password hashing middleware for manual sign-up
userSchema.pre("save", async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
