const express = require("express");
const router = express.Router();
const userRoutes = require("./User");
const postRoutes = require("./Post");
const roleRoutes = require("./Role");
const { authenticate } = require("../Middleware/authenticate");

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/role", roleRoutes);

module.exports = router;
