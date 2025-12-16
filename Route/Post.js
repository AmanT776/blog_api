const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../Controller/Post");
const express = require("express");
const router = express.Router();
const upload = require("../Config/multer");
const { authorize } = require("../Middleware/authorize");

router.post(
  "/",
  upload.array("images"),
  authorize(["author", "admin"]),
  createPost
);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
