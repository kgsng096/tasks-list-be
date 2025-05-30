const UserRepository = require("../repository/user.repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TaskModel, RoleModel } = require("../database/models");

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

  async login(payload) {
    const { user, email, password } = payload;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
    };

    const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      message: "Login successful",
      accessToken: accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roleId: user.roleId,
      },
    };
  }

  async getUserTasks(payload) {
    const { email } = payload;

    const result = await UserRepository.getUser({
      where: { email },
      attributes: ["id", "firstName", "lastName", "email"],
      include: [
        {
          model: TaskModel,
          attributes: ["id", "name"],
          as: "tasks",
        },
        {
          model: RoleModel,
          attributes: ["id", "name"],
          as: "role",
        },
      ],
    });

    return {
      message: "Tasks retrieved successful",
      result,
    };
  }
}

module.exports = new RoleService();
