const express = require("express");
const router = express.Router();
const userRoutes = require("./User");
const { authenticate } = require("../Middleware/authenticate");

router.use("/user", userRoutes);

module.exports = router;
