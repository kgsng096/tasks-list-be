const sequelize = require("../database/index");
const TaskService = require("../services/task.service");

const { validateUser, validateUserTask } = require("../utils/validate");

const getAllTasks = async () => {
  const result = await TaskService.getAllTasks();
  return result;
};

const createTask = async (payload) => {
  const transaction = await sequelize.transaction();
  const { user, body } = payload;
  try {
    await validateUser(user);

    const result = await TaskService.createTask({
      ...body,
      user,
    });
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const editTask = async (payload) => {
  const transaction = await sequelize.transaction();
  try {
    await validateUserTask(payload);
    const result = await TaskService.editTask(payload);
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getTask = async (payload) => {
  try {
    await validateUserTask(payload);

    const result = await TaskService.getTask(payload);

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (payload) => {
  try {
    await validateUserTask(payload);

    const result = await TaskService.deleteTask(payload);

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllTasks,
  createTask,
  editTask,
  getTask,
  deleteTask,
};
