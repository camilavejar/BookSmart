import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Fonts, Colors, Sizes, CommonStyles } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import MyStatusBar from "../../component/myStatusBar";

const PrivacyPolicyScreen = ({ navigation }) => {
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
        At bookSmart, we are committed to protecting the privacy of our users.
        This Privacy Policy outlines how we collect, use, disclose, and
        safeguard your personal information when you use our textbook
        marketplace platform and any services offered through it.
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
          Privacy Policy
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

export default PrivacyPolicyScreen;
