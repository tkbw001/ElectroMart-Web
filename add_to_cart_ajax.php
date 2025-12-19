<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['product_id'])) {
    $product_id = $conn->real_escape_string($_POST['product_id']);

    // Check if product already exists in cart
    $check = $conn->query("SELECT * FROM cart WHERE product_id = '$product_id'");
    
    if ($check && $check->num_rows > 0) {
        // Product exists, update quantity
        $conn->query("UPDATE cart SET quantity = quantity + 1 WHERE product_id = '$product_id'");
        echo "✅ Quantity updated";
    } else {
        // Get category from products table (optional)
        $categoryResult = $conn->query("SELECT category FROM products WHERE id = '$product_id'");
        $category = ($categoryResult && $categoryResult->num_rows > 0) 
                    ? $categoryResult->fetch_assoc()['category'] 
                    : 'unknown';

        // Insert new item
        $conn->query("INSERT INTO cart (product_id, quantity, category) VALUES ('$product_id', 1, '$category')");
        echo "✅ New product added to cart";
    }
} else {
    echo "❌ Invalid request.";
}
?>
