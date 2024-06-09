<?php
session_start();
header('Content-Type: application/json');

$response = array();
if (isset($_SESSION['name'])) {
    $response['success'] = true;
    $response['name'] = $_SESSION['name'];
} else {
    $response['success'] = false;
    $response['message'] = "Name not found";
}

// 응답을 JSON 형식으로 반환
echo json_encode($response);
?>
