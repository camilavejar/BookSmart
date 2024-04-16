import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { LogBox } from "react-native";
import BottomTabBarScreen from "./component/bottomTabBarScreen";
import AddNewListingScreen from "./screens/addNewListing/addNewListingScreen";
import LoginScreen from "./screens/auth/loginScreen";
import VerificationScreen from "./screens/auth/verificationScreen";
import EditProfileScreen from "./screens/editProfile/editProfileScreen";
import ImageFullViewScreen from "./screens/imageFullView/imageFullViewScreen";
import MessageScreen from "./screens/message/messageScreen";
import MyListingScreen from "./screens/myListing/myListingScreen";
import NotificationScreen from "./screens/notification/notificationScreen";
import PrivacyPolicyScreen from "./screens/privacyPolicy/privacyPolicyScreen";
import BookScreen from "./screens/book/bookScreen";
import SearchScreen from "./screens/search/searchScreen";
import SplashScreen from "./screens/splashScreen";
import SupportScreen from "./screens/support/supportScreen";
import TermsOfUseScreen from "./screens/termsOfUse/termsOfUseScreen";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

ExpoSplashScreen.preventAutoHideAsync();

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins_Bold: require("./assets/fonts/Poppins-Bold.ttf"),
    Poppins_Medium: require("./assets/fonts/Poppins-Medium.ttf"),
    Poppins_Regular: require("./assets/fonts/Poppins-Regular.ttf"),
    Poppins_SemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  onLayoutRootView();

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ ...TransitionPresets.DefaultTransition }}
          />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen
            name="BottomBar"
            component={BottomTabBarScreen}
            options={{ ...TransitionPresets.DefaultTransition }}
          />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="Book" component={BookScreen} />
          <Stack.Screen
            name="ImageFullView"
            component={ImageFullViewScreen}
            options={{ ...TransitionPresets.ScaleFromCenterAndroid }}
          />
          <Stack.Screen name="Message" component={MessageScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="AddNewListing" component={AddNewListingScreen} />
          <Stack.Screen name="MyListing" component={MyListingScreen} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
          <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
          <Stack.Screen name="Support" component={SupportScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
