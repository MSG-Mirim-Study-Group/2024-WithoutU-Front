<?php
header('Content-Type: application/json');

include('../api/connect.php');
mysqli_set_charset($conn, "utf8");

$response = array( 'success' => true, 'messages' => array( array('id' => 1, 'text' => 'Hello'), array('id' => 2, 'text' => 'World') ) );

if ($_SERVER["REQUEST_METHOD"] == "GET") {
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

$conn->close();
?>