<?php
// load_messages.php
include('connect.php');
mysqli_set_charset($conn, "utf8");

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
mysqli_close($conn);
?>
