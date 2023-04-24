const mysql = require('mysql');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_DATABASE || 'BetterBuy',
    password: process.env.DB_PASSWORD || 'password'
};

const connection = mysql.createConnection(dbConfig);

module.exports = connection;