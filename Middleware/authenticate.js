const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

exports.authenticate = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(401).json({
      success: false,
      message: "token not provided",
    });
  }
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unautorized access",
    });
  }
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      messages: "Invalid or expired token",
    });
  }
};
