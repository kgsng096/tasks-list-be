const UserRepository = require("../repository/user.repository");
const bcrypt = require("bcryptjs");

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

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

    const userPayload = {
      ...payload,
      password: hashedPassword,
    };

    const result = await UserRepository.createUser(userPayload);

    return result;
  }
}

module.exports = new RoleService();
