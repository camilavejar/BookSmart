import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes, CommonStyles } from "../../constant/styles";
import { Snackbar } from "react-native-paper";

const nearByBookList = [
  {
    id: "1",
    bookImage: require("../../assets/images/book/book_1.jpg"),
    bookName: "Physics",
    bookDesc: "Eleventh Edition - Cutnell & Johnson",
    bookAmount: "15.99",
    isFavourit: false,
  },
  {
    id: "2",
    bookImage: require("../../assets/images/book/book_2.jpg"),
    bookName: "A Philosophy of Software Design",
    bookDesc: "2nd Edition - John Ousterhout",
    bookAmount: "12.99",
    isFavourit: true,
  },
  {
    id: "3",
    bookImage: require("../../assets/images/book/book_3.jpg"),
    bookName: "Software Architecture",
    bookDesc: "Modern Trade-Off Analyses for Distributed Architectures",
    bookAmount: "13.99",
    isFavourit: false,
  },
  {
    id: "4",
    bookImage: require("../../assets/images/book/book_4.jpg"),
    bookName: "Clean Code",
    bookDesc: "A Handbook of Agile Software Craftsmanship",
    bookAmount: "16.99",
    isFavourit: true,
  },
  {
    id: "5",
    bookImage: require("../../assets/images/book/book_5.jpg"),
    bookName: "C++ Software Design",
    bookDesc: "Design Principles and Patterns",
    bookAmount: "11.99",
    isFavourit: false,
  },
];

const featuredBookList = [
  {
    id: "1",
    bookImage: require("../../assets/images/book/book_4.jpg"),
    bookName: "Clean Code",
    bookDesc: "A Handbook of Agile Software Craftsmanship",
    bookAmount: "16.99",
    isFavourit: true,
  },
  {
    id: "2",
    bookImage: require("../../assets/images/book/book_5.jpg"),
    bookName: "C++ Software Design",
    bookDesc: "Design Principles and Patterns",
    bookAmount: "11.99",
    isFavourit: false,
  },
  {
    id: "3",
    bookImage: require("../../assets/images/book/book_2.jpg"),
    bookName: "A Philosophy of Software Design",
    bookDesc: "2nd Edition - John Ousterhout",
    bookAmount: "12.99",
    isFavourit: true,
  },
  {
    id: "4",
    bookImage: require("../../assets/images/book/book_3.jpg"),
    bookName: "Software Architecture",
    bookDesc: "Modern Trade-Off Analyses for Distributed Architectures",
    bookAmount: "13.99",
    isFavourit: false,
  },
  {
    id: "5",
    bookImage: require("../../assets/images/book/book_1.jpg"),
    bookName: "Physics",
    bookDesc: "Eleventh Edition - Cutnell & Johnson",
    bookAmount: "15.99",
    isFavourit: false,
  },
];

const { width } = Dimensions.get("screen");

const HomeScreen = ({ navigation }) => {
  const [state, setState] = useState({
    isBuy: true,
    nearbyBookChangableList: nearByBookList,
    featuredBookChangableList: featuredBookList,
    showSnackBar: false,
    isInWishList: false,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const {
    isBuy,
    nearbyBookChangableList,
    featuredBookChangableList,
    showSnackBar,
    isInWishList,
  } = state;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.push("Book", {
          bookImage: item.bookImage,
          bookName: item.bookName,
          bookDesc: item.bookDesc,
          bookAmount: item.bookAmount,
        })
      }
      style={styles.featuredBookContentStyle}
    >
      <Image
        source={item.bookImage}
        resizeMode="cover"
        style={styles.featuredBookImageStyle}
      />
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          handleFeaturedBookUpdate({ id: item.id });
          updateState({ isInWishList: item.isFavourit, showSnackBar: true });
        }}
        style={styles.addToFavouriteContainerStyle}
      >
        <MaterialIcons
          name={item.isFavourit ? "favorite" : "favorite-border"}
          size={16}
          color={Colors.grayColor}
        />
      </TouchableOpacity>
      <View style={styles.featuredBookInfoContentStyle}>
        <View style={{ width: width / 1.9 }}>
          <Text style={{ ...Fonts.blackColor14SemiBold }}>{item.bookName}</Text>
          <Text numberOfLines={1} style={{ ...Fonts.grayColor12Medium }}>
            {item.bookDesc}
          </Text>
        </View>
        <View style={styles.featuredBookAmountContentStyle}>
          <Text style={{ ...Fonts.blackColor16SemiBold }}>
            {item.bookAmount}$
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {header()}
      <FlatList
        ListHeaderComponent={
          <>
            {buyAndRentButton()}
            {title({ title: "Suggested Books" })}
            {nearbyBooks()}
            {title({ title: "Featured Books" })}
          </>
        }
        data={featuredBookChangableList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0 }}
        showsVerticalScrollIndicator={false}
      />
      <Snackbar
        style={styles.snackBarStyle}
        visible={showSnackBar}
        onDismiss={() => updateState({ showSnackBar: false })}
      >
        {isInWishList ? "Removed from shortlist" : "Added to shortlist"}
      </Snackbar>
    </View>
  );

  function handleFeaturedBookUpdate({ id }) {
    const newList = featuredBookChangableList.map((book) => {
      if (book.id === id) {
        const updatedItem = { ...book, isFavourit: !book.isFavourit };
        return updatedItem;
      }
      return book;
    });
    updateState({ featuredBookChangableList: newList });
  }

  function handleNearByBookUpdate({ id }) {
    const newList = nearbyBookChangableList.map((book) => {
      if (book.id === id) {
        const updatedItem = { ...book, isFavourit: !book.isFavourit };
        return updatedItem;
      }
      return book;
    });
    updateState({ nearbyBookChangableList: newList });
  }

  function nearbyBooks() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.push("Book", {
            bookImage: item.bookImage,
            bookName: item.bookName,
            bookDesc: item.bookDesc,
            bookAmount: item.bookAmount,
          })
        }
        style={styles.nearByBookContentStyle}
      >
        <Image
          source={item.bookImage}
          resizeMode="cover"
          style={styles.nearByBookImageStyle}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            handleNearByBookUpdate({ id: item.id });
            updateState({ isInWishList: item.isFavourit, showSnackBar: true });
          }}
          style={styles.addToFavouriteContainerStyle}
        >
          <MaterialIcons
            name={item.isFavourit ? "favorite" : "favorite-border"}
            size={16}
            color={Colors.grayColor}
          />
        </TouchableOpacity>
        <View style={{ marginHorizontal: Sizes.fixPadding }}>
          <Text
            style={{
              ...Fonts.blackColor14SemiBold,
              marginTop: Sizes.fixPadding,
            }}
          >
            {item.bookName}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.grayColor12Medium,
              marginVertical: Sizes.fixPadding - 5.0,
            }}
          >
            {item.bookDesc}
          </Text>
          <Text style={{ ...Fonts.blackColor16SemiBold }}>
            {item.bookAmount}$
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        horizontal
        data={nearbyBookChangableList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingLeft: Sizes.fixPadding * 2.0,
          paddingBottom: Sizes.fixPadding + 5.0,
        }}
        showsHorizontalScrollIndicator={false}
      />
    );
  }

  function title({ title }) {
    return (
      <Text
        style={{
          ...Fonts.blackColor18SemiBold,
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding - 5.0,
        }}
      >
        {title}
      </Text>
    );
  }

  function buyAndRentButton() {
    return (
      <View style={styles.buyAndRentButtonContainerStyle}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => updateState({ isBuy: true })}
          style={{
            ...styles.buyAndRentButtonStyle,
            backgroundColor: isBuy ? Colors.primaryColor : Colors.whiteColor,
            borderColor: isBuy ? null : Colors.primaryColor,
            borderWidth: isBuy ? 0.0 : 1.0,
          }}
        >
          <Text
            style={
              isBuy
                ? { ...Fonts.whiteColor16Bold }
                : { ...Fonts.primaryColor16Medium }
            }
          >
            Buy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => updateState({ isBuy: false })}
          style={{
            ...styles.buyAndRentButtonStyle,
            backgroundColor: isBuy ? Colors.whiteColor : Colors.primaryColor,
            borderColor: isBuy ? Colors.primaryColor : null,
            borderWidth: isBuy ? 1.0 : 0.0,
          }}
        >
          <Text
            style={
              isBuy
                ? { ...Fonts.primaryColor16Medium }
                : { ...Fonts.whiteColor16Bold }
            }
          >
            Rent
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerStyle}>
        <View style={styles.headerContentStyle}>
          <Text style={{ ...Fonts.primaryColor18Bold }}>BookSmart</Text>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons
              name="search"
              size={24}
              color={Colors.primaryColor}
              onPress={() => navigation.push("Search")}
            />
            <MaterialIcons
              name="notifications"
              size={24}
              color={Colors.primaryColor}
              style={{ marginLeft: Sizes.fixPadding + 5.0 }}
              onPress={() => navigation.push("Notification")}
            />
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerStyle: {
    height: 60.0,
    elevation: 5.0,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "center",
    ...CommonStyles.shadow,
  },
  headerContentStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buyAndRentButtonContainerStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Sizes.fixPadding * 2.0,
  },
  buyAndRentButtonStyle: {
    flex: 0.47,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 3.0,
    alignItems: "center",
    justifyContent: "center",
  },
  addToFavouriteContainerStyle: {
    width: 30.0,
    height: 30.0,
    borderRadius: 15.0,
    position: "absolute",
    right: 10.0,
    top: 10.0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  nearByBookImageStyle: {
    width: 160.0,
    height: 210.0,
    borderTopLeftRadius: Sizes.fixPadding + 5.0,
    borderTopRightRadius: Sizes.fixPadding + 5.0,
  },
  nearByBookContentStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 4.0,
    width: 160.0,
    height: 310.0,
    borderRadius: Sizes.fixPadding + 5.0,
    marginRight: Sizes.fixPadding * 2.0,
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
});

export default HomeScreen;
