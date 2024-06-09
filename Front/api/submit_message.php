<?php
// submit_message.php
// 메시지를 MySQL 데이터베이스에 저장하는 스크립트
header('Content-Type: application/json');

include('../api/connect.php');
mysqli_set_charset($conn, "utf8");

// POST 요청으로 받은 데이터 처리
$name = $_POST['name'] ?? '';
$message = $_POST['message'] ?? '';
$page_id = $_POST['page_id'] ?? 0;

if (empty($name) || empty($message) || empty($page_id)) {
    echo json_encode(['success' => false, 'message' => "Name, message and page_id are required"]);
    exit;
}

// 데이터베이스에 메시지 삽입 (SQL 인젝션 방지)
$stmt = $conn->prepare("INSERT INTO messages (name, message, page_id) VALUES (?, ?, ?)");
$stmt->bind_param("ssi", $name, $message, $page_id);

$response = array();
if ($stmt->execute()) {
    $response['success'] = true;
    $response['message'] = "New record created successfully";
} else {
    $response['success'] = false;
    $response['message'] = "Error: " . $stmt->error;
}

// 응답을 JSON 형식으로 반환
echo json_encode($response);

// MySQL 연결 닫기
$stmt->close();
$conn->close();
?>
