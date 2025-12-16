const express = require("express");
const router = express.Router();
const userRoutes = require("./User");
const postRoutes = require("./Post");
const roleRoutes = require("./Role");
const categoryRoutes = require("./Category");

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/role", roleRoutes);
router.use("/category", categoryRoutes);

module.exports = router;
