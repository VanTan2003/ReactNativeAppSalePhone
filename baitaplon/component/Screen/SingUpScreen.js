import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from "react";
import axios from 'axios';
import { url } from '../../ipconfig';

const DangKyScreen = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const handleRegister = async () => {
      try {
        if (!username || !email || !password || !mobile || !confirmPassword) {
            Alert.alert("Thông báo","Vui lòng nhập đầy đủ thông tin.",);
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Thông báo","Email không hợp lệ.");
            return false;
        }
        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(mobile)) {
            Alert.alert("Thông báo","Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng 0 và có 10 ký tự số.");
            return false;
        }
        if (password !== confirmPassword) {
          Alert.alert("Thông báo","Mật khẩu và xác nhận mật khẩu không khớp");
          return;
        }
        const response = await axios.post(
         `${url}/dangky.php`,
         new URLSearchParams({
          hoten:username,
          email: email,
          matkhau: password,
          sodienthoai:mobile,
        })
        );
   
        const result = response.data;
        setMessage(result.message);
        if (result.success) {
          Alert.alert("Thông báo", "Đăng ký tài khoản thành công", [
            {
              text: "Đăng Nhập",
              onPress: () => {
                navigation.navigate("DangNhapScreen");
              },
            },
          ]);
        } else {
          Alert.alert("Thông báo","Lỗi");
        }
      } catch(error) {
        setMessage("Lỗi khi lấy dữ liệu: " + error.message);
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
                        }}>Đăng Ký</Text>
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
                                    <TextInput keyboardType="email-address" value={username} onChangeText={(text) => setUsername(text)} placeholder='Họ tên của bạn' />
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
                                    <TextInput  value={mobile} onChangeText={(text) => setMobile(text)} placeholder='Số điện thoại của bạn' />
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
                                    <TextInput  value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholder='Mật khẩu của bạn' />
                                </View>
                            </View>
                        </View>
                         {/* matkhau */}
                         <View>
                            <View style={{ marginBottom: 8, marginTop: 20 }}>
                                <Text style={{ color: 'black', fontWeight:'500' }}>
                                   Nhập Lại Mật khẩu
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
                                    <TextInput  value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} secureTextEntry={true} placeholder='Nhập lại mật khẩu của bạn' />
                                </View>
                            </View>
                        </View>
                        {/* button đăng nhập */}
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                            <TouchableOpacity style={{width: '100%'}} activeOpacity={0.5}  onPress={handleRegister} >
                                <LinearGradient style={{
                                    padding: 10, borderRadius: 50, width: '100%',
                                    justifyContent: 'center', alignItems: 'center'
                                }}
                                    useAngle={true}
                                    angle={45}
                                    colors={['#AED6F1', '#3498DB']}>

                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Đăng Ký</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* footer */}
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>
                            Hoặc Đăng Nhập Sử Dụng
                        </Text>
                        <TouchableOpacity  onPress={() => navigation.navigate("DangNhapScreen")} style={{
                            padding: 20,
                         }}>
                            <Text style={{
                                color: 'black',
                                fontWeight: '500',
                            }}>
                                Đăng Nhập
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DangKyScreen

const styles = StyleSheet.create({})