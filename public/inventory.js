let products = [
  { id: 1, name: "Nasi Goreng Instan", sku: "SKU001", stock: 150, price: 15000 },
  { id: 2, name: "Air Mineral 600ml", sku: "SKU002", stock: 36, price: 3000 },
];

let editingId = null;
let deletingId = null;

function loadProducts() {
  let tbody = document.getElementById("productList");
  tbody.innerHTML = "";

  products.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td><img src="./img/${p.id}.jpg" width="40"></td>
        <td>${p.name}</td>
        <td>${p.sku}</td>
        <td>${p.stock}</td>
        <td>Rp ${p.price.toLocaleString()}</td>
        <td>
          <button onclick="openEdit(${p.id})">✏️</button>
          <button onclick="openDelete(${p.id})">🗑</button>
        </td>
      </tr>
    `;
  });
}

function openAdd() { document.getElementById("modalAdd").style.display = "flex"; }
function closeAdd() { document.getElementById("modalAdd").style.display = "none"; }

function openEdit(id) {
  editingId = id;
  let p = products.find(x => x.id === id);

  document.getElementById("editName").value = p.name;
  document.getElementById("editSku").value = p.sku;
  document.getElementById("editStock").value = p.stock;
  document.getElementById("editPrice").value = p.price;

  document.getElementById("modalEdit").style.display = "flex";
}

function closeEdit() {
  document.getElementById("modalEdit").style.display = "none";
}

function saveEdit() {
  let p = products.find(x => x.id === editingId);

  p.name = document.getElementById("editName").value;
  p.sku = document.getElementById("editSku").value;
  p.stock = parseInt(document.getElementById("editStock").value);
  p.price = parseInt(document.getElementById("editPrice").value);

  closeEdit();
  loadProducts();
}

function openDelete(id) {
  deletingId = id;
  document.getElementById("modalDelete").style.display = "flex";
}

function closeDelete() {
  document.getElementById("modalDelete").style.display = "none";
}

function confirmDelete() {
  products = products.filter(p => p.id !== deletingId);
  closeDelete();
  loadProducts();
}

document.getElementById("btnAddProduct").onclick = openAdd;



// Initial load
window.onload = loadProducts;

