<?php
session_start();

// Establish connection to MySQL database
$servername = "localhost:3306";
$username = "root"; // Update with your MySQL username
$password = "Neville@2001"; // Update with your MySQL password
$database = "bisi"; // Update with your MySQL database name

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form has been submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepare and execute SQL statement
    $sql = "SELECT * FROM users WHERE Username=? AND PasswordHash=?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        die("Error preparing statement: " . $conn->error);
    }
    
    $stmt->bind_param("ss", $username, $password);
    if (!$stmt->execute()) {
        die("Error executing statement: " . $stmt->error);
    }

    // Get result
    $result = $stmt->get_result();

    // Check if a row was returned
    if ($result->num_rows > 0) {
        // Store user information in session
        $user = $result->fetch_assoc();
        $_SESSION['username'] = $user['Username']; // Assuming 'Username' is the unique identifier
        // Redirect to a logged-in page
        header("Location: main.html");
        exit(); // Terminate script after redirection
    } else {
        // If no row was returned, display error message or redirect back to login page
        echo "Invalid username or password";
    }

    // Close statement
    $stmt->close();
}

// Close connection
$conn->close();
?>
