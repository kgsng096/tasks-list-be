const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const { createUser } = require("../../controller/user.controller");
const { createUserSchema } = require("../../entities/user.entities");

router.route("/register").post(createUserSchema, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const result = await createUser(req.body);

    res.send({
      message: `Successfully created user with email ${result.email}`,
      result,
    });
  } catch (error) {
    if (error.message === "Email already exists") {
      res.status(error.statusCode || 409).json({ error: error.message });
    } else {
      throw error;
    }
  }
});

module.exports = router;
