const { DataTypes } = require("sequelize");
const db = require("../Config/db");
const User = require("./User");
const Role = db.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role_name: DataTypes.STRING,
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Role;
