const express = require("express");
const router = express.Router();

const userRoutes = require("../private/user");
const roleRoutes = require("../private/roles");

router.use("/roles", roleRoutes);
router.use("/users", userRoutes);

module.exports = router;
