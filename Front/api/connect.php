<?php
$servername = "mysql";
$username = "root";
$password = "1234";
$dbname = "WithoutU";

// 데이터베이스 연결 생성
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    // JSON 응답으로 에러 반환
    echo json_encode(['success' => false, 'message' => "Connection failed: " . $conn->connect_error]);
    exit;
}

// echo "Connected successfully";
?>
