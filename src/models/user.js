const mongoose = require("mongoose");
const Role = require("./role");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, SALT } = require("../config/serverConfig");

const userSchema = new mongoose.Schema(
  {
    email: { String, required: [true, "Email is required"], unique: true },
    password: { String, required: [true, "Password is required"] },
    firstName: { String, required: false },
    lastName: { String, required: false },
    image: { String, required: false },
    color: { Number, required: false },
    profileSetup: { Boolean, default: false },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
      default: async () => {
        // Ensure the default roles are created before setting the default role
        await Role.ensureDefaultRoles(); // Ensure that the roles exist
        const customerRole = await Role.findOne({ name: "Customer" });
        return customerRole._id; // Set default role to Customer
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
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
