const Images = require("./Images");
const Comment = require("./Comment");
const PostCategory = require("./PostCategory");
const Category = require("./Category");
const Post = require("./Post");
const User = require("./User");
const Role = require("./Role");

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

Role.hasMany(User, {
  foreignKey: "role_id",
});

User.belongsTo(Role, {
  foreignKey: "role_id",
});

User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Post.belongsToMany(Category, { through: PostCategory, foreignKey: "post_id" });

Category.belongsToMany(Post, {
  through: PostCategory,
  foreignKey: "category_id",
});

module.exports = {
  Post,
  Comment,
  User,
  Category,
  Images,
  Role,
  PostCategory,
};
