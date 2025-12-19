<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['product_id'])) {
    $product_id = $conn->real_escape_string($_POST['product_id']);

    $sql = "DELETE FROM cart WHERE product_id = '$product_id'";
    if ($conn->query($sql)) {
        echo "Deleted from database.";
    } else {
        echo "Error: " . $conn->error;
    }
} else {
    echo "Invalid request.";
}
?>
