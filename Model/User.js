const { DataTypes } = require("sequelize");
const db = require("../Config/db");

const User = db.define('User',{
    first_name: DataTypes.STRING(30),
    last_name: DataTypes.STRING(30),
    email: DataTypes.STRING(30),
    password: DataTypes.STRING,
},{
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
})


module.exports = User;