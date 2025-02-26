const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { String, required: [true, "Email is required"], unique: true },
    password: { String, required: [true, "Password is required"] },
    firstName: { String, required: false },
    lastName: { String, required: false },
    image: { String, required: false },
    color: { Number, required: false },
    profileSetup: { Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
