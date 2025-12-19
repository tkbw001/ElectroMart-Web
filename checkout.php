<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $full_name = $_POST['full_name'] ?? '';
    $address = $_POST['address'] ?? '';
    $city = $_POST['city'] ?? '';
    $zip_code = $_POST['zip_code'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $total = $_POST['total'] ?? 0;
    $payment_method = $_POST['payment_method'] ?? 'unknown';

    // Insert order into the orders table
    $stmt = $conn->prepare("INSERT INTO orders (full_name, address, city, zip_code, phone, total, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $full_name, $address, $city, $zip_code, $phone, $total, $payment_method);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $order_id = $stmt->insert_id;

        // Insert cart items into order_items table
        $cartItems = $conn->query("SELECT * FROM cart");
        while ($item = $cartItems->fetch_assoc()) {
            $product_id = $item['product_id'];
            $quantity = $item['quantity'];
            $conn->query("INSERT INTO order_items (order_id, product_id, quantity) VALUES ($order_id, '$product_id', $quantity)");
        }

        // Clear the cart
        $conn->query("DELETE FROM cart");

        // Show alert and redirect
        echo "<script>
            alert('✅ Order placed successfully!');
            localStorage.removeItem('cart');
            localStorage.removeItem('cartTotal');
            window.location.href = '../index.html';
        </script>";
    } else {
        echo "<script>alert('❌ Failed to place order.'); history.back();</script>";
    }

    $stmt->close();
    $conn->close();
}
?>
