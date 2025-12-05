export async function loadTransaksi() {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = `
    <tr><td>28 Okt</td><td>Gula</td><td>Rp 25.000</td></tr>
    <tr><td>27 Okt</td><td>Susu</td><td>Rp 20.000</td></tr>
  `;
}
