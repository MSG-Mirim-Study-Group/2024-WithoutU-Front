<?php
header('Content-Type: application/json');
include('../api/connect.php');
mysqli_set_charset($conn, "utf8");

$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['send'])) {
    // 이름 제출 기능
    $name = $_POST['name'];
    if ($name) {
        $response['success'] = true;
        $response['message'] = "Name submitted successfully.";
    } else {
        $response['success'] = false;
        $response['message'] = "Name is required.";
    }
} else if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['send'])) {
    // 메시지 제출 기능
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
} else if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // 메시지 로드 기능
    if (isset($_GET['page_id'])) {
        $page_id = $_GET['page_id'];

        $sql = "SELECT name, message FROM messages WHERE page_id='$page_id'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $messages = array();
            while ($row = $result->fetch_assoc()) {
                $messages[] = array('name' => $row['name'], 'message' => $row['message']);
            }
            $response['success'] = true;
            $response['messages'] = $messages;
        } else {
            $response['success'] = false;
            $response['message'] = "No messages found.";
        }
    } else {
        $response['success'] = false;
        $response['message'] = "Page ID not provided.";
    }
} else {
    $response['success'] = false;
    $response['message'] = "Invalid request method.";
}

echo json_encode($response);
$conn->close();
?>
