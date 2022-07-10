import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from "./BottomTabNavigator";
import EditProfileScreen from "../screens/EditProfileScreen";
import ChattingScreen from "../screens/ChattingScreen";
import DonationDetailsScreen from "../screens/DonationDetailsScreen";
import DetailsScreen from "../screens/DetailsScreen";
import ExecutivesScreen from "../screens/ExecutivesScreen";
import { LoaderContext } from "../context/LoaderContextProvider";

const Stack = createNativeStackNavigator()

const MainNavigator = () => {
  const loaderContext = useContext(LoaderContext)

  useEffect(() => {
    loaderContext.toggleLoader(false)
  }, [loaderContext])

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
        name="detailsScreen"
        component={DetailsScreen}
        options={{
          headerShown: true,
          headerTitle: "Details"
        }}
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
      <Stack.Screen
        name="executives"
        component={ExecutivesScreen}
        options={{
          headerShown: true,
          headerTitle: 'Executives'
        }}
      />
    </Stack.Navigator>
  )
}

export default MainNavigator;
