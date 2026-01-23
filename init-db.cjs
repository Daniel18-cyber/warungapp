require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect(err => {
  if (err) {
    console.error(" DB ERROR:", err);
    return;
  }

  console.log("✅ MYSQL CONNECTED");

  const queries = [

    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nama VARCHAR(100) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin','kasir') NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nama_kategori VARCHAR(50) NOT NULL
    )`,

    `CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nama_produk VARCHAR(100) NOT NULL,
      harga INT NOT NULL,
      stok INT NOT NULL,
      category_id INT,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )`,

    `CREATE TABLE IF NOT EXISTS transactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      total INT NOT NULL,
      tanggal DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`,

    `CREATE TABLE IF NOT EXISTS transaction_details (
      id INT AUTO_INCREMENT PRIMARY KEY,
      transaction_id INT,
      product_id INT,
      qty INT NOT NULL,
      harga INT NOT NULL,
      subtotal INT NOT NULL,
      FOREIGN KEY (transaction_id) REFERENCES transactions(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )`

    

  ];

  let done = 0;

  queries.forEach((sql, i) => {
    db.query(sql, err => {
      if (err) {
        console.error(`❌ ERROR TABLE ${i+1}`, err);
      } else {
        console.log(`✅ TABLE ${i+1} OK`);
      }

      done++;

      if (done === queries.length) {
        console.log(" ALL TABLE CREATED SUCCESSFULLY");
        db.end();
      }
    });
  });

});
