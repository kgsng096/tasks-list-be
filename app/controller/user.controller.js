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

const login = async (payload) => {
  const { email } = payload;
  const existingUser = await UserRepository.getUser({ where: { email } });

  if (!existingUser) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }
  const result = await UserService.login({ ...payload, user: existingUser });

  return result;
};

module.exports = {
  createUser,
  login,
};
