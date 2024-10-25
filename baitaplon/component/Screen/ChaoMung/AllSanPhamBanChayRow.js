import { ActivityIndicator, FlatList, View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import {  SIZES } from "../../../constants";
import SanPhamBanChayScreen from "./SanPhamBanChayScreen";
import axios from "axios";
import { url } from "../../../ipconfig";

const AllSanPhamBanChayRow = ({navigation}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        navigation.setOptions({
          headerTitle: "Sản Phẩm Bán Chạy",
        });
      }, []);
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
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <SanPhamBanChayScreen product={item} />
                    </View>
                )}
                keyExtractor={(item) => item.idsp.toString()}
                numColumns={3}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 12,
        marginTop:10,
        flex:1
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        flex: 1,
        margin: SIZES.small,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    contentContainer: {
        paddingBottom: SIZES.large,
    },
});

export default AllSanPhamBanChayRow;
