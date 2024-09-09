const mysql = require("mysql2");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const db = mysql
  .createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

module.exports = db;
