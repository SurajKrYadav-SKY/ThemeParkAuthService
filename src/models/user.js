const mongoose = require("mongoose");
const Role = require("./role");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, SALT } = require("../config/serverConfig");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    image: { type: String, required: false },
    color: { type: Number, required: false },
    profileSetup: { type: Boolean, default: false },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("validate", async function (next) {
  try {
    // Only set role if it’s not already defined (e.g., for new users)
    if (!this.role && this.isNew) {
      let customerRole = await Role.findOne({ name: "Customer" });

      if (!customerRole) {
        // If "Customer" role doesn’t exist, create it
        customerRole = new Role({ name: "Customer" });
        await customerRole.save();
      }

      this.role = customerRole._id; // Assign the role ID
    }
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Error in role assignment:", error);
    next(error); // Pass any errors to Mongoose
  }
});

userSchema.pre("save", function (next) {
  const user = this;

  // this is the logic to hash the password only when the password is updated or during signup.
  if (!user.isModified("password")) {
    return next();
  }

  const saltRounds = Number(SALT);
  const salt = bcrypt.genSaltSync(saltRounds);
  const encryptedPassword = bcrypt.hashSync(user.password, salt);
  user.password = encryptedPassword;
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id, email: this.email }, SECRET_KEY, {
    expiresIn: "2h",
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
