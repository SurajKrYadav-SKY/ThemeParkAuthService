const RoleRepository = require("../repository/role-repository");

class RoleService {
  constructor() {
    this.roleRepository = new RoleRepository();
  }

  async createRole(data) {
    try {
      const role = await this.roleRepository.createRole(data);
      return role;
    } catch (error) {
      console.log("Something went wrong in the service layer", error);
      throw error;
    }
  }
}

module.exports = RoleService;
