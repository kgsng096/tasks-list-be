const { body, query, param } = require("express-validator");

const createUserSchema = [
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required.")
    .trim()
    .escape()
    .isLength({ max: 100 })
    .withMessage("Last name cannot be longer than 100 characters."),
  body("firstName")
    .notEmpty()
    .withMessage("First name is required.")
    .trim()
    .escape()
    .isLength({ max: 100 })
    .withMessage("First name cannot be longer than 100 characters."),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email format."),
  body("roleId")
    .isInt({ min: 1 })
    .withMessage("Role must be a positive integer.")
    .notEmpty()
    .withMessage("Role is required."),
  body("password").isLength({ min: 5 }),
];

const loginSchema = [
  body("password").isLength({ min: 5 }),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email format."),
];

module.exports = {
  createUserSchema,
  loginSchema,
};
