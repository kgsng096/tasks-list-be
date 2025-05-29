const sequelize = require("../database/index");
const RoleService = require("../services/role.service");

const getAllRoles = async () => {
  const result = await RoleService.getAllRoles();
  return result;
};

module.exports = {
  getAllRoles,
};
