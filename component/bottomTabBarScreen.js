import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet, BackHandler, Text, Platform } from "react-native";
import ChatScreen from "../screens/chat/chatScreen";
import HomeScreen from "../screens/home/homeScreen";
import SettingScreen from "../screens/setting/settingScreen";
import ShortlistScreen from "../screens/shortlist/shortlistScreen";
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from "../constant/styles";
import { useFocusEffect } from "@react-navigation/native";
import MyStatusBar from "./myStatusBar";

const BottomTabBarScreen = ({ navigation }) => {

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
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        currentIndex: 1,
        backClickCount: 0
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { currentIndex, backClickCount } = state;

    return (
        <View style={{ flex: 1 }}>
            <MyStatusBar />
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                {currentIndex == 1 ?
                    <HomeScreen navigation={navigation} /> :
                    currentIndex == 2 ?
                        <ChatScreen navigation={navigation} /> :
                        currentIndex == 3 ?
                            <ShortlistScreen navigation={navigation} /> :
                            <SettingScreen navigation={navigation} />
                }
                <View style={styles.bottomTabBarStyle}>
                    {bottomTabBarItem({
                        index: 1,
                        iconName: "home",
                    })}
                    {bottomTabBarItem({
                        index: 2,
                        iconName: "chat",
                    })}
                    {bottomTabBarItem({
                        index: 3,
                        iconName: "favorite",
                    })}
                    {bottomTabBarItem({
                        index: 4,
                        iconName: "settings",
                    })}
                </View>
            </View>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor12Regular }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </View>
    )

    function bottomTabBarItem({ index, iconName }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={currentIndex == index ? styles.bottomTabSelectedIconStyle : null}
                onPress={() => updateState({ currentIndex: index })}
            >
                <MaterialIcons name={iconName} size={24} color={Colors.primaryColor} />
            </TouchableOpacity>
        )
    }
}

export default BottomTabBarScreen;

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 60.0,
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30.0,
        borderTopColor: 'rgba(128, 128, 128, 0.2)',
        borderTopWidth: 1.0,
        elevation: 2.0
    },
    bottomTabSelectedIconStyle: {
        height: 40.0,
        width: 40.0,
        borderRadius: 20.0,
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 40,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
})



