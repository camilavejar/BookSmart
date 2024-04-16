import React, { useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import MyStatusBar from "../../component/myStatusBar";

const EditProfileScreen = ({ navigation }) => {

    const [state, setState] = useState({
        name: 'Stella French',
        email: 'stella@abc.com',
        password: '123456',
        phoneNumber: '1234567890',
        showBottomSheet: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        name,
        email,
        password,
        phoneNumber,
        showBottomSheet,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    automaticallyAdjustKeyboardInsets={true}
                    showsVerticalScrollIndicator={false}
                >
                    {changeProfilePhoto()}
                    {nameTextField()}
                    {emailTextField()}
                    {phoneNumberTextField()}
                    {passwordTextField()}
                    {saveButton()}
                </ScrollView>
            </View>
            {changeProfileOptions()}
        </View>
    )

    function changeProfileOptions() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showBottomSheet}
                onRequestClose={() => {
                    updateState({ showBottomSheet: false })
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        updateState({ showBottomSheet: false })
                    }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View
                        behavior="height"
                        style={{ justifyContent: "flex-end", flex: 1 }}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={styles.sheetWrapper}
                        >
                            <View style={styles.bottomSheetContentStyle}>
                                <Text style={{ ...Fonts.blackColor18Bold, textAlign: 'center' }}>
                                    Choose Option
                                </Text>

                                <View style={{
                                    backgroundColor: '#CFC6C6', height: 1.0,
                                    marginBottom: Sizes.fixPadding + 2.0,
                                    marginTop: Sizes.fixPadding - 5.0,
                                }}>

                                </View>

                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => updateState({ showBottomSheet: false })}
                                    style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding * 2.0 }}>
                                    <MaterialIcons name="photo-camera" size={24} color={Colors.blackColor} />
                                    <Text style={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding }}>
                                        Camera
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => updateState({ showBottomSheet: false })}
                                    style={{ flexDirection: 'row', marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                                    <MaterialIcons name="photo-album" size={22} color={Colors.blackColor} />
                                    <Text style={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding }}>
                                        Choose from gallery
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

        )
    }

    function saveButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.saveButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Medium }}>Save</Text>
            </TouchableOpacity>
        )
    }

    function phoneNumberTextField() {
        return (
            <TextInput
                label="Phone Number"
                mode="outlined"
                value={phoneNumber}
                onChangeText={text => updateState({ phoneNumber: text })}
                style={styles.textfieldStyle}
                cursorColor={Colors.primaryColor}
                keyboardType="phone-pad"
                activeOutlineColor={Colors.primaryColor}
            />
        )
    }

    function passwordTextField() {
        return (
            <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry={true}
                value={password}
                onChangeText={text => updateState({ password: text })}
                style={styles.textfieldStyle}
                cursorColor={Colors.primaryColor}
                activeOutlineColor={Colors.primaryColor}
            />
        )
    }

    function emailTextField() {
        return (
            <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={text => updateState({ email: text })}
                style={styles.textfieldStyle}
                cursorColor={Colors.primaryColor}
                keyboardType="email-address"
                activeOutlineColor={Colors.primaryColor}
            />
        )
    }

    function nameTextField() {
        return (
            <TextInput
                label="Name"
                mode="outlined"
                value={name}
                onChangeText={text => updateState({ name: text })}
                style={styles.textfieldStyle}
                cursorColor={Colors.primaryColor}
                activeOutlineColor={Colors.primaryColor}
            />
        )
    }

    function changeProfilePhoto() {
        return (
            <View style={{
                alignSelf: 'center',
                marginTop: Sizes.fixPadding * 3.0,
                marginBottom: Sizes.fixPadding + 5.0
            }}>
                <Image
                    source={require('../../assets/images/user/user_5.jpg')}
                    style={{ height: 100.0, width: 100.0, borderRadius: 50.0, }}
                    resizeMode="cover"
                />
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ showBottomSheet: true })}
                    style={styles.changeInfoContentStyle}>
                    <MaterialIcons name="photo-camera" size={17} color={Colors.whiteColor} />
                    <Text style={{ ...Fonts.whiteColor12Regular, marginLeft: Sizes.fixPadding - 5.0 }}>
                        Change
                    </Text>
                </TouchableOpacity>
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
                    Edit Profile
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
    saveButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding + 5.0
    },
    bottomSheetContentStyle: {
        backgroundColor: Colors.whiteColor,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingBottom: Sizes.fixPadding,
    },
    changeInfoContentStyle: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0.0,
        backgroundColor: '#FF8C00',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 6.0,
        alignItems: 'center',
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
    },
    textfieldStyle: {
        ...Fonts.blackColor14Medium,
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        marginVertical: Sizes.fixPadding - 3.0
    }
})

export default EditProfileScreen;