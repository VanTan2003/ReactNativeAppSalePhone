import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import qs from "qs";
import { url } from "../../ipconfig";
import { COLORS } from "../../constants";

const TimKiemScreen = ({ route, navigation }) => {
  const { searchTerm } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Kết Quả Tìm Kiếm",
    });
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.post(
          `${url}/timkiem.php`,
          qs.stringify({ search: searchTerm }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        if (response.data.success) {
          setProducts(response.data.result);
        } else {
          setProducts([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Không tìm thấy sản phẩm</Text>
      </View>
    );
  }

  // Thêm phần tử ảo nếu số lượng sản phẩm là lẻ
  const data = [...products];
  if (data.length % 2 !== 0) {
    data.push({ id: "dummy" }); // Thêm phần tử ảo
  }

  const renderProductItem = ({ item }) => {
    if (item.id === "dummy") {
      return <View style={[styles.productItem, styles.dummyItem]} />;
    }
    
    return (
      <TouchableOpacity
        style={styles.productItem}
        onPress={() => navigation.navigate("ChiTietSanPhamScreen", { product: item })}
      >
        <Image source={{ uri: item.hinhanh }} style={styles.productImage} />
        <Text style={styles.productName}>{item.tensanpham}</Text>
        <Text style={styles.productPrice}>{formatPrice(item.giasp)} VND</Text>
      </TouchableOpacity>
    );
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.secondary
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: 10,
  },
  productItem: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  dummyItem: {
    backgroundColor: "transparent",
    elevation: 0,
    shadowColor: "transparent",
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
  },
});

export default TimKiemScreen;
