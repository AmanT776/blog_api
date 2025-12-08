const { Post, User, Images, Category } = require("../Model/associations");
const uploadToCloudinary = require("../Utils/uploadToCloudinary");
const upload = require("../Config/multer");
exports.createPost = async (req, res) => {
  const Imagess = req.files;
  const { title, content, category_id } = req.body;
  const userId = req.user.id;
  if (!title && !content) {
    return res.status(400).json({
      success: false,
      message: "at least one field required",
    });
  }
  try {
    const urls = await Promise.all(
      Imagess.map((Images) => {
        return uploadToCloudinary(Images.buffer);
      })
    );
    const createdPost = await Post.create({
      title: title,
      content: content,
      likes: 0,
      user_id: userId,
      category_id: category_id,
    });
    const createdImagess = await Promise.all(
      urls.map((url) => {
        return Images.create({
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
          model: Images,
          attributes: ["img_url"],
        },
        {
          model: Category,
          attributes: ["category_name"],
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
    include: { model: Images, attributes: ["img_url"] },
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
      include: { model: Images, attributes: ["img_url"] },
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

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    await Post.update(req.body, {
      where: {
        id: id,
      },
      include: { model: Images, attributes: ["img_url"] },
    });
    const updatedPost = await Post.findByPk(id);
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error occured while updating the post",
    });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    const deletedPost = await post.destroy();
    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error occured while deleting the post",
    });
  }
};
