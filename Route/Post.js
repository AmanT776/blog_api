const { createPost, getAllPosts, getPostById } = require("../Controller/Post");
const express = require("express");
const router = express.Router();
const upload = require("../Config/multer");
const { authorize } = require("../Middleware/authorize");

router.post("/", upload.array("images"), authorize(["author"]), createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
module.exports = router;
