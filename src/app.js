const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const csurf = require("csurf");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const cookieParser = require("cookie-parser");
const authenticate = require("../app/middleware/authentication");

const privateRoutes = require("../app/routes/private/index");
const publicRoutes = require("../app/routes/public/index");

const swaggerDocs = require("../OpenAPI/swagger_output.json");

const app = express();

require("dotenv").config();

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
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000", // your frontend URL
    credentials: true,
  })
);

app.use(morgan("dev"));

// --- CSRF: session-based, do NOT use { cookie: true } ---
const csrfProtection = csurf(); // session-based

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/", publicRoutes);

// CSRF token endpoint
app.get("/csrf-token", csrfProtection, (req, res) => {
  // #swagger.tags = ['Public - Auth']
  res.json({ csrfToken: req.csrfToken() });
});

// Protect all /api routes
app.use("/api", authenticate, csrfProtection, privateRoutes);

// CSRF error handler
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
