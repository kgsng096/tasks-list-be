const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const csurf = require("csurf");
const authenticate = require("../app/middleware/authentication");

const privateRoutes = require("../app/routes/private/index");
const publicRoutes = require("../app/routes/public/index");

const app = express();

require("dotenv").config();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}/api`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [path.join(__dirname, "../app/routes/*.js")],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(
  cookieParser(
    process.env.COOKIE_SECRET || "super_secret_cookie_key_please_change_me"
  )
);

app.use(
  session({
    secret:
      process.env.SESSION_SECRET || "super_secret_session_key_please_change_me",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(morgan("dev"));

const csrfProtection = csurf({ cookie: true });

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/", publicRoutes);

app.get("/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// app.use("/api", authenticate, csrfProtection, privateRoutes);
app.use("/api", authenticate, csrfProtection, privateRoutes);

app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    console.error("CSRF Token Error:", err.message);
    return res
      .status(403)
      .json({ error: "Invalid CSRF token. Please refresh the page." });
  }
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

module.exports = app;
