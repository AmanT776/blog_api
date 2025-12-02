const { DataTypes } = require("sequelize");
const db = require("../Config/db");
const Images = require("./Images");
const Comment = require("./Comment");

const Post = db.define(
  "Post",
  {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    likes: {
      type: DataTypes.INTEGER,
      default: 0,
    },
  },
  {
    timestamp: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

Post.hasMany(Images, {
  foreignKey: "post_id",
});

Images.belongsTo(Post, {
  foreignKey: "post_id",
});

module.exports = Post;
