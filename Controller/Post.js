const Post = require("../Model/Post");
const uploadToCloudinary = require("../Utils/uploadToCloudinary");
const Image = require("../Model/Images");
exports.createPost = async (req, res) => {
  const image = req.file;
  const imgBuffer = image.buffer;
  const { title, content } = req.body;
  if (!title && !content) {
    return res.status(400).json({
      success: false,
      message: "at least one field required",
    });
  }
  try {
    const img_url = await uploadToCloudinary(imgBuffer);
    console.log(img_url);
    const post = await Post.create({
      title: title,
      content: content,
      likes: 0,
    });
    const image = await Image.create({
      img_url: img_url,
      post_id: post.id,
    });
    return res.status(200).json({
      success: true,
      message: "post created successfully",
      data: post,
    });
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
