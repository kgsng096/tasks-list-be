const { TaskModel } = require("../database/models");

class TaskRepository {
  async getAllTasks(options = {}) {
    return await TaskModel.findAll(options);
  }

  async createTask(payload) {
    return await TaskModel.create({
      name: payload.name,
      userId: payload.user.id,
    });
  }

  async getTask(options) {
    return await TaskModel.findOne(options);
  }

  async editTask(payload) {
    const { body, where } = payload;
    await TaskModel.update(body, { where });

    return await this.getTask(where);
  }

  async deleteTask(options) {
    return await TaskModel.destroy(options);
  }
}

module.exports = new TaskRepository();
