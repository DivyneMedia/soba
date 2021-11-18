import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text } from 'react-native'
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator()

function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }

function DetailsScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="login" component={LoginScreen} />
            {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
        </Stack.Navigator>
    )
}

export default AuthNavigator;
