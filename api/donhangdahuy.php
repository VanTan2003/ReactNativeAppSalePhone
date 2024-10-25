<?php
include "connect.php";
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

$query = "SELECT COUNT(*) AS donbihuy FROM donhang WHERE trangthai = 5";
$data = mysqli_query($conn, $query);
$result = mysqli_fetch_assoc($data);

if ($result) {
    $arr = [
        'success' => true,
        'message'  => "Thành Công",
        'total_donhuy_orders' => $result['donbihuy'] 
    ];
} else {
    $arr = [
        'success' => false,
        'message'  => "Không Thành Công",
        'total_donhuy_orders' => 0 
    ];
}

echo json_encode($arr);
?>
