const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // Ganti dengan password MySQL Anda
    database: 'finance_tracker'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database finance_tracker.');
});

module.exports = db;
