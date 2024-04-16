import React, { useCallback } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ImageBackground,
  BackHandler,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Sizes, Fonts } from "../constant/styles";
import { CircleFade } from "react-native-animated-spinkit";
import { useFocusEffect } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {
  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  setTimeout(() => {
    navigation.push("Login");
  }, 2000);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="light-content"
      />
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/images/bg.jpg")}
        resizeMode="cover"
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={["black", "rgba(0,0.10,0,0.77)", "rgba(0,0,0,0.1)"]}
          style={styles.pageStyle}
        >
          <Text style={{ ...Fonts.whiteColor36Medium }}>BookSmart</Text>
          <CircleFade
            size={50}
            color={Colors.whiteColor}
            style={{
              position: "absolute",
              bottom: 40.0,
            }}
          />
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
