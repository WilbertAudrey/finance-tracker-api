require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

db.connect(err => {
  if (err) {
    console.error('❌ Failed to connect to DB. Please check your config.');
  } else {
    console.log(`✅ Connected to DB: ${process.env.DB_NAME} @ ${process.env.DB_HOST}`);
  }
});

module.exports = db;
