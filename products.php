
----- products.php -----
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'config.php';

$sql = "SELECT * FROM products";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Products - ElectroMart</title>
  <link rel="stylesheet" href="Styel.css">
</head>
<body>
  <header>
    <h1>ElectroMart</h1>
    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="products.php" class="active">Products</a></li>
        <li><a href="cart.html">Cart</a></li>
        <li><a href="checkout.html">Checkout</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <h2>Our Products</h2>
    <div class="product-grid">
      <?php if ($result && $result->num_rows > 0): ?>
        <?php while ($row = $result->fetch_assoc()): ?>
          <article class="product-item">
            <a href="product-detail.php?id=<?= urlencode($row['id']) ?>">
              <img src="<?= htmlspecialchars($row['image']) ?>" alt="<?= htmlspecialchars($row['name']) ?>">
            </a>
            <h3><?= htmlspecialchars($row['name']) ?></h3>
            <p class="price">$<?= number_format($row['price'], 2) ?></p>
            <a href="product-detail.php?id=<?= urlencode($row['id']) ?>" class="btn-details">View Details</a>
          </article>
        <?php endwhile; ?>
      <?php else: ?>
        <p>No products found.</p>
      <?php endif; ?>
    </div>
  </main>

  <footer>
    <p>&copy; 2025 ElectroMart. All rights reserved.</p>
  </footer>
<
