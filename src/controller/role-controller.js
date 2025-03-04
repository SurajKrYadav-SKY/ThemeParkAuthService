const RoleService = require("../services/role-service");

const roleService = new RoleService();

const createRole = async (req, res) => {
  try {
    const response = await roleService.createRole({
      name: req.body.name,
      description: req.body.description,
    });
    return res.status(201).json({
      data: response,
      success: true,
      message: "Role has been created successfully",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: error.message || "Something went wrong in the controller.",
      error: { error },
    });
  }
};

module.exports = {
  createRole,
};
