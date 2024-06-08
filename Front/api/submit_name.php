<?php
include('../api/connect.php');
mysqli_set_charset($conn, "utf8");

// POST 요청으로 받은 데이터 처리
$name = $conn->real_escape_string($_POST['name']);

// 데이터베이스에 이름 삽입
$sql = "INSERT INTO users (name) VALUES ('$name')";

// 삽입 결과 확인
if ($conn->query($sql) === TRUE) {
    // 이름을 세션에 저장
    $_SESSION['user_name'] = $name;
    echo json_encode(['success' => true, 'message' => 'Name stored successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $sql . '<br>' . $conn->error]);
}

// MySQL 연결 닫기
mysqli_close($conn);
?>
