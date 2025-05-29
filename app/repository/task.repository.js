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
}

module.exports = new TaskRepository();
