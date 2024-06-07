<?php
// load_messages.php

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

// GET 요청으로 받은 페이지 ID 처리
$page_id = $conn->real_escape_string($_GET['page_id']);

// 특정 페이지 ID에 해당하는 메시지 선택
$sql = "SELECT name, message FROM messages WHERE page_id='$page_id' ORDER BY timestamp ASC";
$result = $conn->query($sql);

$messages = array();

// 결과가 있는 경우 배열로 변환
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
}

// JSON 형식으로 출력
echo json_encode($messages);

// MySQL 연결 닫기
$conn->close();
?>
