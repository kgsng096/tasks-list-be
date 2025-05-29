const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get("/health", (req, res) => {
  res.send("The app is healthy!");
});

app.listen(port, () => {
  console.log(`The app is listening to PORT: ${port}`);
});
