const { createCategory, getAllCategories } = require("../Controller/Category");
const express = require("express");
const router = express.Router();
const { authorize } = require("../Middleware/authorize");

router.post("/", authorize(["admin", "author"]), createCategory);
router.get("/", authorize(["admin", "author"]), getAllCategories);
module.exports = router;
