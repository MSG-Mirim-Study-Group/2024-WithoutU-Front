<?php
// submit_message.php

// MySQL 데이터베이스 정보
$servername = "mysql";
$username = "user";
$password = "userpassword";
$dbname = "guestbook";

// MySQL 연결 생성
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 오류 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// POST 요청으로 받은 데이터 처리
$name = $conn->real_escape_string($_POST['name']);
$message = $conn->real_escape_string($_POST['message']);
$page_id = $conn->real_escape_string($_POST['page_id']);

// 데이터베이스에 메시지 삽입
$sql = "INSERT INTO messages (name, message, page_id) VALUES ('$name', '$message', '$page_id')";

// 삽입 결과 확인
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// MySQL 연결 닫기
$conn->close();
?>
