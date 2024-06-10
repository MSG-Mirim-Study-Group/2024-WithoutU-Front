<?php
// submit_message.php
// 메시지를 MySQL 데이터베이스에 저장하는 스크립트

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
$name = $_POST['name'];  // 메시지를 남긴 사람의 이름
$message = $_POST['message'];  // 메시지 내용
$page_id = $_POST['page_id'];  // 페이지 ID

// 데이터베이스에 메시지 삽입
$sql = "INSERT INTO messages (name, message, page_id) VALUES ('$name', '$message', '$page_id')";

// 삽입 결과 확인
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
}

// MySQL 연결 닫기
$conn->close();
?>