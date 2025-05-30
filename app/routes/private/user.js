const express = require("express");
const router = express.Router();

const { getUserTasks } = require("../../controller/user.controller");

router.route("/my-tasks").get(async (req, res) => {
  // #swagger.tags = ['Users']
  const { user } = req;
  const result = await getUserTasks(user);
  res.send(result);
});

module.exports = router;
