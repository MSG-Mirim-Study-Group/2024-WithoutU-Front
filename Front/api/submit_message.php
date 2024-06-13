<?php
header('Content-Type: application/json');

include('../api/connect.php');
mysqli_set_charset($conn, "utf8");

$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $message = $_POST['message'];
    $page_id = $_POST['page_id'];

    if ($name && $message && $page_id) {
        $stmt = $conn->prepare("INSERT INTO messages (name, message, page_id) VALUES (?, ?, ?)");
        $stmt->bind_param("ssi", $name, $message, $page_id);

        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "Message submitted successfully.";
        } else {
            $response['success'] = false;
            $response['message'] = "Failed to submit message.";
        }

        $stmt->close();
    } else {
        $response['success'] = false;
        $response['message'] = "Invalid input.";
    }
} else {
    $response['success'] = false;
    $response['message'] = "Invalid request method.";
}

echo json_encode($response);
$conn->close();
?>
