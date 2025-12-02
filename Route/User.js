const { createUser } = require("../Controller/User");
const router = require("express").Router();

router.post("/", createUser);

module.exports = router;
