const { body, query, param } = require("express-validator");

const idSchema = [
  param("id").notEmpty().withMessage("ID is required").isInt({ min: 1 }),
];

module.exports = {
  idSchema,
};
