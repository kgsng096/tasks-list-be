const app = require("./src/app");
require("dotenv").config();

const { testConnection } = require("./app/database/index");

const port = process.env.PORT || 5000;

app.get("/health", async (req, res) => {
  res.send("The app is healthy!");

  await testConnection();
});

app.listen(port, async () => {
  console.log(`The app is listening to PORT: ${port}`);

  await testConnection();
});
