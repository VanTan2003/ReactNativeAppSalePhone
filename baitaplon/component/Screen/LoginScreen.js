import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert,StyleSheet } from "react-native";
import axios from "axios";
import { url } from "../../ipconfig";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "./AuthContext";

const DangNhapScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);

  const handleLogin = () => {
    axios
      .post(
        `${url}/dangnhap.php`,
        new URLSearchParams({
          email: email,
          matkhau: password,
        })
      )
      .then((response) => {
        if ( response.data.success) {
          const userData = response.data.result[0];
          setUser(userData);
          console.log("User data set:", userData);
          navigation.navigate("Trang Chủ");
        } else {
          Alert.alert("Thông báo",  response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        Alert.alert(
          "Thông báo",
          "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau."
        );
      });
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
            }}>Đăng Nhập</Text>
          </View>
          {/* body */}
          <View style={{ flex: 6, margin: 30 }}>
            <View>
              {/* email */}
              <View style={{ marginBottom: 8 }}>
                <Text style={{ color: 'black', fontWeight: '500' }}>
                  Email
                </Text>
              </View>
              <View style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 1 }}>
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 15,
                  marginTop: -8.5
                }}>
                  <FontAwesome name='envelope' size={15} />
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder='Email của bạn' />
                </View>
              </View>
            </View>
            {/* matkhau */}
            <View>
              <View style={{ marginBottom: 8, marginTop: 20 }}>
                <Text style={{ color: 'black', fontWeight: '500' }}>
                  Mật Khẩu
                </Text>
              </View>
              <View style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 1 }}>
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 15,
                  marginTop: -8.5
                }}>
                  <FontAwesome name='lock' size={15} />
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholder='Mật khẩu của bạn' />
                </View>
              </View>
            </View>
            <View style={{ marginTop: 15, alignItems: 'flex-end' }}>
              <Text style={{ color: 'black', fontWeight: '500' }}>Quên Mật Khẩu?</Text>
            </View>
            {/* button đăng nhập */}
            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
              <TouchableOpacity style={{ width: '100%' }} activeOpacity={0.5} onPress={handleLogin}>
                <LinearGradient style={{
                  padding: 10, borderRadius: 50, width: '100%',
                  justifyContent: 'center', alignItems: 'center'
                }}
                  useAngle={true}
                  angle={45}
                  colors={['#AED6F1', '#3498DB']}>

                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Đăng Nhập</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
              <Text>
                Hoặc Đăng Nhập Sử Dụng
              </Text>
              <View style={{ marginTop: 15, flexDirection: 'row' }}>
                {/* facebook */}
                <TouchableOpacity style={{
                  width: 35, height: 35, padding: 10, backgroundColor: '#3b5998',
                  borderRadius: 50, justifyContent: 'center', alignItems: 'center', margin: 5
                }}>
                  <FontAwesome name='facebook-f' size={15} color={'white'} />
                </TouchableOpacity>
                {/* twitter */}
                <TouchableOpacity style={{
                  width: 35, height: 35, padding: 10, backgroundColor: '#1dcaff',
                  borderRadius: 50, justifyContent: 'center', alignItems: 'center', margin: 5
                }}>
                  <FontAwesome name='twitter' size={15} color={'white'} />
                </TouchableOpacity>
                {/* google */}
                <TouchableOpacity style={{
                  width: 35, height: 35, padding: 10, backgroundColor: '#EA4335',
                  borderRadius: 50, justifyContent: 'center', alignItems: 'center', margin: 5
                }}>
                  <FontAwesome name='google' size={15} color={'white'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* footer */}
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Text>
              Hoặc Đăng Ký Sử Dụng
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("DangKyScreen")} style={{
              padding: 20,
            }}>
              <Text style={{
                color: 'black',
                fontWeight: '500',
              }}>
                Đăng Ký
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default DangNhapScreen
