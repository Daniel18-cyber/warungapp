require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB CONNECT ERROR:", err);
    return;
  }

  console.log("✅ MYSQL CONNECTED");

  const sql = `
    INSERT INTO categories (nama_kategori)
    VALUES ('TestKategori')
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log("❌ INSERT ERROR:", err);
    } else {
      console.log("✅ INSERT SUCCESS");
      console.log("Inserted ID:", result.insertId);
    }

    db.end();
  });
});
