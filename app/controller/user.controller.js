const sequelize = require("../database/index");
const UserService = require("../services/user.service");
const UserRepository = require("../repository/user.repository");

const createUser = async (payload) => {
  const transaction = await sequelize.transaction();
  try {
    const result = await UserService.createUser(payload);
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  createUser,
};
