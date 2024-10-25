import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SIZES } from "../../../constants";
import { useNavigation } from "@react-navigation/native";

const SanPhamMoiNhatScreen = ({ product }) => {
    const navigation=useNavigation();
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₫";
    };
    const shortenName = (name) => {
        return name.length > 20 ? name.substring(0, 17) + "..." : name;
    };
    return (
        <TouchableOpacity onPress={() => navigation.navigate("ChiTietSanPhamScreen",{ product })}>
            <View style={{
                width: 182,
                height: 240,
                marginEnd: 22,
                borderRadius: SIZES.medium,
                backgroundColor: 'white'
            }}>
                <View style={{
                    flex: 1,
                    width: 170,
                    marginLeft: SIZES.small / 2,
                    marginTop: SIZES.small / 2,
                    borderRadius: SIZES.small,
                    overflow: "hidden",
                }}>
                    <Image
                        source={{ uri: product.hinhanh }}
                        style={{ aspectRatio: 1, resizeMode: "cover" }}
                    />
                </View>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: SIZES.medium - 3,
                    color: 'black',
                    marginLeft:10,

                }}>{shortenName(product.tensanpham)} </Text>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: SIZES.small,
                    marginLeft:10,
                    color:'red',
                    marginTop:5,
                    marginBottom:15
                }}>{formatPrice(product.giasp)}</Text>
            </View>
        </TouchableOpacity>
    );
};


export default SanPhamMoiNhatScreen;
