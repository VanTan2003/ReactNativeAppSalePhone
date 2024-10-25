import { FlatList, View ,ActivityIndicator} from "react-native";
import { SIZES } from "../../../constants";
import SanPhamMoiNhatScreen from "./SanPhamMoiScreen";
import { url } from "../../../ipconfig";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SanPhamMoiNhatRow = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${url}/getsanphammoi.php`)
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
    }}>
    <FlatList
      data={products}
      renderItem={({item})=><SanPhamMoiNhatScreen product={item}/>}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      contentContainerStyle={{ columnGap: SIZES.small}}
    />
    </View>
  );
};

export default SanPhamMoiNhatRow;
