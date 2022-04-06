import React, { useCallback } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ChattingScreen from "../screens/ChattingScreen";
import ChatScreen from "../screens/ChatScreen";
import { Image, Pressable } from "react-native";
import images from "../assets/images";
import { promiseAlertHandler } from "../utils/AlertHandler";
import { useDispatch } from "react-redux";
import { logout } from '../store/actions/AuthActions'
import AccApproveRequest from "../screens/AccApproveRequest";
import RegularText from "../components/RegularText";

const Stack = createNativeStackNavigator()

const HeaderLogoutButton = (props: any) => {
  const { onLogout } = props

  return (
    <Pressable style={{ padding: 10, marginRight: -10 }} onPress={onLogout}>
      <Image
        source={images.ic_logout}
        style={{ height: 18, width: 18 }}
      />
    </Pressable>
  )
}

const UserAccountApproveNavigator = (props: any) => {
    // **Redux Hooks
    const dispatch = useDispatch()

    const logoutHandler = useCallback(async () => {
      const actionRes = await promiseAlertHandler(
        "Are you sure ?",
        "You are about to logout from the app.",
        [
          {
            buttonType: "default",
            buttonText: "CANCEL",
            buttonReturnValue: false
          },
          {
            buttonType: "destructive",
            buttonText: "OK",
            buttonReturnValue: true
          }
        ]
      )

      if (actionRes) {
        await dispatch(logout())
      }
    }, [])

    return (
        <Stack.Navigator
          initialRouteName={"accApproveRequest"}
        >
          <Stack.Screen
            name="accApproveRequest"
            component={AccApproveRequest}
            options={{
              headerTitle: 'Approve Request',
              headerRight: () => <HeaderLogoutButton onLogout={logoutHandler} />
            }}
          />
          <Stack.Screen
            name="chatScreen"
            component={ChatScreen}
            options={{
              headerTitle: 'Approve Request',
              headerRight: () => <HeaderLogoutButton onLogout={logoutHandler} />
            }}
          />
          <Stack.Screen
            name="chattingScreen"
            component={ChattingScreen}
            options={{
              headerTitle: 'Chat'
            }}
            initialParams={{
              showApproveBtn: true
            }}
          />
        </Stack.Navigator>
    )
}

export default UserAccountApproveNavigator;
