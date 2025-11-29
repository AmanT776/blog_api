const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const authenticate = (req, res, next) => {
  const token = req.headers["Authorization"].split(" ")[1];

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
    return res.status(403).res({
      success: false,
      messages: "Invalid or expired token",
    });
  }
};
