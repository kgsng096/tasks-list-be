const sequelize = require("../database/index");
const TaskService = require("../services/task.service");

const { validateUser } = require("../utils/validate");

const getAllTasks = async () => {
  const result = await TaskService.getAllTasks();
  return result;
};

const createTask = async (payload) => {
  const { user, body } = payload;
  try {
    await validateUser(user);

    const result = await TaskService.createTask({
      ...body,
      user,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllTasks,
  createTask,
};
