
<?php
include 'config.php';

$product_id = 1;
$category = 'mobiles';

$sql = "INSERT INTO cart (product_id, quantity, category) VALUES ($product_id, 1, '$category')";
if ($conn->query($sql)) {
    echo "✅ Inserted successfully!";
} else {
    echo "❌ ERROR: " . $conn->error;
}
?>
