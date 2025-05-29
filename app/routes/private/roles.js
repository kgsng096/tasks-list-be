const express = require("express");
const router = express.Router();

const { getAllRoles } = require("../../controller/role.controller");

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Retrieve a list of roles
 *     responses:
 *       200:
 *         description: A list of roles
 */

router.route("/").get(async (req, res) => {
  const result = await getAllRoles();
  res.send(result);
});

module.exports = router;
