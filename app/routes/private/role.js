const express = require("express");
const router = express.Router();

const { getAllRoles } = require("../../controller/role.controller");

router.route("/").get(async (req, res) => {
  // #swagger.tags = ['Roles']
  const result = await getAllRoles();
  res.send(result);
});

module.exports = router;
