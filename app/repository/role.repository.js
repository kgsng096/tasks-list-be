const { RoleModel } = require("../database/models");

class RoleRepository {
  async getAllRoles() {
    return await RoleModel.findAll({});
  }
}

module.exports = new RoleRepository();
