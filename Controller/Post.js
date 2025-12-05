const Post = require("../Model/Post");

exports.createPost = async (req, res) => {
  const { title, content, likes } = req.body;
  if (!title && !content) {
    return res.status(400).json({
      success: false,
      message: "At least title or content is required ",
    });
  }
  try {
    const post = await Post.create(
      {
        title: title || null,
        content: content || null,
        likes: 0,
      },
      { returning: true }
    );
    return res.status(200).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Internal server error occured while creating your post",
    });
  }
};
