const RoleRepository = require("../repository/role.repository");

class RoleService {
  async getAllRoles() {
    return await RoleRepository.getAllRoles();
  }
}

module.exports = new RoleService();
