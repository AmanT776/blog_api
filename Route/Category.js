const { createCategory } = require("../Controller/Category");
const express = require("express");
const router = express.Router();
const { authorize } = require("../Middleware/authorize");

router.post("/", authorize(["admin", "author"]), createCategory);

module.exports = router;
