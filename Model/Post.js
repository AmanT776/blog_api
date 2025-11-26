const { DataTypes } = require("sequelize");
const db = require("../Config/db");

const Post = db.define('Post',{
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    likes: {
        type: DataTypes.INTEGER,
        default: 0
    },
},{
    timestamp: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
})

module.exports = Post