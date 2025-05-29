const { UserModel } = require("../database/models");

class UserRepository {
  async getUser(options = {}) {
    return await UserModel.findOne({ ...options });
  }

  async createUser(options = {}) {
    return await UserModel.create({ ...options });
  }
}

module.exports = new UserRepository();
