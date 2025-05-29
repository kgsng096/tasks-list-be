const express = require("express");
const router = express.Router();

const { getAllRoles } = require("../controller/role.controller");

/**
 * @swagger
 * /v1/users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */

router.route("/").get(async (req, res) => {
  const result = await getAllRoles();
  res.send(result);
});

module.exports = router;
