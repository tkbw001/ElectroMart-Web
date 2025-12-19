<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        // ✅ Redirect to homepage
        header("Location: ../index.html");
        exit();
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
