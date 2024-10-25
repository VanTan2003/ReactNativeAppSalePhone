<?php
include "connect.php";
$email = $_POST['email'];
$sodienthoai   = $_POST['sodienthoai'];
$matkhau = $_POST['matkhau'];
$hoten = $_POST['hoten'];
$id   = $_POST['id'];

// // check data
$query = 'UPDATE `taikhoan` SET `email`="'.$email.'",`sodienthoai`="'.$sodienthoai.'",`matkhau`="'.$matkhau.'",`hoten`="'.$hoten.'" WHERE id='.$id;

	$data = mysqli_query($conn, $query);

		if ($data == true) {
			$arr = [
				'success' => true,
				'message'  => "thanh cong",
			];

			
		}else{

			$arr = [
				'success' => false,
				'message'  => " khong thanh cong",
			];

		}

	
print_r(json_encode($arr));

?>