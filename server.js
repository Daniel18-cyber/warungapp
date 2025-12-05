import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 8000;

// Setup path absolut
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Dummy data produk
let produk = [
  { id: 1, nama: "Gula", stok: 10 },
  { id: 2, nama: "Susu", stok: 5 },
  { id: 3, nama: "Telur", stok: 8 },
];

// API routes
app.get("/produk", (req, res) => res.json(produk));
app.post("/produk", (req, res) => {
  const newProduk = req.body;
  produk.push(newProduk);
  res.json({ message: "Produk berhasil ditambahkan", data: newProduk });
});
app.put("/produk/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { stok } = req.body;
  const item = produk.find((p) => p.id === id);
  if (item) {
    item.stok = stok;
    res.json({ message: "Stok berhasil diperbarui", data: item });
  } else {
    res.status(404).json({ message: "Produk tidak ditemukan" });
  }
});
app.delete("/produk/:id", (req, res) => {
  const id = parseInt(req.params.id);
  produk = produk.filter((p) => p.id !== id);
  res.json({ message: "Produk berhasil dihapus" });
});

// 🔹 Route fallback untuk semua halaman HTML
app.use((req, res, next) => {
  // Ambil nama file dari URL (misal /sales.html)
  const requestedFile = req.path === "/" ? "index.html" : req.path;
  const filePath = path.join(__dirname, "public", requestedFile);

  // Kirim file kalau ada, kalau gak ada kirim dashboard
  res.sendFile(filePath, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    }
  });
});

// Jalankan server
app.listen(port, () =>
  console.log(`✅ Server berjalan di http://127.0.0.1:${port}`)
);
