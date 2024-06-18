<?php
header('Content-Type: application/json; charset=utf-8');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include('../api/connect.php');
// mysqli_set_charset($conn, "utf8mb4");  // 문자셋을 utf8mb4로 설정

$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 메시지 로드 기능
    if (isset($_POST['page_id'])) {
        $page_id = intval($_POST['page_id']);  // int로 변환

        // SQL 인젝션 방지를 위해 준비된 문을 사용합니다.
        $stmt = $conn->prepare("SELECT name, message FROM messages WHERE page_id = ?");
        $stmt->bind_param("i", $page_id);  // page_id는 int 타입
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $messages = array();
            while ($row = $result->fetch_assoc()) {
                $messages[] = array('name' => $row['name'], 'message' => $row['message']);
            }
            $response['success'] = true;
            $response['messages'] = $messages;
        } else {
            $response['success'] = false;
            $response['message'] = "메시지를 찾을 수 없습니다.";
        }
        $stmt->close();
    } else {
        $response['success'] = false;
        $response['message'] = "페이지 ID가 제공되지 않았습니다.";
    }
} else {
    $response['success'] = false;
    $response['message'] = "유효하지 않은 요청 방식입니다. 이 엔드포인트는 POST 요청만을 지원합니다.";
}

echo json_encode($response);
$conn->close();
?>