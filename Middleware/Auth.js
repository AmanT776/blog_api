const jwt = require("jsonwebtoken");
require("dotenv").config();

export const authenticate = (req, res, next) => {
  const token = req.headers["Authorization"].split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token Provided",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "invalid access token",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
