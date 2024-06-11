<?php
// session_start();
header('Content-Type: application/json');

// include('../api/connect.php');
mysqli_set_charset($conn, "utf8");

// POST 요청으로 받은 데이터 처리
// $name = $_POST['name'] ?? '';
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $name = htmlspecialchars($_POST["name"]);

    echo $name;
}

// if (empty($name)) {
//     echo json_encode(['success' => false, 'message' => "Name is required"]);
//     exit;
// }

// // 세션에 이름 저장
// $_SESSION['name'] = $name;

// $response = array();
// $response['success'] = true;
// $response['message'] = "Name stored successfully";

// // 응답을 JSON 형식으로 반환
// echo json_encode($response);

// // MySQL 연결 닫기
// $conn->close();
?>