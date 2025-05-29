const sequelize = require("../database/index");
const UserService = require("../services/user.service");

const { validateUser } = require("../utils/validate");

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

const login = async (payload) => {
  const existingUser = await validateUser(payload);

  const result = await UserService.login({ ...payload, user: existingUser });

  return result;
};

module.exports = {
  createUser,
  login,
};
