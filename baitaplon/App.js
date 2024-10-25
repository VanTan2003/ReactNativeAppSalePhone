import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppState, AsyncStorage } from "react-native";
import ChiTietSanPhamScreen from "./component/Screen/ChiTietSanPhamScreen";
import GioHangScreen from "./component/Screen/GioHangScreen";
import DangKyScreen from "./component/Screen/SingUpScreen";
import DangNhapScreen from "./component/Screen/LoginScreen";
import TimKiemScreen from "./component/Screen/TimKiemScreen";
import ThanhToanScreen from "./component/Screen/ThanhToanScreen";
import { AuthProvider } from "./component/Screen/AuthContext";
import Home from "./component/Screen/ChaoMung/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "./constants";
import DonHangScreen from "./component/Screen/DonHangScreen";
import UserProfileScreen from "./component/Screen/NguoiDungScreen";
import UpdateUserProfileScreen from "./component/Screen/ThongTinCaNhanScreen";
import SamSungRow from "./component/Screen/ChaoMung/SamSungRow";
import IPhoneRow from "./component/Screen/ChaoMung/ApplerRow";
import AllSanPhamBanChayRow from "./component/Screen/ChaoMung/AllSanPhamBanChayRow";
import AllSanPhamMoiNhatRow from "./component/Screen/ChaoMung/AllSanPhamMoiNhatRow";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const cartData = await AsyncStorage.getItem("cart");
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    };

    loadCart();

    const appStateSubscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (nextAppState === "background") {
          AsyncStorage.setItem("cart", JSON.stringify(cart));
        }
      }
    );

    return () => {
      appStateSubscription.remove();
    };
  }, [cart]);

  const ChiTietSanPham = (props) => (
    <ChiTietSanPhamScreen {...props} cart={cart} setCart={setCart}  />
  );
  const GioHang = (props) => (
    <GioHangScreen {...props} cart={cart} setCart={setCart} />
  );

  const handleSignUpSuccess = (navigation) => {
    navigation.navigate("DangNhapScreen");
  };

  const screensOptions = {
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
        position: "absolute",
        height: 60,
        left: 0,
        right: 0,
        elevation: 0,
        bottom: 0
    },
};

  const MainTabs = () => {
    return (
      <Tab.Navigator screenOptions={screensOptions}>
        <Tab.Screen name="Trang Chủ" 
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2} />
            );
          },
        }} />
         <Tab.Screen name="iPhone" 
          component={IPhoneRow}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons name={focused ? "phone-portrait" : "phone-portrait-outline"}
                  size={24}
                  color={focused ? COLORS.primary : COLORS.gray2} />
              );
            },
          }} 
        />
        <Tab.Screen name="Samsung" 
          component={SamSungRow}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons name={focused ? "logo-android" : "logo-android"}
                  size={24}
                  color={focused ? COLORS.primary : COLORS.gray2} />
              );
            },
          }} 
        />
        <Tab.Screen name="Giỏ Hàng" 
        component={GioHang}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons name={focused ? "cart" : "cart-outline"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2} />
            );
          },
        }} />
        <Tab.Screen name="Cá Nhân" 
        component={UserProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons name={focused ? "person" : "person-outline"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2} />
            );
          },
        }} />
      </Tab.Navigator>
    );
  };

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTabs">
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ChiTietSanPhamScreen" component={ChiTietSanPham} />
          <Stack.Screen name="AllSanPhamBanChayScreen" component={AllSanPhamBanChayRow} />
          <Stack.Screen name="AllSanPhamMoiNhatScreen" component={AllSanPhamMoiNhatRow} />
          <Stack.Screen name="ThanhToanScreen" component={ThanhToanScreen} />
          <Stack.Screen name="ThongTinCaNhanScreen" component={UpdateUserProfileScreen} />
          <Stack.Screen name="DonHangScreen" component={DonHangScreen} />
          <Stack.Screen name="DangNhapScreen" component={DangNhapScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DangKyScreen" options={{ headerShown: false }}>
            {(props) => (
              <DangKyScreen
                {...props}
                onSignUpSuccess={() => handleSignUpSuccess(props.navigation)}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="TimKiemScreen"
            component={TimKiemScreen}
          />
          <Stack.Screen
            name="TrangCaNhanScreen"
            component={UserProfileScreen}
            options={{ title: "Trang cá nhân" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
