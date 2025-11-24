require('dotenv').config();
const sequlize = require('sequelize');

try{
    const db = new sequlize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,{
            dialect: 'mysql'
        }
    );
    module.exports = db;
}catch(error){
    console.log(error);
}
