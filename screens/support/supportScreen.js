import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import { Fonts, Colors, Sizes, CommonStyles } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import MyStatusBar from "../../component/myStatusBar";

const SupportScreen = ({ navigation }) => {

    const [state, setState] = useState({
        name: '',
        email: '',
        support: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        name,
        email,
        support,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    automaticallyAdjustKeyboardInsets={true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
                >
                    {nameTextField()}
                    {emailTextField()}
                    {supportTextField()}
                    {submitButton()}
                </ScrollView>
            </View>
        </View>
    )

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.submitButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Submit
                </Text>
            </TouchableOpacity>
        )
    }

    function supportTextField() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 3.0, }}>
                <TextInput
                    placeholder="Write here"
                    multiline={true}
                    numberOfLines={6}
                    mode="outlined"
                    value={support}
                    onChangeText={text => updateState({ support: text })}
                    style={{
                        ...Fonts.blackColor14Medium,
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        backgroundColor: Colors.whiteColor,
                        height: Platform.OS == 'ios' ? 100 : null,
                        paddingTop: Platform.OS == 'ios' ? 0 : Sizes.fixPadding
                    }}
                    selectionColor={Colors.primaryColor}
                    theme={{ colors: { primary: Colors.primaryColor, underlineColor: 'transparent', } }}
                />
            </View>
        )
    }

    function emailTextField() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 3.0 }}>
                <TextInput
                    placeholder="Email"
                    mode="outlined"
                    value={email}
                    onChangeText={text => updateState({ email: text })}
                    style={{
                        ...Fonts.blackColor14Medium,
                        height: 50.0,
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        backgroundColor: Colors.whiteColor,
                    }}
                    selectionColor={Colors.primaryColor}
                    theme={{ colors: { primary: Colors.primaryColor, underlineColor: 'transparent', } }}
                    keyboardType="email-address"
                />
            </View>
        )
    }

    function nameTextField() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 3.0 }}>
                <TextInput
                    placeholder="Name"
                    mode="outlined"
                    value={name}
                    onChangeText={text => updateState({ name: text })}
                    style={{
                        ...Fonts.blackColor14Medium,
                        height: 50.0,
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        backgroundColor: Colors.whiteColor,
                    }}
                    selectionColor={Colors.primaryColor}
                    theme={{ colors: { primary: Colors.primaryColor, underlineColor: 'transparent' } }}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerContentStyle}>
                <MaterialIcons name="arrow-back" size={24}
                    color="black"
                    onPress={() => navigation.pop()}
                    style={{ position: 'absolute', left: 20.0, }}
                />
                <Text style={{
                    ...Fonts.blackColor18Bold,
                    alignSelf: 'center',
                    justifyContent: 'center'
                }}>
                    Support
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 10.0,
        ...CommonStyles.shadow
    },
    submitButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding + 5.0
    }
})

export default SupportScreen;