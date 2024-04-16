import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import IntlPhoneInput from "react-native-intl-phone-input";
import { useFocusEffect } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
  const backAction = () => {
    if (Platform.OS === "ios") {
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      });
    } else {
      backClickCount == 1 ? BackHandler.exitApp() : _spring();
      return true;
    }
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      navigation.addListener("gestureEnd", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
        navigation.removeListener("gestureEnd", backAction);
      };
    }, [backAction])
  );

  function _spring() {
    updateState({ backClickCount: 1 });
    setTimeout(() => {
      updateState({ backClickCount: 0 });
    }, 1000);
  }

  const [state, setState] = useState({ backClickCount: 0 });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { backClickCount } = state;

  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../assets/images/bg.jpg")}
        resizeMode="cover"
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={["black", "rgba(0,0.10,0,0.77)", "rgba(0,0,0,0.1)"]}
          style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
        >
          <ScrollView
            automaticallyAdjustKeyboardInsets={true}
            showsVerticalScrollIndicator={false}
          >
            {welcomeInfo()}
            {phoneNumberTextField()}
            {continueButton()}
            {otpText()}
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
      {backClickCount == 1 ? (
        <View style={[styles.animatedView]}>
          <Text style={{ ...Fonts.whiteColor12Regular }}>
            Press Back Once Again to Exit
          </Text>
        </View>
      ) : null}
    </View>
  );

  function otpText() {
    return (
      <Text style={{ ...Fonts.whiteColor18Medium, textAlign: "center" }}>
        We’ll send otp for verification
      </Text>
    );
  }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("Verification")}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={[
            "rgba(255, 118, 117, 0.8)",
            "rgba(255, 118, 117, 0.6)",
            "rgba(255, 118, 117, 0.4)",
          ]}
          style={styles.continueButtonStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Medium }}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function phoneNumberTextField() {
    return (
      <IntlPhoneInput
        onChangeText={({ phoneNumber }) => setPhoneNumber({ phoneNumber })}
        defaultCountry="US"
        containerStyle={styles.phoneNumberContentStyle}
        placeholder="Phone Number"
        placeholderTextColor={Colors.whiteColor}
        dialCodeTextStyle={{
          ...Fonts.whiteColor14Regular,
          marginLeft: Sizes.fixPadding,
        }}
        phoneInputStyle={{
          flex: 1,
          marginLeft: Sizes.fixPadding + 5.0,
          ...Fonts.whiteColor14Regular,
        }}
        filterInputStyle={{ ...Fonts.blackColor14Regular }}
        flagStyle={{ fontSize: 28 }}
        modalCountryItemCountryNameStyle={{ ...Fonts.blackColor14Regular }}
      />
    );
  }

  function welcomeInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 8.0,
          marginBottom: Sizes.fixPadding * 4.0,
        }}
      >
        <Text style={{ ...Fonts.whiteColor36SemiBold }}>Welcome back</Text>
        <Text style={{ ...Fonts.whiteColor14Regular }}>Login your account</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  phoneNumberContentStyle: {
    height: 60.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    backgroundColor: "rgba(128, 128, 128, 0.8)",
    borderRadius: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 8.0,
  },
  continueButtonStyle: {
    borderRadius: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 4.0,
    marginBottom: Sizes.fixPadding * 2.0,
    height: 56.0,
  },
  searchCountryTextFieldContentStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 2.0,
    borderBottomWidth: 1.0,
    borderBottomColor: Colors.grayColor,
  },
  animatedView: {
    backgroundColor: "#333333",
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
