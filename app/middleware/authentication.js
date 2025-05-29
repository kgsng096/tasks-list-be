const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ message: "Authentication token required." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT verification error:", err.message);
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    req.user = user;

    next();
  });
};

module.exports = authenticate;
