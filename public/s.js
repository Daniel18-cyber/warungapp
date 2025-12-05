<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>WarungApp Dashboard</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    
    <aside class="sidebar">
      <h2 class="logo">🏪 WarungApp</h2>
      <nav>
        <a href="dashboard.html" class="active">📊 Dashboard</a>
        <a href="sales.html">💰 Sales</a>
        <a href="inventory.html">📦 Inventory</a>
        <a href="reports.html">📜 Reports</a>
      </nav>
    </aside>

    
    <main class="main">
      <header>
        <h1>Hi, Daniel</h1>
        <p>Welcome to WarungApp</p>
      </header>

    
      <section class="summary">
        <div class="card">
          <h3>Sales</h3>
          <p class="value">Rp 1,200,000</p>
          <span>Today's total sales</span>
        </div>
        <div class="card">
          <h3>Inventory</h3>
          <p class="value">87</p>
          <span>Low stock items</span>
        </div>
      </section>

      <!-- Transaction section -->
      <section class="transactions">
        <div class="new-transaction">
          <h3>New Transaction</h3>
          <form>
            <label>Product</label>
            <select>
              <option>Gula</option>
              <option>Susu</option>
              <option>Telur</option>
            </select>

            <label>Quantity</label>
            <input type="number" min="1" placeholder="Qty" />

            <button type="button">Add to Cart</button>
          </form>
        </div>

        <div class="recent-transactions">
          <h3>Recent Transactions</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>22 Sep</td>
                <td>Gula</td>
                <td>Rp 25,000</td>
              </tr>
              <tr>
                <td>21 Sep</td>
                <td>Susu</td>
                <td>Rp 20,000</td>
              </tr>
              <tr>
                <td>21 Sep</td>
                <td>Telur</td>
                <td>Rp 30,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>

  <script type="module" src="./js/main.js"></script>

</body>
</html>
