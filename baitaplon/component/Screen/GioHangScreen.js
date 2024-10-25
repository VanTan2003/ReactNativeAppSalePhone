import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const GioHangScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Giỏ Hàng",
    });
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartString = await AsyncStorage.getItem("cart");
        if (cartString) {
          let cartItems = JSON.parse(cartString);

          cartItems = cartItems.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.id === item.id)
          );

          cartItems = cartItems.map((item) => ({
            ...item,
            giasp: item.giasp ?? 0,
          }));
          await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
          setCart(cartItems);
        }
      } catch (error) {
        console.error("Lỗi khi tải giỏ hàng từ AsyncStorage:", error);
      }
    };

    const unsubscribe = navigation.addListener("focus", () => {
      loadCart();
    });

    return unsubscribe;
  }, [navigation]);

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = cart.filter((item) => item.id !== productId);
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
      console.log("Sản phẩm đã được xóa khỏi giỏ hàng:", productId);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
    }
  };

  const confirmRemoveFromCart = (productId) => {
    Alert.alert(
      "Xóa sản phẩm",
      "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: () => removeFromCart(productId),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const addToCart = async (product) => {
    try {
      const existingProductIndex = cart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        const updatedCart = [...cart];
        if (updatedCart[existingProductIndex].quantity < product.soluongkho) {
          updatedCart[existingProductIndex].quantity += 1;
          await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
          setCart(updatedCart);
          console.log("Số lượng của sản phẩm đã được tăng lên:", product.id);
        } else {
          Alert.alert("Thông báo", "Số lượng sản phẩm trong kho không đủ");
        }
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      const updatedCart = cart.map((item) => {
        if (item.id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
      console.log("Sản phẩm đã được giảm số lượng:", productId);
    } catch (error) {
      console.error("Lỗi khi giảm số lượng sản phẩm:", error);
    }
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null) {
      return "0 ₫";
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₫";
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) =>
        selectedItems.includes(item.id) ? total + (item.giasp ?? 0) * item.quantity : total,
      0
    );
  };

  const toggleItemSelection = (productId) => {
    setSelectedItems((prevSelectedItems) => {
      const selectedIndex = prevSelectedItems.indexOf(productId);
      if (selectedIndex === -1) {
        return [...prevSelectedItems, productId];
      } else {
        return prevSelectedItems.filter((id) => id !== productId);
      }
    });
  };

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [selectedItems, cart]);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      Alert.alert("Thông báo", "Vui lòng chọn sản phẩm trước khi đặt hàng");
      return;
    }
    const selectedCart = cart.filter(item => selectedItems.includes(item.id));
    navigation.navigate("ThanhToanScreen", { cart: selectedCart, totalPrice });
  };

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>
        </View>
      ) : (
        <ScrollView>
          {cart.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <TouchableOpacity onPress={() => toggleItemSelection(item.id)}>
                {selectedItems.includes(item.id) ? (
                  <Ionicons name="checkbox-outline" size={24} color="black" />
                ) : (
                  <Ionicons name="square-outline" size={24} color="black" />
                )}
              </TouchableOpacity>
              <Image source={{ uri: item.hinhanh }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.tensanpham}</Text>
                <Text style={styles.itemPrice}>{formatPrice(item.giasp)} </Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                    <Ionicons
                      name="remove-circle-outline"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => addToCart(item)}>
                    <Ionicons
                      name="add-circle-outline"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => confirmRemoveFromCart(item.id)}
                style={styles.removeButton}
              >
                <Ionicons name="trash-bin-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              Tổng tiền: {formatPrice(totalPrice)}{" "}
            </Text>
          </View>
          <TouchableOpacity
            style={{ width: "70%", marginLeft: 70, marginTop: 10 }}
            activeOpacity={0.5}
            onPress={handleCheckout}
          >
            <LinearGradient
              style={{
                height: 50,
                padding: 10,
                borderRadius: 50,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "red",
              }}
              useAngle={false}
              angle={45}
              colors={["white", "red", "white"]}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Đặt Hàng</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#888",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
    padding: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeButton: {
    padding: 10,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GioHangScreen;
