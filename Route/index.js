const router = require("express").Router;
const authRoutes = require("./Auth");

router.use("/auth", authRoutes);

module.exports = router;
