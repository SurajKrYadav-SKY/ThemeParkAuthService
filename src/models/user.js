const mongoose = require("mongoose");
const Role = require("./role");

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

const User = mongoose.model("User", userSchema);
module.exports = User;
