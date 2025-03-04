const Role = require("../models/role");

class RoleRepository {
  async createRole(data) {
    try {
      const role = await Role.create(data);
      return role;
    } catch (error) {
      console.log("Something went wrong in the repo layer", error);
      throw error;
    }
  }
}

module.exports = RoleRepository;
