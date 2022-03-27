import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from "../screens/LoginScreen";
import SelectRegionScreen from "../screens/SelectRegionScreen";
import SelectChapterScreen from "../screens/SelectChapterScreen";
import FetchMatriculationDetailsScreen from "../screens/FetchMatriculationDetailsScreen";
import EnterContactInformationScreen from "../screens/EnterContactInformationScreen";
import OTPScreen from "../screens/OTPScreen";
import ConfirmRegistrationScreen from "../screens/ConfirmRegistration";
import ChattingScreen from "../screens/ChattingScreen";

const Stack = createNativeStackNavigator()

const AuthNavigator = (props: any) => {
  return (
      <Stack.Navigator
        initialRouteName={"login"}
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
        <Stack.Screen
          name="chattingScreen"
          component={ChattingScreen}
          options={{
            headerShown: true,
            headerTitle: 'Chat',
          }}
        />
    </Stack.Navigator>
  )
}

export default AuthNavigator;
