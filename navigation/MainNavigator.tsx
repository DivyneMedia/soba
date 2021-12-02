import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from "./BottomTabNavigator";
import EditProfileScreen from "../screens/EditProfileScreen";
import ChattingScreen from "../screens/ChattingScreen";
import DonationDetailsScreen from "../screens/DonationDetailsScreen";

const Stack = createNativeStackNavigator()

const MainNavigator = () => {
    return (
        <Stack.Navigator
          initialRouteName="bottomTab"
          screenOptions={{
            headerShown: false
          }}
        >
            <Stack.Screen
              name="bottomTab"
              component={BottomTabNavigator}
            />
            <Stack.Screen
              name="editProfile"
              component={EditProfileScreen}
            />
            <Stack.Screen
              name="chattingScreen"
              component={ChattingScreen}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="donationDetails"
              component={DonationDetailsScreen}
              options={{
                headerShown: true,
                headerTitle: "Dontion Details"
              }}
            />
        </Stack.Navigator>
    )
}

export default MainNavigator;
