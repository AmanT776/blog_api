const { DataTypes } = require("sequelize");
const db = require("../Config/db");

const Role = db.define('Role',{
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role_name: DataTypes.STRING
},{
    timestamp: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
})



module.exports = Role;