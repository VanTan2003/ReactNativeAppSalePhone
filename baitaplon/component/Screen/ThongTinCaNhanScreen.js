import React, { useContext, useState ,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { url } from '../../ipconfig';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const UpdateUserProfileScreen = ({navigation}) => {
    const { user,setUser } = useContext(AuthContext);
    const [email, setEmail] = useState(user.email || '');
    const [sodienthoai, setSoDienThoai] = useState(user.sodienthoai || '');
    const [matkhau, setMatKhau] = useState(user.matkhau || '');
    const [hoten, setHoTen] = useState(user.hoten || '');
    useEffect(() => {
        navigation.setOptions({
          headerTitle: "Thông Tin Cá Nhân",
        });
      }, []);
    const handleUpdateProfile = async () => {
        try {
          if (!hoten || !email || !matkhau || !sodienthoai) {
              Alert.alert("Thông báo","Vui lòng nhập đầy đủ thông tin.",);
              return false;
          }
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
              Alert.alert("Thông báo","Email không hợp lệ.");
              return false;
          }
          const phoneRegex = /^0\d{9}$/;
          if (!phoneRegex.test(sodienthoai)) {
              Alert.alert("Thông báo","Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng 0 và có 10 ký tự số.");
              return false;
          }
          const response = await axios.post(
           `${url}/suataikhoan.php`,
           new URLSearchParams({
            hoten:hoten,
            email: email,
            matkhau: matkhau,
            sodienthoai:sodienthoai,
            id:user.id
          })
          );
          const result = response.data;
          if (result.success) {
            setUser({
                ...user,
                hoten: hoten,
                email: email,
                matkhau: matkhau,
                sodienthoai: sodienthoai
            });
            Alert.alert("Thông báo", "Cập nhật thông tin thành công");
            navigation.navigate("Cá Nhân");
          } else {
            Alert.alert("Thông báo","Lỗi");
          }
        } catch(error) {
          Alert.alert("Lỗi khi lấy dữ liệu: " + error.message);
        }
       };
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={{
            backgroundColor: 'white', margin: 10,
            flex: 1, borderRadius: 10
        }}>
            <View style={{ flex: 1, marginHorizontal: 20, marginTop: 30 }}>
                {/* header */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        fontSize: 30, fontWeight: "bold",
                        color: 'black'
                    }}>Thông Tin Cá Nhân</Text>
                </View>
                {/* body */}
                <View style={{ flex: 6, margin: 20 }}>
                <View>
                        {/* hoten */}
                        <View style={{ marginBottom: 8 }}>
                            <Text style={{ color: 'black' ,fontWeight:'500'}}>
                                Họ Tên
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 1 }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 15,
                                marginTop:-8.5
                            }}>
                                <Ionicons name='person-outline' size={15} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput keyboardType="email-address" value={hoten} onChangeText={(text) => setHoTen(text)} placeholder='Họ tên của bạn' />
                            </View>
                        </View>
                    </View>
                    <View>
                        {/* email */}
                        <View style={{ marginBottom: 8 , marginTop:10 }}>
                            <Text style={{ color: 'black' ,fontWeight:'500'}}>
                                Email
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 1 }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 15,
                                marginTop:-8.5
                            }}>
                                <FontAwesome name='envelope' size={15} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput  value={email} onChangeText={(text) => setEmail(text)} placeholder='Email của bạn' />
                            </View>
                        </View>
                    </View>
                    {/* sodienthoai */}
                    <View>
                        <View style={{ marginBottom: 8, marginTop: 20 }}>
                            <Text style={{ color: 'black', fontWeight:'500' }}>
                                Số điện thoại
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 1 }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 15,
                                marginTop:-8.5
                            }}>
                                <AntDesign name='phone' size={15} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput  value={sodienthoai} onChangeText={(text) => setSoDienThoai(text)} placeholder='Số điện thoại của bạn' />
                            </View>
                        </View>
                    </View>
                    {/* matkhau */}
                    <View>
                        <View style={{ marginBottom: 8, marginTop: 20 }}>
                            <Text style={{ color: 'black', fontWeight:'500' }}>
                                Mật khẩu
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 1 }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 15,
                                marginTop:-8.5
                            }}>
                                <FontAwesome name='lock' size={15} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput  value={matkhau} onChangeText={(text) => setMatKhau(text)} placeholder='Mật khẩu của bạn' />
                            </View>
                        </View>
                    </View>
                    {/* button đăng nhập */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                        <TouchableOpacity style={{width: '100%'}} activeOpacity={0.5}  onPress={handleUpdateProfile} >
                            <LinearGradient style={{
                                padding: 10, borderRadius: 50, width: '100%',
                                justifyContent: 'center', alignItems: 'center'
                            }}
                                useAngle={true}
                                angle={45}
                                colors={['#AED6F1', '#3498DB']}>

                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Cập Nhật</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* footer */}
            </View>
        </View>
    </View>
    );
};

export default UpdateUserProfileScreen;
