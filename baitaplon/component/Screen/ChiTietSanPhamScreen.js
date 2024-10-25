import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChiTietSanPhamScreen = ({ route,navigation }) => {
  const { product } = route.params;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Chi Tiết Sản Phẩm",
    });
  }, []);
  const addToCart = async () => {
    try {
      if (Number(product.soluongkho) === 0) {
        Alert.alert("Thông báo","Sản phẩm tạm thời hết hàng.");
        return;
      } else {
        const existingCart = await AsyncStorage.getItem("cart");
        let cart = existingCart ? JSON.parse(existingCart) : [];
  
        const existingProductIndex = cart.findIndex((item) => item.id === product.id);
        if (existingProductIndex !== -1) {
          cart[existingProductIndex].quantity += 1;
        } else {
          cart = [...cart, { ...product, quantity: 1 }];
          Alert.alert("Thêm vào giỏ hàng", "Sản phẩm đã được thêm vào giỏ hàng.");
        }
  
        await AsyncStorage.setItem("cart", JSON.stringify(cart));
        console.log("Đã thêm sản phẩm vào giỏ hàng:", product);
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: product.hinhanh }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.text_ThongTin}>Thông tin sản phẩm</Text>
          <Text style={styles.text_ten}>
            <Text style={styles.boldText}>{product.tensanpham}</Text>
          </Text>
          <Text style={styles.text_gia}>
            Giá:{" "}
            <Text style={[styles.boldText, styles.largeText]}>
              {formatPrice(product.giasp)} ₫
            </Text>
          </Text>
          <Text style={styles.descriptionTitle}>Mô tả: </Text>
          <Text style={styles.descriptionText}>{product.mota}</Text>
          <View style={{flexDirection:'row'}}>
          <Text style={{fontWeight:'bold',fontSize:14}}>Số lượng còn : </Text>
          <Text style={{fontSize:14,color:'red'}}>{product.soluongkho}</Text>
          </View>
          <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
            <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  image: {
    backgroundColor:'black',
    width: "100%",
    marginVertical:5,
    height: 300,
    aspectRatio: 1, 
    resizeMode: "cover"
  },
  infoContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  text_ThongTin: {
    marginTop:10,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  text_ten: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  text_gia: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#e74c3c",
    marginBottom: 10,
  },
  descriptionTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  addToCartButton: {
    marginTop:20,
    backgroundColor: "red",
    borderRadius: 10,
    width:'70%',
    paddingVertical:10,
    alignItems: "center",
    justifyContent:'center',
    marginLeft:57
  },
  addToCartButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ChiTietSanPhamScreen;
