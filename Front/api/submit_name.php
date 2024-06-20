<?php
header('Content-Type: application/json; charset=utf-8');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include('../api/connect.php');

$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 입력 값 검증
    $name = isset($_POST['name']) && !empty($_POST['name']) ? $_POST['name'] : "null";
    $type = isset($_POST['type']) && !empty($_POST['type']) ? intval($_POST['type']) : 0;  // 문자열로 변환

    error_log("수신 데이터: name=$name, type=$type");

    $missingFields = [];
    if (!$name) $missingFields[] = "이름";
    if (!$type) $missingFields[] = "유형";

    if (empty($missingFields)) {
        $stmt = $conn->prepare("INSERT INTO user (name, type) VALUES (?, ?)");
        $stmt->bind_param("si", $name, $type);  // 두 개의 문자열

        if ($stmt->execute()) {
            $response['success'] = true;
            $response['type'] = "사용자가 성공적으로 등록되었습니다.";
        } else {
            $response['success'] = false;
            $response['type'] = "사용자 등록에 실패하였습니다.";
        }
        $stmt->close();
    } else {
        error_log("입력 데이터 누락: " . implode(", ", $missingFields));
        $response['success'] = false;
        $response['type'] = "다음 필드가 비어 있습니다: " . implode(", ", $missingFields);
    }
} else {
    error_log("잘못된 요청 방식");
    $response['success'] = false;
    $response['type'] = "유효하지 않은 요청 방식입니다. 이 엔드포인트는 POST 요청만을 지원합니다.";
}

echo json_encode($response);
$conn->close();
?>
