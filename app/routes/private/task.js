const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const { getAllTasks, createTask } = require("../../controller/task.controller");
const { createTaskSchema } = require("../../entities/task.entities");

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

module.exports = router;
