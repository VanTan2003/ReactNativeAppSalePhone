<?php
include "connect.php";
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

$query = "SELECT SUM(tongtien) AS tongtien FROM donhang";
$data = mysqli_query($conn, $query);
$result = mysqli_fetch_assoc($data);

if ($result) {
    $arr = [
        'success' => true,
        'message'  => "Thành Công",
        'total_revenue' => $result['tongtien']
    ];
} else {
    $arr = [
        'success' => false,
        'message'  => "Không Thành Công",
        'total_revenue' => 0
    ];
}

echo json_encode($arr);
?>
