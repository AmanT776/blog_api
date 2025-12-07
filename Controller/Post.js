const Post = require("../Model/Post");
const uploadToCloudinary = require("../Utils/uploadToCloudinary");
const Image = require("../Model/Images");
const User = require("../Model/User");
const upload = require("../Config/multer");
exports.createPost = async (req, res) => {
  const images = req.files;
  const { title, content } = req.body;
  const userId = req.user.id;
  if (!title && !content) {
    return res.status(400).json({
      success: false,
      message: "at least one field required",
    });
  }
  try {
    const urls = await Promise.all(
      images.map((image) => {
        return uploadToCloudinary(image.buffer);
      })
    );
    const createdPost = await Post.create({
      title: title,
      content: content,
      likes: 0,
      user_id: userId,
    });
    const createdImages = await Promise.all(
      urls.map((url) => {
        return Image.create({
          img_url: url,
          post_id: createdPost.id,
        });
      })
    );
    const post = await Post.findOne({
      where: {
        id: createdPost.id,
      },
      include: [
        {
          model: Image,
          attributes: ["img_url"],
        },
      ],
      nest: true,
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
  const posts = await Post.findAll({
    include: { model: Image, attributes: ["img_url"] },
  });
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

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id, {
      include: { model: Image, attributes: ["img_url"] },
    });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "post retrieved successfully",
      data: post,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error occured while fetching the post",
    });
  }
};
