const UserRepository = require("../repository/user.repository");

class RoleService {
  async createUser(payload) {
    const existingUser = await UserRepository.getUser({
      where: { email: payload.email },
    });

    if (existingUser) {
      const error = new Error("Email already exists");
      error.statusCode = 409;

      throw error;
    }

    const result = await UserRepository.createUser({ ...payload });

    return result;
  }
}

module.exports = new RoleService();
