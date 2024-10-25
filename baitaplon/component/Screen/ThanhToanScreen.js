import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";
import { url } from "../../ipconfig";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ThanhToanScreen = ({ route, navigation }) => {
  const { cart, totalPrice } = route.params;
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [sodienthoai, setSodienthoai] = useState("");
  const [email, setEmail] = useState("");
  const [diachi, setDiachi] = useState("");
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  useEffect(() => {
    if (user) {
      setName(user.hoten || "");
      setSodienthoai(user.sodienthoai || "");
      setEmail(user.email || "");
    }
  }, [user]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Thanh Toán",
    });
  }, []);

  // Xử lý thanh toán
  const handlePayment = async () => {
    try {
      if (!user) {
        Alert.alert(
          "Yêu cầu đăng nhập",
          "Vui lòng đăng nhập để tiếp tục thanh toán.",
          [{ text: "OK", onPress: () => navigation.navigate("DangNhapScreen") }]
        );
        return;
      }
      if (!name || !sodienthoai || !email || !diachi) {
        Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin để tiếp tục thanh toán.");
        return;
      }

      console.log("Cart data:", cart);
      console.log("Total price:", totalPrice);

      const response = await fetch(
        `${url}/dathang.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            iduser: user.id,
            diachi: diachi,
            email: email,
            sodienthoai: sodienthoai,
            soluong: cart.reduce((total, item) => total + item.quantity, 0),
            tongtien: totalPrice,
            trangthai: 0,
            chitiet: JSON.stringify(
              cart.map((item) => ({
                idsp: item.id,
                soluong: item.quantity,
                giasp: item.giasp,
              }))
            ),
          }).toString(),
        }
      );
      const responseData = await response.json(); 

      if (responseData.success) {
    
        const existingCart = JSON.parse(await AsyncStorage.getItem("cart")) || [];
        const updatedCart = existingCart.filter(
          (item) => !cart.some((selectedItem) => selectedItem.id === item.id)
        );
        await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
        Alert.alert("Thành công", "Đặt hàng thành công");
        navigation.navigate("Trang Chủ");
      } else {
     
        Alert.alert("Lỗi", "Đặt hàng không thành công: " + responseData.message);
      }
    } catch (error) {
 
      console.error("Lỗi khi gửi yêu cầu thanh toán:", error);
      Alert.alert(
        "Lỗi",
        "Đã xảy ra lỗi khi gửi yêu cầu thanh toán: " + error.message
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerview}>
        <Text style={styles.title}>Thông tin khách hàng</Text>
        <View>
          {/* email */}
          <View style={{ marginBottom: 8,marginTop:10 }}>
            <Text style={{ color: 'black', fontWeight: '500' }}>
              Họ Tên
            </Text>
          </View>
          <View style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 1 }}>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
              marginTop: -8.5
            }}>
              <FontAwesome name='user' size={15} />
            </View>
            <View style={{ flex: 1 }}>
              <TextInput placeholder="Tên khách hàng"
                value={name}
                onChangeText={setName}
                editable={!user} />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 8, marginTop: 20 }}>
          <Text style={{ color: 'black', fontWeight: '500' }}>
            Email
          </Text>
        </View>
        <View style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 1 }}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            marginTop: -8.5
          }}>
            <FontAwesome name='envelope' size={15} />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput placeholder="Email"
              value={email}
              onChangeText={setEmail}
              editable={!user} />
          </View>
        </View>
        <View style={{ marginBottom: 8, marginTop: 20 }}>
          <Text style={{ color: 'black', fontWeight: '500' }}>
            Số điện thoại
          </Text>
        </View>
        <View style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 1 }}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            marginTop: -8.5
          }}>
            <FontAwesome name='phone' size={15} />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput placeholder="Số điện thoại"
              value={sodienthoai}
              onChangeText={setSodienthoai}
              editable={!user} />
          </View>
        </View>
        <View style={{ marginBottom: 8, marginTop: 20 }}>
          <Text style={{ color: 'black', fontWeight: '500' }}>
            Địa chỉ
          </Text>
        </View>
        <View style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 1 }}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            marginTop: -8.5
          }}>
            <FontAwesome name='map-marker' size={15} />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput placeholder="Địa chỉ"
              value={diachi}
              onChangeText={setDiachi} />
          </View>
        </View>
      </View>

      <View style={styles.containerviewdh}>
        <Text style={{marginTop:-20,marginBottom:10,fontSize: 18,fontWeight: "bold",}}>Danh Sách Sản Phẩm</Text>
        {cart.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image source={{ uri: item.hinhanh }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.tensanpham}</Text>
                <Text style={styles.itemText}>Số lượng: {item.quantity}</Text>
                <Text style={styles.itemText}>Giá: {formatPrice(item.giasp)} ₫</Text>
            </View>
          </View>
        ))}
        <Text style={styles.totalText}>Tổng tiền: {formatPrice(totalPrice)} ₫</Text>
      </View>
      <TouchableOpacity style={{ width: '70%' ,marginLeft:70}} activeOpacity={0.5} onPress={handlePayment}>
                <LinearGradient style={{
                  height:50,
                  padding: 10, borderRadius: 50, width: '100%',
                  justifyContent: 'center', alignItems: 'center', borderWidth:1,borderColor:'red'
                  }}
                  useAngle={false}
                  angle={45}
                  colors={['white','red', 'white']}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Thanh Toán</Text>
                </LinearGradient>
              </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  containerview: {
    padding: 25,
  },
  containerviewdh: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemImage: {
    width: 75,
    height: 75,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
  },
  itemSubDetails: {
    flexDirection: "row",
  },
  itemText: {
    fontSize: 14,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default ThanhToanScreen;
