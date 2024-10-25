import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../../../constants";

const HeaderMoiNhat = () => {
    const navigation = useNavigation();
    return (
        <View style={{
            flex: 1,
            marginTop: SIZES.medium,
            marginHorizontal: 12
        }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
            }}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: SIZES.xLarge - 2
                }}>Sản Phẩm Mới Nhất</Text>
                <TouchableOpacity onPress={() => navigation.navigate("AllSanPhamMoiNhatScreen")} style={{marginEnd:15}}>
                    <Ionicons name="grid-outline" size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default HeaderMoiNhat