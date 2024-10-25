import { ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ChaoMungScreen from "./ChaoMungScreen";
import SlideShowScreen from "./SlideShowScreen";
import SanPhamBanChayRow from "./SanPhamBanChayRow";
import SanPhamMoiNhatRow from "./SanPhamMoiNhatRow";
import HeaderMoiNhat from "./HeaderMoiNhat";
import HeaderBanChay from "./HeaderBanChay";
import { COLORS } from "../../../constants";
const Home=()=>{
    return (
        <SafeAreaView style={{backgroundColor:COLORS.secondary}}>
          <ScrollView>
            <ChaoMungScreen/>
            <SlideShowScreen/>
            <HeaderMoiNhat/>
            <SanPhamMoiNhatRow/>
            <HeaderBanChay/>
            <SanPhamBanChayRow/>
        </ScrollView>
        </SafeAreaView>
      );
}
export default Home;