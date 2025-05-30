const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const {
  getAllTasks,
  createTask,
  editTask,
  getTask,
  deleteTask,
} = require("../../controller/task.controller");

const {
  createTaskSchema,
  updateTaskSchema,
} = require("../../entities/task.entities");

const { idSchema } = require("../../entities/id.entities");

router
  .route("/")
  .get(async (req, res) => {
    const result = await getAllTasks();
    res.send(result);
  })
  .post(createTaskSchema, async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await createTask(req);

      if (result) {
        res.status(201).json({
          message: `Successfully created a task`,
          result,
        });
      }
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const result = await getTask(req);

    res.send(result);
  })
  .put(idSchema, updateTaskSchema, async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const result = await editTask(req);
      res.send(result);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
      throw error;
    }
  })
  .delete(idSchema, async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const result = await deleteTask(req);
      res.send(result);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  });

module.exports = router;
