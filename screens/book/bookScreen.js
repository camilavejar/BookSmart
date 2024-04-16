import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import GoogleMap from "../../component/googleMapScreen";
import { Snackbar } from "react-native-paper";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import CollapsibleToolbar from "react-native-collapsible-toolbar";
import MyStatusBar from "../../component/myStatusBar";

const classesList = [
  {
    id: "1",
    place: "Needed for Classes",
    isExpandable: false,
    more: [
      {
        id: "1",
        name: "System Design",
        acronym: "SOEN 357 | 3.0 credits",
      },
      {
        id: "2",
        name: "Introduction to Java",
        acronym: "SOEN 331 | 3.0 credits",
      },
    ],
  },
  {
    id: "2",
    place: "Prerequisites",
    isExpandable: false,
    more: [
      {
        id: "1",
        name: "Data Structures",
        acronym: "SOEN 352 | 3.0 credits",
      },
    ],
  },
];

const bookGuaranteesList = [
  {
    id: "1",
    guarantees: "High quality",
  },
  {
    id: "2",
    guarantees: "Good as new",
  },
  {
    id: "3",
    guarantees: "Free delivery",
  },
  {
    id: "4",
    guarantees: "Easy returns",
  },
  {
    id: "5",
    guarantees: "100% refundable",
  },
  {
    id: "6",
    guarantees: "Secure payment",
  },
];

const BookScreen = ({ navigation, route }) => {
  const [state, setState] = useState({
    expanded: false,
    nearestPlacesChangableList: classesList,
    showSnackBar: false,
    isInWishList: false,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { expanded, nearestPlacesChangableList, showSnackBar, isInWishList } =
    state;

  const bookImage = route.params.bookImage;
  const bookName = route.params.bookName;
  const bookDesc = route.params.bookDesc;
  const bookAmount = route.params.bookAmount;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <CollapsibleToolbar
        renderContent={() => (
          <View style={{ paddingBottom: Sizes.fixPadding * 8.0 }}>
            {bookInfo()}
            {title({ title: "Description" })}
            {dummyText()}
            {title({ title: "Location" })}
            {mapInfo()}
            {title({ title: "Guarantees" })}
            {guarantees()}
            {nearestPlaces()}
          </View>
        )}
        renderNavBar={() => (
          <View style={styles.headerWrapper}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={Colors.blackColor}
              onPress={() => navigation.pop()}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                onPress={() =>
                  updateState({
                    showSnackBar: true,
                    isInWishList: !isInWishList,
                  })
                }
                name={isInWishList ? "favorite" : "favorite-border"}
                size={24}
                color={Colors.whiteColor}
              />
              <MaterialIcons
                name="share"
                size={24}
                color={Colors.whiteColor}
                style={{ marginLeft: Sizes.fixPadding }}
              />
            </View>
          </View>
        )}
        renderToolBar={() => (
          <Image
            source={bookImage}
            style={{
              width: "80%%",
              height: 400,
              borderBottomLeftRadius: Sizes.fixPadding * 2.0,
              borderBottomRightRadius: Sizes.fixPadding * 2.0,
              marginHorizontal: "10%",
            }}
          />
        )}
        collapsedNavBarBackgroundColor={Colors.primaryColor}
        toolBarHeight={350}
        showsVerticalScrollIndicator={false}
      />
      {contactOwnerInfo()}
      <Snackbar
        style={styles.snackBarStyle}
        visible={showSnackBar}
        elevation={0.0}
        onDismiss={() => updateState({ showSnackBar: false })}
      >
        {isInWishList ? "Added to shortlist" : "Removed from shortlist"}
      </Snackbar>
    </View>
  );

  function contactOwnerInfo() {
    return (
      <View style={styles.ownerInfoContentStyle}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/user/user_7.jpg")}
              style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
            />
            <View style={{ marginLeft: Sizes.fixPadding }}>
              <Text style={{ ...Fonts.blackColor16Bold }}>John Smith</Text>
              <Text style={{ ...Fonts.grayColor14Medium }}>Owner</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.push("Message", { name: "John Smith" })}
            style={styles.ownerContactContentStyle}
          >
            <Text style={{ ...Fonts.whiteColor14SemiBold }}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function handleNearestPlacesUpdate({ id, isExpanded }) {
    const newList = nearestPlacesChangableList.map((book) => {
      if (book.id === id) {
        const updatedItem = { ...book, isExpandable: isExpanded };
        return updatedItem;
      }
      return book;
    });
    updateState({ nearestPlacesChangableList: newList });
  }

  function nearestPlaces() {
    return (
      <View>
        {nearestPlacesChangableList.map((item) => (
          <View
            key={item.id}
            style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}
          >
            <Collapse
              onToggle={(isExpanded) =>
                handleNearestPlacesUpdate({ id: item.id, isExpanded })
              }
            >
              <CollapseHeader>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: Sizes.fixPadding - 8.0,
                  }}
                >
                  <Text style={{ ...Fonts.blackColor14Bold }}>
                    {item.place}({item.more.length})
                  </Text>
                  <MaterialIcons
                    name={
                      item.isExpandable
                        ? "keyboard-arrow-up"
                        : "keyboard-arrow-down"
                    }
                    size={24}
                    color={Colors.primaryColor}
                  />
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={{ marginVertical: Sizes.fixPadding - 5.0 }}>
                  {item.more.map((item) => (
                    <View
                      key={item.id}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: Sizes.fixPadding - 7.0,
                      }}
                    >
                      <Text style={{ ...Fonts.grayColor12Medium }}>
                        {item.name}
                      </Text>
                      <Text style={{ ...Fonts.grayColor12Medium }}>
                        {item.acronym}
                      </Text>
                    </View>
                  ))}
                </View>
              </CollapseBody>
            </Collapse>
          </View>
        ))}
      </View>
    );
  }

  function guarantees() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding - 8.0,
          paddingBottom: Sizes.fixPadding - 5.0,
        }}
      >
        {bookGuaranteesList.map((item) => (
          <View key={item.id}>
            <View style={styles.guaranteesContentStyle}>
              <MaterialIcons
                name="check-circle"
                size={20}
                color={Colors.primaryColor}
              />
              <Text
                style={{
                  ...Fonts.blackColor14Regular,
                  marginLeft: 2.0,
                  marginTop: 1.5,
                }}
              >
                {item.guarantees}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  }

  function mapInfo() {
    return (
      <View style={styles.mapStyle}>
        <GoogleMap
          latitude={45.508888}
          longitude={-73.561668}
          height={150}
          pinColor={Colors.primaryColor}
        />
      </View>
    );
  }

  function dummyText() {
    return (
      <Text
        style={{
          ...Fonts.blackColor12Regular,
          marginHorizontal: Sizes.fixPadding * 2.0,
          textAlign: "justify",
        }}
      >
        Dive into the essential principles of a diverse range of subjects with
        our comprehensive textbook, 'Foundations of Knowledge.' Whether you're
        embarking on your academic journey or seeking to expand your horizons,
        this textbook serves as your indispensable companion. Crafted by
        seasoned scholars, each chapter delves into fundamental concepts,
        offering lucid explanations and practical insights to enrich your
        understanding.
      </Text>
    );
  }

  function title({ title }) {
    return (
      <Text
        style={{
          ...Fonts.blackColor18Bold,
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding,
        }}
      >
        {title}
      </Text>
    );
  }

  function bookInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{ ...Fonts.blackColor18Bold, marginTop: Sizes.fixPadding }}
        >
          {bookName}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: Sizes.fixPadding,
          }}
        >
          <View>
            <Text style={{ ...Fonts.grayColor14Medium }}>{bookDesc}</Text>
            <Text style={{ ...Fonts.blackColor14SemiBold }}>TextBook</Text>
          </View>
          <View style={styles.bookAmountContentStyle}>
            <Text style={{ ...Fonts.blackColor16SemiBold }}>{bookAmount}$</Text>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  bookAmountContentStyle: {
    borderWidth: 1.0,
    alignItems: "center",
    height: 34.0,
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    borderColor: "rgba(128, 128, 128, 0.5)",
  },
  mapStyle: {
    borderRadius: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding - 5.0,
    overflow: "hidden",
    elevation: 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  guaranteesContentStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Sizes.fixPadding - 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  ownerInfoContentStyle: {
    position: "absolute",
    bottom: 0.0,
    height: 70.0,
    backgroundColor: Colors.whiteColor,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    borderTopColor: "rgba(128, 128, 128, 0.2)",
    borderTopWidth: 1.0,
    elevation: 2.0,
  },
  ownerContactContentStyle: {
    height: 31.0,
    width: 78.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
  },
  snackBarStyle: {
    position: "absolute",
    bottom: 60.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: "#333333",
    elevation: 0.0,
  },
  headerWrapper: {
    marginHorizontal: Sizes.fixPadding * 1.5,
    marginVertical: Platform.OS == "ios" ? 0 : Sizes.fixPadding * 1.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default BookScreen;
