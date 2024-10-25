import { ActivityIndicator, FlatList, View } from "react-native";
import React from "react";
import { SIZES } from "../../../constants";
import SanPhamBanChayScreen from "./SanPhamBanChayScreen";
import { useState,useEffect } from "react";
import axios from "axios";
import { url } from "../../../ipconfig";

const SanPhamBanChayRow = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      axios
        .get(`${url}/getsanphambanchay.php`)
        .then((response) => {
          setProducts(response.data.result);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }, []);
    if (loading) {
      return (
        <View>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }

  return (
    <View style={{   
        marginTop:SIZES.medium,
        marginLeft:12,
        marginBottom:90}}>
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <SanPhamBanChayScreen
          product={item}
        />
      )}
      keyExtractor={(item) => item.idsp.toString()}
      horizontal
      contentContainerStyle={{ columnGap: SIZES.small}}
    />
    </View>
  );
};

export default SanPhamBanChayRow;
