import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../../../constants";
import PropTypes from 'prop-types';

const SlideShowScreen = () => {
  const slides = [
    "https://cdn.tgdd.vn/2024/06/banner/Group-427320083--1--1200x300.png",
    "https://cdn.tgdd.vn/2024/06/banner/SS-S23-ultra-Desk-1200x300.jpg",
    "https://cdn.tgdd.vn/2024/06/banner/343434-1200x300.jpg",
    "https://cdn.tgdd.vn/2024/05/banner/1200x300-1200x300-16.png",
    "https://cdn.tgdd.vn/2024/06/banner/1200x300-1200x300.png"
  ];

  return (
    <View style={{
      flex: 3,
      alignItems: "center",
      justifyContent: "center",
  }}>
      <SliderBox
          images={slides}
          dotColor={COLORS.primary}
          inactiveDotColor={COLORS.secondary}
          ImageComponentStyle={{ borderRadius: 15, width: '93%', marginTop: 5, height: 170 }}
          autoplay
          circleLoop
      />
  </View>
  );
}
SlideShowScreen.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.string),
};

export default SlideShowScreen;
