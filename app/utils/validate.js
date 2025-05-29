const UserRepository = require("../repository/user.repository");

const validateUser = async (payload) => {
  const { email } = payload;
  const existingUser = await UserRepository.getUser({ where: { email } });

  if (!existingUser) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  return existingUser;
};

module.exports = { validateUser };
