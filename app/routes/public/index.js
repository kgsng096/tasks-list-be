const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const { createUser, login } = require("../../controller/user.controller");
const {
  createUserSchema,
  loginSchema,
} = require("../../entities/user.entities");

router.route("/register").post(createUserSchema, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await createUser(req.body);

    if (result) {
      res.status(201).json({
        message: `Successfully created user with email ${result.email}`,
        user: result,
      });
    }
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
});

router.route("/login").post(loginSchema, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await login(req.body);

    if (result) {
      res.status(200).json({
        message: "Login successful",
        accessToken: result.accessToken,
        user: result.user,
      });
    }
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
});

module.exports = router;
