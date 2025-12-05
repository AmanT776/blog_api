const express = require("express");
const router = express.Router();
const userRoutes = require("./User");
const postRoutes = require("./Post");
const { authenticate } = require("../Middleware/authenticate");

router.use("/user", userRoutes);
router.use("/post", postRoutes);

module.exports = router;
