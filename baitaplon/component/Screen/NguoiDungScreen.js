import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

const UserProfileScreen = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigation = useNavigation();
    const handleLogout = async () => {
        setUser(null);
        await AsyncStorage.removeItem("cart");
        navigation.navigate("DangNhapScreen");
    };
    const handleProfileNavigation=async()=>{
        navigation.navigate("ThongTinCaNhanScreen");
    }
    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 20, backgroundColor: COLORS.secondary }}>
            {user ? (
                <TouchableOpacity onPress={handleProfileNavigation}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={{ uri: "https://checkout.overstock.com/cdn/shop/files/Madison-Park-Colm-Basketweave-Total-Blackout-Roman-Shade_05245c1a-e5d0-444f-ba33-18fa432aedc1.jpg" }}
                        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 16 }}
                    />
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>{user.hoten}</Text>
                    <Text style={{ fontSize: 16, color: 'gray', marginBottom: 24 }}>{user.email}</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'orange',
                            paddingVertical: 12,
                            paddingHorizontal: 32,
                            borderRadius: 8,
                            marginBottom: 12,
                        }}
                        onPress={() => navigation.navigate("DonHangScreen")}
                    >
                        <Text style={{ color: 'white', fontSize: 16 }}>Lịch Sử Mua Hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: 'orange',
                            paddingVertical: 12,
                            paddingHorizontal: 32,
                            borderRadius: 8,
                        }}
                        onPress={handleLogout}
                    >
                        <Text style={{ color: 'orange', fontSize: 16 }}>Đăng Xuất</Text>
                    </TouchableOpacity>
                </View>
                </TouchableOpacity>
            ) : (
                <View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: 'orange',
                            paddingVertical: 12,
                            paddingHorizontal: 32,
                            borderRadius: 8,
                        }}
                        onPress={() => navigation.navigate("DangNhapScreen")}
                    >
                        <Text style={{ color: 'orange', fontSize: 16 }}>Đăng Nhập</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default UserProfileScreen;
