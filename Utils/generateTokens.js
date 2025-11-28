require("dotenv").config();
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

exports.generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  return accessToken;
};

exports.generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    {
      id: user.id,
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return refreshToken;
};
