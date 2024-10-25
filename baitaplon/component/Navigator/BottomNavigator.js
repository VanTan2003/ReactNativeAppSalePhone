import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChiTietSanPhamScreen from "../Screen/ChiTietSanPhamScreen";
import GioHangScreen from "../Screen/GioHangScreen";
import TimKiemScreen from "../Screen/TimKiemScreen";
import TrangCaNhanScreen from "../Screen/TrangCaNhanScreen";
import Home from "../Screen/ChaoMung/HomeScreen";

const Stack = createStackNavigator();

const BottomNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TrangChu">
        <Stack.Screen
          name="TrangChu"
          component={Home}
          options={{ title: "Trang Chủ" }}
        />
        <Stack.Screen
          name="ChiTietSanPham"
          component={ChiTietSanPhamScreen}
          options={{ title: "Chi Tiết Sản Phẩm" }}
        />
        <Stack.Screen
          name="GioHangScreen"
          component={GioHangScreen}
          options={{ title: "Giỏ Hàng" }}
        />
        <Stack.Screen
          name="TimKiemScreen"
          component={TimKiemScreen}
          options={{ title: "Kết Quả Tìm Kiếm" }}
        />
        <Stack.Screen
          name="TrangCaNhanScreen"
          component={TrangCaNhanScreen}
          options={{ title: "Trang Cá Nhân" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigator;
