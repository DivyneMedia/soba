import React from "react";
import { createNativeStackNavigator, NativeStackHeaderProps } from '@react-navigation/native-stack'

import LoginScreen from "../screens/LoginScreen";
import SelectRegionScreen from "../screens/SelectRegionScreen";
import SelectChapterScreen from "../screens/SelectChapterScreen";
import FetchMatriculationDetailsScreen from "../screens/FetchMatriculationDetailsScreen";
import EnterContactInformationScreen from "../screens/EnterContactInformationScreen";
import OTPScreen from "../screens/OTPScreen";
import ConfirmRegistrationScreen from "../screens/ConfirmRegistration";
import images from "../assets/images";
import colors from "../constants/colors";
import { Image, Pressable, View } from "react-native";

const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
    return (
        <Stack.Navigator
          initialRouteName="login"
          screenOptions={{
            headerShown: false
          }}
        >
            <Stack.Screen
              name="login"
              component={LoginScreen}
            />
            <Stack.Screen
              name="selectRegion"
              component={SelectRegionScreen}
            />
            <Stack.Screen
              name="selectChapter"
              component={SelectChapterScreen}
            />
            <Stack.Screen
              name="fetchMatriculationDetails"
              component={FetchMatriculationDetailsScreen}
            />
            <Stack.Screen
              name="enterContactInformation"
              component={EnterContactInformationScreen}
            />
            <Stack.Screen
              name="otpScreen"
              component={OTPScreen}
            />
            <Stack.Screen
              name="confirmRegistration"
              component={ConfirmRegistrationScreen}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigator;
