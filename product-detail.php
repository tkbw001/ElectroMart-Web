
----- product-detail.php -----
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'config.php';

// Accept alphanumeric product IDs like 'p1', 'p2', etc.
if (!isset($_GET['id']) || !preg_match('/^[a-zA-Z0-9]+$/', $_GET['id'])) {
    die("<h2>❌ Invalid product ID format.</h2>");
}

$id = $conn->real_escape_string($_GET['id']);
$query = "SELECT * FROM products WHERE id = '$id'";
$result = $conn->query($query);

if (!$result || $result->num_rows === 0) {
    die("<h2>❌ Product not found.</h2>");
}

$product = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($product['name']) ?> - ElectroMart</title>
  <link rel="stylesheet" href="Styel.css">
</head>
<body>
  <header>
    <h1>ElectroMart</h1>
    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="products.php">Products</a></li>
        <li><a href="cart.html">Cart</a></li>
        <li><a href="checkout.html">Checkout</a></li>
      </ul>
    </nav>
  </header>

  <main class="product-detail-container">
    <div class="product-images">
      <img id="main-product-image" src="<?= htmlspecialchars($product['image']) ?>" alt="<?= htmlspecialchars($product['name']) ?>">
    </div>
    <div class="product-info">
      <h1 id="product-title"><?= htmlspecialchars($product['name']) ?></h1>
      <div class="availability">
        <span class="available">Available</span>
      </div>
      <div class="price-container">
        <span class="price">$<?= htmlspecialchars($product['price']) ?></span>
      </div>
      <div class="product-description">
        <h3>Description</h3>
        <p><?= htmlspecialchars($product['description']) ?></p>
      </div>
    </div>
  </main>

  <footer>
    <p>&copy; 2025 ElectroMart. All rights reserved.</p>
  </footer>
</body>
</html>