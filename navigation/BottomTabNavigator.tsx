import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Pressable } from "react-native";
import { SvgUri } from 'react-native-svg';
import images from "../assets/images";
import { Icon, iconNames } from "../assets/svg";
import BoldText from "../components/BoldText";
import appConstants from "../constants/appConstants";
import AccountScreen from "../screens/AccountScreen";
import ChatScreen from "../screens/ChatScreen";
import GiftCardScreen from "../screens/GiftCardScreen";
import HomeScreen from "../screens/HomeScreen";
import VideoLibraryScreen from "../screens/VideoLibraryScreen";

const Tab = createBottomTabNavigator()

type BottomTabNavigatorProps = {

}

const BottomTabNavigator = (props: BottomTabNavigatorProps) => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen
                name="home"
                component={HomeScreen}
                options={{
                    tabBarShowLabel: false
                }}
                // options={(props: BottomTabNavigatorProps) => {
                //     return {
                //         tabBarButton: (props) => {
                //             return (
                //                 <Icon
                //                     iconName={iconNames.ic_tab_home_active}
                //                     style={{
                //                         height: 24,
                //                         width: 24
                //                     }}
                //                 />
                //             )
                //         }
                //     }
                // }}
            />
            <Tab.Screen
                name="chat"
                component={ChatScreen}
                options={{
                    tabBarShowLabel: false
                }}
                // options={(props: BottomTabNavigatorProps) => {
                //     return {
                //         tabBarButton: (props) => {
                //             return (
                //                 <Icon
                //                     iconName={iconNames.ic_tab_home_active}
                //                     style={{
                //                         height: 24,
                //                         width: 24
                //                     }}
                //                 />
                //             )
                //         }
                //     }
                // }}
            />
            <Tab.Screen
                name="videoLibrary"
                component={VideoLibraryScreen}
                options={{
                    tabBarShowLabel: false
                }}
                // options={(props: BottomTabNavigatorProps) => {
                //     return {
                //         tabBarButton: (props) => {
                //             return (
                //                 <Icon
                //                     iconName={iconNames.ic_tab_home_active}
                //                     style={{
                //                         height: 24,
                //                         width: 24
                //                     }}
                //                 />
                //             )
                //         }
                //     }
                // }}
            />
            <Tab.Screen
                name="giftCard"
                component={GiftCardScreen}
                options={{
                    tabBarShowLabel: false
                }}
                // options={(props: BottomTabNavigatorProps) => {
                //     return {
                //         tabBarButton: (props) => {
                //             return (
                //                 <Icon
                //                     iconName={iconNames.ic_tab_home_active}
                //                     style={{
                //                         height: 24,
                //                         width: 24
                //                     }}
                //                 />
                //             )
                //         }
                //     }
                // }}
            />
            <Tab.Screen
                name="account"
                component={AccountScreen}
                options={{
                    tabBarShowLabel: false
                }}
                // options={(props: BottomTabNavigatorProps) => {
                //     return {
                //         tabBarButton: (props) => {
                //             return (
                //                 <Icon
                //                     iconName={iconNames.ic_tab_home_active}
                //                     style={{
                //                         height: 24,
                //                         width: 24
                //                     }}
                //                 />
                //             )
                //         }
                //     }
                // }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator;