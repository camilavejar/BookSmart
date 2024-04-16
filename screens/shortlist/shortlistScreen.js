import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Fonts, Colors, Sizes, CommonStyles } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";

const shortListData = [
  {
    key: "1",
    bookImage: require("../../assets/images/book/book_4.jpg"),
    bookName: "Clean Code",
    bookDesc: "A Handbook of Agile Software Craftsmanship",
    bookAmount: "16.99",
    isFavourit: true,
  },
  {
    key: "2",
    bookImage: require("../../assets/images/book/book_2.jpg"),
    bookName: "A Philosophy of Software Design",
    bookDesc: "2nd Edition - John Ousterhout",
    bookAmount: "12.99",
    isFavourit: true,
  },
];

const { width } = Dimensions.get("screen");

const rowSwipeAnimatedValues = {};

Array(shortListData.length + 1)
  .fill("")
  .forEach((_, i) => {
    rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
  });

const ShortlistScreen = ({ navigation }) => {
  const [showSnackBar, setShowSnackBar] = useState(false);

  const [listData, setListData] = useState(shortListData);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setShowSnackBar(true);
    setListData(newData);
  };

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    rowSwipeAnimatedValues[key].setValue(Math.abs(value));
  };

  const renderItem = (data) => (
    <TouchableHighlight
      style={{ backgroundColor: Colors.whiteColor }}
      activeOpacity={0.9}
      onPress={() =>
        navigation.push("Book", {
          bookImage: data.item.bookImage,
          bookName: data.item.bookName,
          bookDesc: data.item.bookDesc,
          bookAmount: data.item.bookAmount,
        })
      }
    >
      <View style={styles.featuredBookContentStyle}>
        <Image
          source={data.item.bookImage}
          resizeMode="cover"
          style={styles.featuredBookImageStyle}
        />
        <View style={styles.featuredBookInfoContentStyle}>
          <View style={{ width: width / 1.9 }}>
            <Text style={{ ...Fonts.blackColor14SemiBold }}>
              {data.item.bookName}
            </Text>
            <Text numberOfLines={1} style={{ ...Fonts.grayColor12Medium }}>
              {data.item.bookDesc}
            </Text>
          </View>
          <View style={styles.featuredBookAmountContentStyle}>
            <Text style={{ ...Fonts.blackColor16SemiBold }}>
              {data.item.bookAmount}$
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={{ alignItems: "center", flex: 1 }}>
      <TouchableOpacity
        style={styles.backDeleteContinerStyle}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Animated.View
          style={[
            {
              transform: [
                {
                  scale: rowSwipeAnimatedValues[data.item.key].interpolate({
                    inputRange: [45, 90],
                    outputRange: [0, 1],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <MaterialIcons
            name="delete"
            size={24}
            color={Colors.whiteColor}
            style={{ alignSelf: "center" }}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {header()}
      {listData.length == 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <MaterialIcons
            name="favorite-border"
            size={50}
            color={Colors.grayColor}
          />
          <Text
            style={{
              ...Fonts.grayColor18Bold,
              marginTop: Sizes.fixPadding * 2.0,
            }}
          >
            No item in shortlist
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <SwipeListView
            data={listData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-100}
            onSwipeValueChange={onSwipeValueChange}
            contentContainerStyle={{
              paddingTop: Sizes.fixPadding * 2.0,
              paddingBottom: Sizes.fixPadding * 8.0,
            }}
          />
        </View>
      )}
      <Snackbar
        style={styles.snackBarStyle}
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}
      >
        Removed from shortList
      </Snackbar>
    </View>
  );

  function header() {
    return (
      <View style={styles.headerStyle}>
        <Text style={{ ...Fonts.primaryColor18Bold }}>Shortlisted</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerStyle: {
    height: 60.0,
    elevation: 5.0,
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    ...CommonStyles.shadow,
  },
  featuredBookContentStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    elevation: 3.0,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 5.0,
    ...CommonStyles.shadow,
  },
  featuredBookImageStyle: {
    borderTopLeftRadius: Sizes.fixPadding,
    borderTopRightRadius: Sizes.fixPadding,
    width: "100%",
    height: 420.0,
  },
  featuredBookInfoContentStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding,
    alignItems: "center",
  },
  featuredBookAmountContentStyle: {
    borderWidth: 1.0,
    alignItems: "center",
    height: 30.0,
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    borderColor: "rgba(128, 128, 128, 0.5)",
  },
  snackBarStyle: {
    position: "absolute",
    bottom: 50.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: "#333333",
  },
  backDeleteContinerStyle: {
    alignItems: "center",
    bottom: 15,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 90,
    backgroundColor: "red",
    right: 0,
  },
});

export default ShortlistScreen;
