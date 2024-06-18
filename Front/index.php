MySQL Connect TEST<br>
<?
$conn = mysqli_connect("mysql", "root", "1234", "WithoutU"); # 여기에서 mysql 은 컨테이너 이름

if ($conn) {
    echo "MySQL 연결 성공";
} else {
    echo "MySQL 연결 실패";
}

$result = mysqli_query($conn, "SELECT VERSION() AS VERSION");
$data = mysqli_fetch_assoc($result);
echo "<br>Version : " . $data['VERSION'];
?>