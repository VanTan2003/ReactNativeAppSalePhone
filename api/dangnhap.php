<?php
include "connect.php";
$email    = $_POST['email'];
$matkhau = $_POST['matkhau'];

$query = 'SELECT * FROM `taikhoan` WHERE `email` = "'.$email.'"  AND `matkhau` = "'.$matkhau.'"';
$data = mysqli_query($conn, $query);
$result = array();

while ($row = mysqli_fetch_assoc($data)) {
	$result[] = ($row);
	// code...
};

if (!empty($result)) {

	$arr = [
		'success' => true,
		'message'  => "Đăng nhập thành công",
		'result'    => $result	
	];
}else{
	$arr = [
		'success' => false,
		'message'  => " Đăng nhập thất bại ",
		'result'    => $result	
	];

}
print_r(json_encode($arr));