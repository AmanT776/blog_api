const { DataTypes } = require("sequelize");
const db = require("../Config/db");

const Comment = db.define(
  "Comment",
  {
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

module.exports = Comment;
