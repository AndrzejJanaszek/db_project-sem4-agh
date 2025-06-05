const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Brak tokenu lub nieprawidłowy format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: "Nieprawidłowy lub wygasły token" });
  }
};

// Middleware tylko dla użytkownika typu "user"
exports.requireUser = (req, res, next) => {
  if (req.user?.type !== "user") {
    return res.status(403).json({ error: "Dostęp tylko dla użytkowników" });
  }
  next();
};

// Middleware tylko dla firmy
exports.requireCompany = (req, res, next) => {
  if (req.user?.type !== "company") {
    return res.status(403).json({ error: "Dostęp tylko dla firm" });
  }
  next();
};
