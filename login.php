<?php
session_start();

// Establish connection to MySQL database
$servername = "LAPTOP-T869H191";
$username = "root@localhost"; // Update with your MySQL username
$password = "Neville@2001"; // Update with your MySQL password
$database = "bisi"; // Update with your MySQL database name

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$username = $_POST['username'];
$password = $_POST['password'];

// Query database (use prepared statement to prevent SQL injection)
$sql = "SELECT * FROM users WHERE username=? AND password=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

// Check if a row was returned
if ($result->num_rows > 0) {
    // Store user information in session
    $_SESSION['username'] = $username;
    // Redirect to a logged-in page
    header("Location: main.html");
    exit(); // Terminate script after redirection
} else {
    // If no row was returned, display error message or redirect back to login page
    echo "Invalid username or password";
}

$stmt->close();
$conn->close();
?>

