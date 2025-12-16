const {
  Post,
  User,
  Images,
  Category,
  PostCategory,
} = require("../Model/associations");
const db = require("../Config/db");
const uploadToCloudinary = require("../Utils/uploadToCloudinary");
const upload = require("../Config/multer");
exports.createPost = async (req, res) => {
  const files = req.files || [];
  const { title, content, category_id } = req.body;
  const userId = req.user.id;

  if (!title && !content) {
    return res.status(400).json({
      success: false,
      message: "At least title or content is required",
    });
  }

  const transaction = await db.transaction();

  try {
    const urls = await Promise.all(
      files.map((file) => uploadToCloudinary(file.buffer))
    );

    const createdPost = await Post.create(
      {
        title,
        content,
        likes: 0,
        user_id: userId,
      },
      { transaction }
    );

    await PostCategory.create(
      {
        post_id: createdPost.id,
        category_id,
      },
      { transaction }
    );

    await Promise.all(
      urls.map((url) =>
        Images.create(
          {
            img_url: url,
            post_id: createdPost.id,
          },
          { transaction }
        )
      )
    );

    await transaction.commit();

    const post = await Post.findOne({
      where: { id: createdPost.id },
      include: [
        {
          model: Images,
          attributes: ["img_url"],
        },
        {
          model: Category,
          attributes: ["category_name"],
          through: { attributes: [] },
        },
      ],
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (err) {
    await transaction.rollback();
    console.error(err);

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
