import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, View }  from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import useChat from "../hooks/useChat";

import AppLoader from "../components/AppLoader";
import SearchBar from "../components/SearchBar";
import TextButton from "../components/TextButton";
import ChatTile, { ChatTileProps } from "../components/ChatTile";

import colors from "../constants/colors";
import images from "../assets/images";

import { height, keyExtractHandler } from "../utils/MiscUtils";
import { SuccessToast } from "../utils/ToastUtils";
import BoldText from "../components/BoldText";

type ChatScreenProps = {
    navigation: any
    route: any
}

const ChatScreen = (props: ChatScreenProps) => {
    const { navigation, route } = props
    console.log('route : ', route)

    // const { userData }: { userData: USER } = useSelector((state: any) => state.auth)
    // const isAdmin = useMemo(() => userData?.["Email 1"] === "admin@gmail.com", [userData?.["Email 1"]])

    const {
        isLoading,
        // officialChats,
        adminChats,
        getAdminOfficialChannelsHandler,
        // getAllOfficialChannelsHandler,
        userChats,
        getUserChatsHandler,
        // toggleLoaderHandler
    } = useChat()
    
    const [searchText, setSearchText] = useState('')
    const [approvals, setApprovals] = useState(false)

    const filterButtonPressHandler = useCallback(() => {}, [])

    const openChatHandler = useCallback((chatPayload: any, name: string) => {
        const {
            channelId,
            createdAt,
            isDeleted,
            lastMessage,
            lastMessageType,
            memberIds,
            senderId,
            updatedAt,
            crmAccId
        } = chatPayload
        navigation.navigate('chattingScreen', {
            showApproveBtn: approvals,
            chatName: name || 'No Name',
            chatChannelId: channelId,
            chatSenderId: senderId,
            crmAccId
        })
    }, [navigation, approvals])

    const favoriteChatHander = useCallback((chatPayload: any) => {
       SuccessToast('Coming Soon')
    }, [])

    const renderChatListHandler = useCallback((item: any) => {
        try {
            const {item: chat, index}: { item: ChatTileProps, index: number } = item
            const { id, lastMessage, name, profile, isGroup } = chat
            return (
                <ChatTile
                    id={id}
                    lastSeen={lastMessage}
                    name={name || 'No Name'}
                    profile={profile || images.ic_soba_america}
                    onOpen={openChatHandler.bind(null, chat, name)}
                    onFavPress={isGroup ? favoriteChatHander.bind(null, chat) : null}
                />
            )
        } catch (err: any) {
            console.log('Error : ', err.message)
            return null
        }
    }, [openChatHandler, favoriteChatHander])

    useEffect(() => {
        getAdminOfficialChannelsHandler()
        getUserChatsHandler()
    }, [getAdminOfficialChannelsHandler, getUserChatsHandler])

    const renderListFoorter = useMemo(() => {
        if (isLoading) {
            return null
        }
        return (
            <View style={{ height: height - 100, alignItems: 'center', justifyContent: 'center' }}>
                <BoldText>No Data Available</BoldText>
            </View>
        )
    }, [])

    const renderAdminChats = useMemo(() => {
        if (!approvals) {
            return null
        }
        return (
            <FlatList
                data={adminChats}
                // contentContainerStyle={{ height: approvals ? "100%" : 0 }}
                keyExtractor={keyExtractHandler}
                renderItem={renderChatListHandler}
                ListEmptyComponent={renderListFoorter}
            />
        )
    }, [approvals, adminChats])

    const renderUserChats = useMemo(() => {
        if (approvals) {
            return null
        }
        return (
            <FlatList
                data={userChats}
                // style={{ flex: approvals ? -1 : 1 }}
                // contentContainerStyle={{ height: approvals ? 0 : "100%" }}
                keyExtractor={keyExtractHandler}
                renderItem={renderChatListHandler}
                ListEmptyComponent={renderListFoorter}
            />
        )
    }, [approvals, userChats])

    const renderHeaderHandler = useMemo(() => {
        return adminChats && adminChats?.length
        ? (
            <View style={styles.newsFeedEventButtonContainer}>
                <TextButton
                    isSelected={!approvals}
                    text="Chats"
                    onPress={setApprovals.bind(null, false)}
                />
                <TextButton
                    isSelected={approvals}
                    text="Approvals"
                    onPress={setApprovals.bind(null, true)}
                />
            </View>
        )
        : null
    }, [adminChats?.length, approvals])

    return (
        <SafeAreaView style={styles.root}>
            <AppLoader isVisible={isLoading} />
            <SearchBar
                value={searchText}
                onChangeText={setSearchText}
                onFilterButtonPress={filterButtonPressHandler}
            />
            {renderHeaderHandler}
            {renderAdminChats}
            {renderUserChats}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.white
    },
    newsFeedEventButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.grey,
        height: 50,
        marginHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden'
    },
})

export default ChatScreen
