const { DataTypes } = require("sequelize");
const db = require("../Config/db");

const PostCategory = db.define("PostCategory", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = PostCategory;
