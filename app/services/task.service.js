const TaskRepository = require("../repository/task.repository");

class TaskService {
  async getAllTasks(options = {}) {
    return await TaskRepository.getAllTasks(options);
  }

  async createTask(payload = {}) {
    return await TaskRepository.createTask(payload);
  }

  async editTask(payload) {
    const { params, body } = payload;

    const query = {
      body,
      where: { id: params.id },
    };

    const result = await TaskRepository.editTask(query);
    return {
      message: "Update Success",
      result,
    };
  }

  async getTask(payload) {
    const { params } = payload;

    return await TaskRepository.getTask({ where: { id: params.id } });
  }

  async deleteTask(payload) {
    const { params } = payload;
    const result = await TaskRepository.deleteTask({
      where: { id: params.id },
    });

    return { message: "Delete Successful", result };
  }
}

module.exports = new TaskService();
