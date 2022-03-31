import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import { useDispatch } from 'react-redux'
import BoldText from '../components/BoldText'
import ChatRequestsScreen from '../screens/ChatRequestsScreen'
import ChatScreen from '../screens/ChatScreen'
import ChattingScreen from '../screens/ChattingScreen'
import { logout } from '../store/actions/AuthActions'
import { promiseAlertHandler } from '../utils/AlertHandler'

const Stack = createNativeStackNavigator()

const AdminNavigator = (props: any) => {
    const dispatch = useDispatch()

    const logoutHandler = useCallback(async () => {
        const alertRes = await promiseAlertHandler(
            "Are you sure?",
            "You are about to logout.",
            [
                {
                    buttonReturnValue: true,
                    buttonText: "OK",
                    buttonType: 'destructive'
                },
                {
                    buttonReturnValue: false,
                    buttonText: "CANCEL",
                    buttonType: 'cancel'
                },
            ]
        )
        if (alertRes) {
            await dispatch(logout())
        }
    }, [dispatch])
    
    return (
        <Stack.Navigator
            initialRouteName={"chat"}
        >
            <Stack.Screen
                name="chat"
                component={ChatScreen}
                options={{
                    headerTitle: "Admin",
                    headerRight: () => {
                        return (
                            <Pressable
                                onPress={logoutHandler}
                            >
                                <BoldText style={{ fontSize: 12 }}>{"LOGOUT"}</BoldText>
                            </Pressable>
                        )
                    }
                }}
            />
            <Stack.Screen
                name="chatRequestsScreen"
                component={ChatRequestsScreen}
                options={{
                    headerTitle: "Chat Requests",
                }}
            />
            <Stack.Screen
                name="chattingScreen"
                component={ChattingScreen}
            />
        </Stack.Navigator>
    )
}

export default AdminNavigator
