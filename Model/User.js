const { DataTypes } = require("sequelize");
const db = require("../Config/db");
const Post = require("./Post");
const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: DataTypes.STRING(30),
    last_name: DataTypes.STRING(30),
    email: DataTypes.STRING(30),
    password: DataTypes.STRING,
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamp: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = User;
