const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const morgan = require("morgan");
const cors = require("cors");

//local imports
const routes = require("./routes/index");

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    myapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/v1", routes);

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

module.exports = app;
