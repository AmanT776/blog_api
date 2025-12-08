const express = require("express");
const router = express.Router();
const { createRole } = require("../Controller/Role");
const { authorize } = require("../Middleware/authorize");

router.post("/", authorize(["admin"]), createRole);

module.exports = router;
