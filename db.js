require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.query('SELECT 1', (err, results) => {
  if (err) {
    console.error('❌ DB connection failed:', err.message);
  } else {
    console.log(`✅ DB connected: ${process.env.DB_NAME} @ ${process.env.DB_HOST}`);
  }
});

module.exports = db;
