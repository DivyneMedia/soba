import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, ImageRequireSource, Pressable } from "react-native";
import images from "../assets/images";
import colors from "../constants/colors";
import AccountScreen from "../screens/AccountScreen";
import ChatScreen from "../screens/ChatScreen";
import GiftCardScreen from "../screens/GiftCardScreen";
import HomeScreen from "../screens/HomeScreen";
import VideoLibraryScreen from "../screens/VideoLibraryScreen";
import { width } from "../utils/MiscUtils";

const Tab = createBottomTabNavigator()

type TabBarIconProps = {
    focused: boolean
    activeIcon: ImageRequireSource
    inActiveIcon: ImageRequireSource
}

const TabBarIcon = (props: TabBarIconProps) => {
    const { focused, activeIcon, inActiveIcon } = props
    return (
        <Image
            source={focused ? activeIcon : inActiveIcon}
            style={{ height: 21, width: 21 }}
            resizeMode="contain"
        />
    )
}

type TabBarButtonProps = {
    activeIcon: any
    focused: boolean
    inActiveIcon: any
    onPress: () => any
}

const TabBarButton = (props: TabBarButtonProps) => {
    const {
      activeIcon,
      focused,
      inActiveIcon,
      onPress
    } = props
    
    return (
      <Pressable
        onPress={onPress}
        style={{
            marginVertical: 5,
          flex: 1,
        //   padding: 2,
          width: width / 5,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: focused ? colors.primary : colors.white,
          borderRadius: 30,
        }}
      >
        <TabBarIcon focused={focused} activeIcon={activeIcon} inActiveIcon={inActiveIcon} />
      </Pressable>
    )
}
  

type BottomTabNavigatorProps = {
    navigation: any
    route: any
}

type PossibleScreens = 'home' | 'chat' | 'videoLibrary' | 'giftCard' | 'account'

const isTabFocused = (
    name: PossibleScreens,
    route: PossibleScreens
) => {
    return route.localeCompare(name) === 0
}

const getActiveRouteName = (route: any, tabName: number) => {
    return route.getState()?.index === tabName
    // const { key, name, params } = route
    // return name.locateCompare(tabName) === 0
}

const BottomTabNavigator = (props: BottomTabNavigatorProps) => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    paddingHorizontal: 10,
                }
            }}
        >
            <Tab.Screen
                name="home"
                component={HomeScreen}
                options={({ navigation, route }) => {
                    // const activeRouteName = getActiveRouteName(navigation, 'home')
                    const focused = getActiveRouteName(navigation, 0)
                    return {
                        tabBarButton: (props: any) => {
                            return (
                                <TabBarButton
                                    activeIcon={images.ic_home_selected}
                                    focused={focused}
                                    inActiveIcon={images.ic_home}
                                    onPress={navigation.navigate.bind(null, 'home')}
                                />
                            )
                        }
                    }
                }}
            />
            <Tab.Screen
                name="chat"
                component={ChatScreen}
                options={({ navigation, route }) => {
                    // const activeRouteName = getActiveRouteName(navigation.getState())
                    // const focused = isTabFocused(activeRouteName, 'home')
                    const focused = getActiveRouteName(navigation, 1)

                    return {
                        tabBarButton: (props: any) => {
                            return (
                                <TabBarButton
                                    activeIcon={images.ic_chat_selected}
                                    focused={focused}
                                    inActiveIcon={images.ic_chat}
                                    onPress={navigation.navigate.bind(null, 'chat')}
                                />
                            )
                        }
                    }
                }}
            />
            <Tab.Screen
                name="videoLibrary"
                component={VideoLibraryScreen}
                options={({ navigation, route }) => {
                    // const activeRouteName = getActiveRouteName(navigation.getState())
                    // const focused = isTabFocused(activeRouteName, 'home')
                    const focused = getActiveRouteName(navigation, 2)
                    return {
                        tabBarButton: (props: any) => {
                            return (
                                <TabBarButton
                                    activeIcon={images.ic_video_library_selected}
                                    focused={focused}
                                    inActiveIcon={images.ic_video_library}
                                    onPress={navigation.navigate.bind(null, 'videoLibrary')}
                                />
                            )
                        }
                    }
                }}
            />
            <Tab.Screen
                name="giftCard"
                component={GiftCardScreen}
                options={({ navigation, route }) => {
                    // const activeRouteName = getActiveRouteName(navigation.getState())
                    // const focused = isTabFocused(activeRouteName, 'home')
                    const focused = getActiveRouteName(navigation, 3)

                    return {
                        tabBarButton: (props) => {
                            return (
                                <TabBarButton
                                    activeIcon={images.ic_card_giftcard_selected}
                                    focused={focused}
                                    inActiveIcon={images.ic_card_giftcard}
                                    onPress={navigation.navigate.bind(null, 'giftCard')}
                                />
                            )
                        }
                    }
                }}
            />
            <Tab.Screen
                name="account"
                component={AccountScreen}
                options={({ navigation, route }) => {
                    // const activeRouteName = getActiveRouteName(navigation.getState())
                    // const focused = isTabFocused(activeRouteName, 'home')
                    const focused = getActiveRouteName(navigation, 4)

                    return {
                        tabBarButton: (props: any) => {
                            return (
                                <TabBarButton
                                    activeIcon={images.ic_account_selected}
                                    focused={focused}
                                    inActiveIcon={images.ic_account_primary}
                                    onPress={navigation.navigate.bind(null, 'account')}
                                />
                            )
                        }
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator;