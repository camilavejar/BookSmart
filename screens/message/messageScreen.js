import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Fonts, Colors, Sizes, CommonStyles } from "../../constant/styles";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import MyStatusBar from "../../component/myStatusBar";

const MessageScreen = ({ navigation, route }) => {
  const [showBottomSheet, setshowBottomSheet] = useState(false);

  const name = route.params.name;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "height" : null}
        style={{ flex: 1 }}
      >
        {header()}
        <Message navigation={navigation} />
      </KeyboardAvoidingView>
      {bookInfo()}
    </View>
  );

  function bookInfo() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showBottomSheet}
        onRequestClose={() => {
          setshowBottomSheet(false);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setshowBottomSheet(false);
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
              style={styles.sheetWrapper}
            >
              <View style={styles.bottomSheetContentStyle}>
                <View style={styles.bookImageContentStyle}>
                  <Image
                    source={require("../../assets/images/book/book_4.jpg")}
                    style={{ height: 160.0, width: 130.0, overflow: "hidden" }}
                  />
                </View>

                <View
                  style={{
                    justifyContent: "space-between",
                    marginLeft: Sizes.fixPadding,
                    paddingBottom: Sizes.fixPadding - 7.0,
                  }}
                >
                  <View>
                    <Text style={{ ...Fonts.blackColor18Bold }}>
                      Clean Code{" "}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{ ...Fonts.grayColor14Medium }}
                    >
                      A Handbook of Agile Software Craftsmanship{" "}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ ...Fonts.blackColor18Bold }}>16.99</Text>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => setshowBottomSheet(false)}
                      style={styles.viewMoreButtonStyle}
                    >
                      <Text style={{ ...Fonts.whiteColor14Medium }}>
                        View more
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function header() {
    return (
      <View style={styles.headerContainerStyle}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.pop()}
        />
        <Text
          style={{
            ...Fonts.blackColor18Bold,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          {name}
        </Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          color={Colors.blackColor}
          onPress={() => setshowBottomSheet(true)}
        />
      </View>
    );
  }
};

const Message = ({ navigation }) => {
  const [messagesList, setMessagesList] = useState([
    {
      id: "1",
      message: "Hello",
      time: "9:37 AM",
      isSender: true,
      isSeen: true,
    },
    {
      id: "2",
      message: "Hello",
      time: "9:38 AM",
      isSender: false,
      isSeen: null,
    },
    {
      id: "3",
      message: "When i come to see this book?",
      time: "9:40 AM",
      isSender: true,
      isSeen: false,
    },
  ]);

  function messages() {
    const renderItem = ({ item }) => {
      return (
        <View
          style={{
            alignItems: item.isSender == true ? "flex-end" : "flex-start",
            marginHorizontal: Sizes.fixPadding,
            marginVertical: Sizes.fixPadding - 5.0,
          }}
        >
          <View
            style={{
              ...styles.messageContainerStyle,
              backgroundColor:
                item.isSender == true
                  ? Colors.primaryColor
                  : "rgba(128, 128, 128, 0.6)",
              borderBottomLeftRadius:
                item.isSender == true ? Sizes.fixPadding - 5.0 : 0.0,
              borderBottomRightRadius:
                item.isSender == true ? 0.0 : Sizes.fixPadding - 5.0,
            }}
          >
            <Text style={{ ...Fonts.whiteColor14Regular }}>{item.message}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: Sizes.fixPadding - 5.0,
            }}
          >
            {item.isSender == true ? (
              item.isSeen == true ? (
                <Ionicons
                  name="checkmark-done-sharp"
                  size={18}
                  color="#1039CC"
                />
              ) : (
                <Ionicons name="checkmark-sharp" size={18} color="#1039CC" />
              )
            ) : null}
            <Text
              style={{
                ...Fonts.grayColor12Regular,
              }}
            >
              {item.time}
            </Text>
          </View>
        </View>
      );
    };

    return (
      <FlatList
        data={messagesList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: Sizes.fixPadding * 2.0,
          flexDirection: "column-reverse",
        }}
        inverted
      />
    );
  }

  function addMessage({ message }) {
    const oldMessages = messagesList;
    let date = Date();
    let hour = new Date(date).getHours();
    let minute = new Date(date).getMinutes();
    let AmPm = hour >= 12 ? "PM" : "AM";
    let finalhour = hour >= 12 ? hour - 12 : hour;

    const newMessage = {
      id: messagesList.length + 1,
      message: message,
      time: `${finalhour}:${minute} ${AmPm}`,
      isSender: true,
      isSeen: false,
    };

    oldMessages.push(newMessage);
    setMessagesList(oldMessages);
  }

  function typeMessage() {
    const [message, setMessage] = useState("");
    return (
      <View style={styles.bottomContainerStyle}>
        <View style={styles.textFieldContainerStyle}>
          <TextInput
            selectionColor={Colors.whiteColor}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a Message"
            style={{ ...Fonts.whiteColor14Regular }}
            placeholderTextColor={Colors.whiteColor}
          />
        </View>
        <View style={styles.sendButtonStyle}>
          <MaterialCommunityIcons
            name="send"
            size={24}
            color={Colors.primaryColor}
            onPress={() => {
              if (message != "") {
                addMessage({ message: message });
                setMessage("");
              }
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {messages()}
      {typeMessage()}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60.0,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    elevation: 10.0,
    ...CommonStyles.shadow,
  },
  messageContainerStyle: {
    borderTopRightRadius: Sizes.fixPadding - 5.0,
    borderTopLeftRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 6.0,
  },
  bottomContainerStyle: {
    flexDirection: "row",
    marginBottom: Sizes.fixPadding,
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding,
  },
  textFieldContainerStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    height: 40.0,
    justifyContent: "center",
    flex: 1,
    paddingLeft: Sizes.fixPadding,
  },
  sendButtonStyle: {
    height: 40.0,
    width: 40.0,
    borderRadius: 20.0,
    backgroundColor: "rgba(128, 128, 128, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Sizes.fixPadding,
  },
  bookImageContentStyle: {
    borderRadius: Sizes.fixPadding,
    height: 160.0,
    width: 130.0,
    backgroundColor: Colors.whiteColor,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 50,
    borderColor: "rgba(128, 128, 128, 0.2)",
    borderWidth: 1.5,
    elevation: 3.0,
  },
  viewMoreButtonStyle: {
    height: 31.0,
    width: 95.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSheetContentStyle: {
    flexDirection: "row",
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding * 2.0,
  },
  sheetWrapper: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding * 2.0,
    borderTopRightRadius: Sizes.fixPadding * 2.0,
  },
});

export default MessageScreen;
