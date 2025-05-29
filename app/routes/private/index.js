const express = require("express");
const router = express.Router();

const userRoutes = require("./user");
const roleRoutes = require("./role");
const taskRoutes = require("./task");

router.use("/roles", roleRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);

module.exports = router;
