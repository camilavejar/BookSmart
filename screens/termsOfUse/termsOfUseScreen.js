import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Fonts, Colors, Sizes, CommonStyles } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import MyStatusBar from "../../component/myStatusBar";

const TermsOfUseScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
        >
          {dummyText()}
        </ScrollView>
      </View>
    </View>
  );

  function dummyText() {
    return (
      <Text
        style={{
          ...Fonts.blackColor14Medium,
          marginHorizontal: Sizes.fixPadding * 2.0,
          textAlign: "justify",
          marginBottom: Sizes.fixPadding,
        }}
      >
        By accessing and using the bookSmart platform, you agree to comply with
        these Terms of Use. You acknowledge that all content and services
        provided on the platform are the property of bookSmart and are protected
        by intellectual property laws. You agree to use the platform only for
        lawful purposes and to refrain from engaging in any activities that may
        disrupt or interfere with its operation.
      </Text>
    );
  }

  function header() {
    return (
      <View style={styles.headerContentStyle}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.pop()}
          style={{ position: "absolute", left: 20.0 }}
        />
        <Text
          style={{
            ...Fonts.blackColor18Bold,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          Terms of use
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerContentStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60.0,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    elevation: 10.0,
    ...CommonStyles.shadow,
  },
});

export default TermsOfUseScreen;
