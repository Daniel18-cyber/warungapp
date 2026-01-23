export async function loadProduk() {
  try {
    const res = await fetch("/api/products"); 
    const data = await res.json();

    const select = document.querySelector("select");
    select.innerHTML = "<option disabled selected>Pilih Produk</option>";

    data.forEach(item => {
      const option = document.createElement("option");
      option.value = item.nama;
      option.textContent = item.nama;
      select.appendChild(option);
    });

    console.log("Produk berhasil dimuat dari server Express:", data);
  } catch (err) {
    console.error("Gagal memuat produk:", err);
  }
}
