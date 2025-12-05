import { loadProduk } from "./produk.js";
import { loadTransaksi } from "./transaksi.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadProduk();
  await loadTransaksi();
});
