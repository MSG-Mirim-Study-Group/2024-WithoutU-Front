<?php
include('../api/connect.php');
mysqli_set_charset($conn, "utf8");

// 세션에서 이름 불러오기
$name = isset($_SESSION['user_name']) ? $_SESSION['user_name'] : null;

if ($name === null) {
    echo json_encode(['success' => false, 'message' => 'User name not found']);
    exit;
}

// POST 요청으로 받은 데이터 처리
$message = $conn->real_escape_string($_POST['message']);
$page_id = $conn->real_escape_string($_POST['page_id']);

// 데이터베이스에 메시지 삽입
$sql = "INSERT INTO messages (name, message, page_id) VALUES ('$name', '$message', '$page_id')";

// 삽입 결과 확인
if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true, 'message' => 'Message submitted successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $sql . '<br>' . $conn->error]);
}

// MySQL 연결 닫기
mysqli_close($conn);
?>