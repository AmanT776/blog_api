const { createUser } = require("../Controller/User");
const router = require("express").Router();
const { authorize } = require("../Middleware/authorize");

router.post("/", authorize(["admin"]), createUser);

module.exports = router;
