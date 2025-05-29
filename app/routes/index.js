const express = require("express");
const router = express.Router();

// const userRoutes = require("./user");
const roleRoutes = require("./roles");

router.use("/roles", roleRoutes);

module.exports = router;
