import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import MyStatusBar from "../../component/myStatusBar";

const recentSearchesList = [
  {
    id: "1",
    searchText: "Software Engineering",
  },
  {
    id: "2",
    searchText: "SOEN 390 Textbook",
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
    bookImage: require("../../assets/images/book/book_3.jpg"),
    bookName: "Software Architecture",
    bookDesc: "Modern Trade-Off Analyses for Distributed Architectures",
    bookAmount: "13.99",
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
];

const SearchScreen = ({ navigation }) => {
  const [state, setState] = useState({
    isSearch: false,
    featuredBookChangableList: featuredBookList,
    showSnackBar: false,
    isInWishList: false,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { isSearch, featuredBookChangableList, showSnackBar, isInWishList } =
    state;

  const renderItem = ({ item }) => (
    <View
      style={{
        ...styles.featuredBookContentStyle,
        marginTop: item.id == "1" ? Sizes.fixPadding - 5.0 : 0.0,
      }}
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
        <View style={{ width: "72%" }}>
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
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {backArrow()}
        <FlatList
          ListHeaderComponent={
            <>
              {searchTextField()}
              {title({ title: "Your recent searches" })}
              {recentSearches()}
              {title({ title: "Featured Books" })}
            </>
          }
          data={featuredBookChangableList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        />
        <Snackbar
          style={styles.snackBarStyle}
          visible={showSnackBar}
          onDismiss={() => updateState({ showSnackBar: false })}
        >
          {isInWishList ? "Removed from shortlist" : "Added to shortlist"}
        </Snackbar>
      </View>
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

  function recentSearches() {
    const renderItem = ({ item }) => (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: Sizes.fixPadding - 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <MaterialIcons name="history" size={23} color={Colors.grayColor} />
        <Text
          style={{
            ...Fonts.blackColor14Regular,
            marginLeft: Sizes.fixPadding - 3.0,
          }}
        >
          {item.searchText}
        </Text>
      </View>
    );
    return (
      <View>
        <FlatList
          data={recentSearchesList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          scrollEnabled={false}
          contentContainerStyle={{
            paddingTop: Sizes.fixPadding - 5.0,
            paddingBottom: Sizes.fixPadding,
          }}
        />
      </View>
    );
  }

  function title({ title }) {
    return (
      <Text
        style={{
          ...Fonts.blackColor16SemiBold,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        {title}
      </Text>
    );
  }

  function searchTextField() {
    return (
      <View style={styles.searchFieldStyle}>
        <MaterialIcons
          name="search"
          size={24}
          color={isSearch ? Colors.primaryColor : Colors.grayColor}
        />
        <TextInput
          placeholder="Search for Books"
          style={{
            flex: 1,
            ...Fonts.grayColor14Medium,
            marginLeft: Sizes.fixPadding,
            paddingTop: 2.0,
          }}
          selectionColor={Colors.primaryColor}
          onFocus={() => updateState({ isSearch: true })}
          onBlur={() => updateState({ isSearch: false })}
        />
      </View>
    );
  }

  function backArrow() {
    return (
      <MaterialIcons
        name="arrow-back"
        size={24}
        color="black"
        onPress={() => navigation.pop()}
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding,
        }}
      />
    );
  }
};

const styles = StyleSheet.create({
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
  searchFieldStyle: {
    flexDirection: "row",
    alignItems: "center",
    height: 37.0,
    backgroundColor: "rgba(128, 128, 128, 0.25)",
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  featuredBookContentStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    elevation: 3.0,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 5.0,
  },
  featuredBookImageStyle: {
    borderTopLeftRadius: Sizes.fixPadding,
    borderTopRightRadius: Sizes.fixPadding,
    width: "100%",
    height: 220.0,
  },
  featuredBookInfoContentStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: Sizes.fixPadding,
    marginRight: Sizes.fixPadding + 5.0,
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
    bottom: -10.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: "#333333",
  },
});

export default SearchScreen;
