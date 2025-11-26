const { DataTypes } = require("sequelize");
const db = require("../Config/db");

const Category = db.define('Category',{
    category_name: DataTypes.STRING(30)
},{
    timestamp: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
})

module.exports = Category;