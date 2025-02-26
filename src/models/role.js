const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Role name is required"],
      unique: true,
      enum: ["Admin", "Customer"],
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Create roles if they don't exist
roleSchema.statics.ensureDefaultRoles = async function () {
  const roles = ["Admin", "Customer"];
  for (const roleName of roles) {
    const existingRole = await this.findOne({ name: roleName });
    if (!existingRole) {
      await this.create({ name: roleName });
    }
  }
};

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
