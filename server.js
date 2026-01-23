import express from "express";
import jwt from "jsonwebtoken";
import mysql from "mysql2";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect((err) => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("MYSQL CONNECTED");
  }
});


app.get("/api/products", (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});


app.post("/api/products", (req, res) => {
  const { nama_produk, harga, stok, category_id } = req.body;

  const sql = `
    INSERT INTO products 
    (nama_produk, harga, stok, category_id) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [nama_produk, harga, stok, category_id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "PRODUCT ADDED",
      id: result.insertId
    });
  });
});



app.post("/api/transactions", (req, res) => {
  const { user_id, items } = req.body;

  let total = 0;
  items.forEach(item => {
    total += item.harga * item.qty;
  });

  const insertTransaction =
    "INSERT INTO transactions (user_id, total) VALUES (?, ?)";

  db.query(insertTransaction, [user_id, total], (err, result) => {
    if (err) return res.status(500).json(err);

    const transaction_id = result.insertId;

    const values = items.map(item => [
      transaction_id,
      item.product_id,
      item.qty,
      item.harga,
      item.harga * item.qty
    ]);

    const insertDetail = `
      INSERT INTO transaction_details
      (transaction_id, product_id, qty, harga, subtotal)
      VALUES ?
    `;

    db.query(insertDetail, [values], (err2) => {
      if (err2) return res.status(500).json(err2);

       items.forEach(item => {
        const updateStock = `
          UPDATE products 
          SET stok = stok - ? 
          WHERE id = ?
        `;

        db.query(updateStock, [item.qty, item.product_id]);
      });

      res.json({
        message: "TRANSACTION SUCCESS",
        transaction_id
      });
    });
  });
});

app.get("/api/transactions", (req, res) => {
  const sql = `
    SELECT 
      t.id,
      t.total,
      t.tanggal,
      u.nama AS kasir
    FROM transactions t
    LEFT JOIN users u ON t.user_id = u.id
    ORDER BY t.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.get("/api/transactions/:id", (req, res) => {
  const id = req.params.id;

  const sql = `
    SELECT 
      p.nama_produk,
      d.qty,
      d.harga,
      d.subtotal
    FROM transaction_details d
    JOIN products p ON d.product_id = p.id
    WHERE d.transaction_id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.get("/api/dashboard-summary", (req, res) => {

  const sql = `
    SELECT 
      COUNT(id) AS total_transaksi,
      SUM(total) AS total_penjualan,
      AVG(total) AS rata_rata
    FROM transactions
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result[0]);
  });

});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE nama = ?";

  db.query(sql, [username], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.json({ success: false, message: "USER NOT FOUND" });
    }

    const user = result[0];

    if (user.password !== password) {
      return res.json({ success: false, message: "WRONG PASSWORD" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        nama: user.nama,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        nama: user.nama,
        role: user.role
      }
    });
  });  
});

app.get("/me", (req, res) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ login: false });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

    if (err) {
      return res.json({ login: false });
    }

    res.json({
      login: true,
      user: decoded
    });

  });

});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log("server jalan");
});
