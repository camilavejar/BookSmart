import React, { useState } from "react";
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { CircleFade } from "react-native-animated-spinkit";
import { Modal } from "react-native-paper";
import OTPField from "react-native-otp-field";

const { width } = Dimensions.get("window");

const VerificationScreen = ({ navigation }) => {
  const [otpInput, setotpInput] = useState("");
  const [isLoading, setisLoading] = useState(false);

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
            {backArrow()}
            {verificationInfo()}
            {otpFields()}
            {resendInfo()}
            {continueButton()}
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
      {loading()}
    </View>
  );

  function backArrow() {
    return (
      <MaterialIcons
        name="arrow-back"
        size={24}
        color={Colors.whiteColor}
        style={{
          marginTop: Sizes.fixPadding * 7.0,
          marginBottom: Sizes.fixPadding,
        }}
        onPress={() => navigation.pop()}
      />
    );
  }

  function loading() {
    return (
      <Modal
        visible={isLoading}
        onDismiss={() => {
          setisLoading(false);
        }}
        contentContainerStyle={styles.dialogContainerStyle}
      >
        <View style={{ backgroundColor: "white", alignItems: "center" }}>
          <CircleFade size={56} color={Colors.primaryColor} />
          <Text
            style={{
              ...Fonts.grayColor12Medium,
              marginTop: Sizes.fixPadding * 2.0,
            }}
          >
            Please wait..
          </Text>
        </View>
      </Modal>
    );
  }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setisLoading(true);
          setTimeout(() => {
            setisLoading(false);
            navigation.push("BottomBar");
          }, 2000);
        }}
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

  function resendInfo() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: Sizes.fixPadding * 7.0,
        }}
      >
        <Text style={{ ...Fonts.lightGrayColor14Medium }}>
          Didn’t receive otp code!
        </Text>
        <Text
          style={{
            ...Fonts.whiteColor18Bold,
            marginLeft: Sizes.fixPadding - 5.0,
          }}
        >
          Resend
        </Text>
      </View>
    );
  }

  function otpFields() {
    return (
      <OTPField
        length={4}
        value={otpInput}
        onChange={(val) => {
          setotpInput(val);
          if (val.length == 4) {
            Keyboard.dismiss();
            setisLoading(true);
            setTimeout(() => {
              setisLoading(false);
              navigation.push("BottomBar");
            }, 2000);
          }
        }}
        textFieldStyle={{ ...styles.textFieldStyle }}
        containerStyle={{
          marginTop: Sizes.fixPadding * 4.0,
        }}
        cursorColor={Colors.primaryColor}
        selectionColor={Colors.primaryColor}
      />
    );
  }

  function verificationInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 3.0,
          marginBottom: Sizes.fixPadding * 4.0,
        }}
      >
        <Text style={{ ...Fonts.whiteColor36SemiBold }}>Verification</Text>
        <Text style={{ ...Fonts.whiteColor14Regular }}>
          Enter the otp code from the phone we just sent you
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  textFieldStyle: {
    borderRadius: Sizes.fixPadding - 2.0,
    backgroundColor: "rgba(128, 128, 128, 0.8)",
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    ...Fonts.whiteColor18Medium,
    width: width / 8,
    height: width / 8,
    marginHorizontal: Sizes.fixPadding,
  },
  continueButtonStyle: {
    borderRadius: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 5.0,
    height: 56.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  dialogContainerStyle: {
    backgroundColor: Colors.whiteColor,
    width: "85%",
    alignSelf: "center",
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding * 2.0,
  },
});

export default VerificationScreen;
