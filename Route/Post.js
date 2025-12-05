const { createPost } = require("../Controller/Post");
const express = require("express");
const router = express.Router();
const { authorize } = require("../Middleware/authorize");

router.post("/", authorize(["author"]), createPost);

module.exports = router;
