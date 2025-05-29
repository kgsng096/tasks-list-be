const { body, query, param } = require("express-validator");

const createTaskSchema = [
  body("name")
    .notEmpty()
    .withMessage("Task name is required.")
    .trim()
    .escape()
    .isLength({ max: 500 })
    .withMessage("Last name cannot be longer than 500 characters."),
];

module.exports = {
  createTaskSchema,
};
