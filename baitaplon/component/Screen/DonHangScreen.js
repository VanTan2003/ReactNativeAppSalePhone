import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import qs from "qs";
import { url } from "../../ipconfig";
import { LinearGradient } from "expo-linear-gradient";

const TrangCaNhanScreen = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Lịch Sử Mua Hàng",
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchOrders = async () => {
        setLoading(true);
        try {
          if (user) {
            const response = await axios.post(
              `${url}/xemdonhang.php`,
              qs.stringify({ iduser: user.id }),
              { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );
            if (response.data.success) {
              setOrders(response.data.result);
            } else {
              setOrders([]);
            }
          }
        } catch (error) {
          console.error("Error fetching order list:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }, [user])
  );

  const getOrderStatus = (status) => {
    switch (status) {
      case "0":
        return "Chưa xác nhận";
      case "1":
        return "Đã xác nhận";
      case "2":
        return "Đang vận chuyển";
      case "3":
        return "Đang trên đường giao đến bạn";
      case "4":
        return "Đã nhận được hàng";
      case "5":
        return "Đơn hàng đã bị hủy";
      default:
        return "Không xác định";
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const response = await axios.post(
        `${url}/updatetinhtrang.php`,
        qs.stringify({ id, trangthai: status }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === id ? { ...order, trangthai: status } : order
          )
        );
      } else {
        console.error("Có lỗi xảy ra:", response.data.message);
      }
    } catch (error) {
      console.error("Có lỗi xảy ra", error);
    }
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text>Mã đơn hàng: {item.id}</Text>
      <Text>Ngày đặt hàng: {item.ngaydat}</Text>
      <Text>Số điện thoại: {item.sodienthoai}</Text>
      <Text>Tổng tiền: {item.tongtien} VND</Text>
      <Text>Địa chỉ: {item.diachi}</Text>
      <Text>Trạng thái: {getOrderStatus(item.trangthai)}</Text>
      <Text style={styles.title}>Danh Sách Sản Phẩm: </Text>
      {Array.isArray(item.item) && item.item.length > 0 ? (
        item.item.map((product, index) => (
          <View key={index} style={styles.productItem}>
            <Image
              source={{ uri: product.hinhanh }}
              style={styles.productImage}
            />
            <View style={styles.productDetails}>
              <Text>Tên sản phẩm: {product.tensanpham}</Text>
              <Text>Giá: {product.giasp} VND</Text>
              <Text>Số lượng: {product.soluong}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text>Không có sản phẩm nào.</Text>
      )}
     {(item.trangthai === "0" || item.trangthai === "1") && (
      <TouchableOpacity style={{ width: '50%' ,justifyContent:'flex-end',marginTop:10, alignItems: 'flex-end',marginLeft:193}} activeOpacity={0.5}  onPress={() => updateOrderStatus(item.id, "5")}>
      <LinearGradient style={{
        height:50,
        padding: 10, borderRadius: 50, width: '100%',
        justifyContent: 'center', alignItems: 'center', borderWidth:1,borderColor:'red'
        }}
        useAngle={false}
        angle={45}
        colors={['white','red', 'white']}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Hủy đơn hàng</Text>
      </LinearGradient>
    </TouchableOpacity>
    )}
    {item.trangthai === "3" && (
        <TouchableOpacity style={{width: '50%' ,justifyContent:'flex-end',marginTop:10, alignItems: 'flex-end',marginLeft:193}} activeOpacity={0.5}  onPress={() => updateOrderStatus(item.id, "4")}>
        <LinearGradient style={{
          height:50,
          padding: 10, borderRadius: 50, width: '100%',
          justifyContent: 'center', alignItems: 'center', borderWidth:1,borderColor:'red'
          }}
          useAngle={false}
          angle={45}
          colors={['white','red', 'white']}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Nhận hàng thành công</Text>
        </LinearGradient>
      </TouchableOpacity>
    )}
    </View>
  );

  return (
    <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={orders}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderOrderItem}
            />
          )}
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    marginTop:10,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FF6347",
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  orderItem: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  productItem: {
    flexDirection: "row",
    padding: 5,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
    alignItems: "center",
  },
  productImage: {
    width: 75,
    height: 75,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  iconItem: {
    padding: 10,
    backgroundColor: "#cadd",
    alignItems: "center",
  },
});

export default TrangCaNhanScreen;
