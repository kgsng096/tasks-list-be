const TaskRepository = require("../repository/task.repository");
const UserRepository = require("../repository/user.repository");

const validateUser = async (payload) => {
  const { email } = payload;
  const existingUser = await UserRepository.getUser({ where: { email } });

  if (!existingUser) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  return existingUser;
};

const validateTask = async (payload) => {
  const { id } = payload;

  const existingTask = await TaskRepository.getTask({ where: { id } });

  if (!existingTask) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return existingTask;
};

const validateUserTask = async (payload) => {
  await validateUser(payload.user);
  const { dataValues: existingTask } = await validateTask(payload.params);

  if (existingTask.userId !== payload.user.id) {
    const error = new Error("Unauthorized");
    error.statusCode = 404;
    throw error;
  }

  return existingTask;
};

module.exports = { validateUser, validateUserTask };
