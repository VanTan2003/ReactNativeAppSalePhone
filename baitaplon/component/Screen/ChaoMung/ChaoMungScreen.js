import { View, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons"
import { COLORS,SIZES } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
const ChaoMungScreen = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigation = useNavigation();
    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
          navigation.navigate("TimKiemScreen", { searchTerm });
        }
      };
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: 'white',
            borderRadius: SIZES.medium,
            borderColor:'black',
            borderWidth:0.5,
            marginVertical: SIZES.medium,
            height: 50,
            marginHorizontal: SIZES.small
        }}>
            <TouchableOpacity  onPress={handleSearch}>
                <Feather name="search" size={24} style={{
                    marginHorizontal: 10,
                    color: COLORS.gray,
                    marginTop: 12
                }} />
            </TouchableOpacity>
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                marginRight: SIZES.small,
                borderRadius: SIZES.small
            }}>
                <TextInput
                    style={{
                        fontWeight: "bold",
                        height: "100%",
                        width: "100%",
                        paddingHorizontal: SIZES.small
                    }}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    placeholder="Bạn cần tìm gì ?"
                 
                />
            </View>
        </View>
    );
}
export default ChaoMungScreen;