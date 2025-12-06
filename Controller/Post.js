const Post = require("../Model/Post");
const uploadToCloudinary = require("../Utils/uploadToCloudinary");
exports.createPost = async (req, res) => {
  const image = req.file;
  const imagePath = image.path;
  const { title, content } = req.body;
  if (!title && !content) {
    return res.status(400).json({
      success: false,
      message: "at least one field required",
    });
  }
  try {
    const img = await uploadToCloudinary(imagePath);
    console.log(img);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating post",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  const posts = await Post.findAll();
  if (!posts) {
    return res.status(404).json({
      success: false,
      message: "no post found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "posts retrieved successfully",
    data: posts,
  });
};
