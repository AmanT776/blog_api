require('dotenv').config();
const sequlize = require('sequelize');
const db = new sequlize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD
);

module.exports = db;