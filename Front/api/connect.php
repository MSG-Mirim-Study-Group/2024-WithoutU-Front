<?php
session_start(); // 세션 시작

// MySQL 데이터베이스 정보
$servername = "mysql";
$username = "root";
$password = "1234";
$dbname = "WithoutU";

// MySQL 연결 생성
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 오류 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else {
    echo "success";
}

?>



