import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from "./BottomTabNavigator";

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
        </Stack.Navigator>
    )
}

export default MainNavigator;
