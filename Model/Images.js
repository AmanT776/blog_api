const { DataTypes } = require("sequelize");
const db = require("../Config/db");

const Images = db.define('Images',{
    img_url: DataTypes.STRING,
},{
    timestamp: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
})