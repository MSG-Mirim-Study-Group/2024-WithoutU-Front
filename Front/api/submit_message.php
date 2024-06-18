<?php
header('Content-Type: application/json; charset=utf-8');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include('../api/connect.php');
// mysqli_set_charset($conn, "utf8mb4");  // 문자셋을 utf8mb4로 설정

$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 입력 값 검증
    $name = isset($_POST['name']) && !empty($_POST['name']) ? $_POST['name'] : "null";
    $message = isset($_POST['message']) && !empty($_POST['message']) ? $_POST['message'] : "null";
    $page_id = isset($_POST['page_id']) && !empty($_POST['page_id']) ? intval($_POST['page_id']) : 0;  // int로 변환

    error_log("수신 데이터: name=$name, message=$message, page_id=$page_id");

    $missingFields = [];
    if (!$name) $missingFields[] = "이름";
    if (!$message) $missingFields[] = "메시지";
    if (!$page_id) $missingFields[] = "페이지 ID";

    if (empty($missingFields)) {
        $stmt = $conn->prepare("INSERT INTO messages (name, message, page_id) VALUES (?, ?, ?)");
        $stmt->bind_param("ssi", $name, $message, $page_id);  // page_id는 int 타입

        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "메시지가 성공적으로 등록되었습니다.";
        } else {
            $response['success'] = false;
            $response['message'] = "메시지 등록에 실패하였습니다.";
        }
        $stmt->close();
    } else {
        error_log("입력 데이터 누락: " . implode(", ", $missingFields));
        $response['success'] = false;
        $response['message'] = "다음 필드가 비어 있습니다: " . implode(", ", $missingFields);
    }
} else {
    error_log("잘못된 요청 방식");
    $response['success'] = false;
    $response['message'] = "유효하지 않은 요청 방식입니다. 이 엔드포인트는 POST 요청만을 지원합니다.";
}

echo json_encode($response);
$conn->close();

?>
