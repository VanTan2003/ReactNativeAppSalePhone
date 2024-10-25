<?php
include "connect.php";
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

$query = "
    SELECT idsp, SUM(soluong) AS tong 
    FROM chitietdonhang 
    GROUP BY idsp;
";
$data = mysqli_query($conn, $query);
$result = array();

$totalSoldProducts = 0;

while ($row = mysqli_fetch_assoc($data)) {
    $result[] = $row;
    $totalSoldProducts += $row['tong']; 
}

if (!empty($result)) {
    $arr = [
        'success' => true,
        'message'  => "Thành Công",
        'result'   => $result,
        'total_sold' => $totalSoldProducts
    ];
} else {
    $arr = [
        'success' => false,
        'message'  => "Không Thành Công",
        'result'   => $result,
        'total_sold' => $totalSoldProducts
    ];
}

echo json_encode($arr);
?>
