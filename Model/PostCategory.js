const { DataTypes } = require("sequelize");
const db = require("../Config/db");

const PostCategory = db.define("PostCategory", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = PostCategory;
