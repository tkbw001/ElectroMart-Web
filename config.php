<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "electromart";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
