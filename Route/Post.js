const { createPost, getAllPosts } = require("../Controller/Post");
const express = require("express");
const router = express.Router();
const upload = require("../Config/multer");
const { authorize } = require("../Middleware/authorize");

router.post("/", upload.single("image"), authorize(["author"]), createPost);
router.get("/", getAllPosts);
module.exports = router;
