const TaskRepository = require("../repository/task.repository");

class TaskService {
  async getAllTasks(options = {}) {
    return await TaskRepository.getAllTasks(options);
  }

  async createTask(payload = {}) {
    return await TaskRepository.createTask(payload);
  }
}

module.exports = new TaskService();
