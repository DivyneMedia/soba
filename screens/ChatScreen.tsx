import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Image, ImageRequireSource, Pressable, StyleSheet, View }  from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { AnyIfEmpty, useSelector } from "react-redux";
import images from "../assets/images";
import AppLoader from "../components/AppLoader";
import BoldText from "../components/BoldText";
import ChatTile, { ChatTileProps } from "../components/ChatTile";
import RegularText from "../components/RegularText";
import SearchBar from "../components/SearchBar";
import TextButton from "../components/TextButton";
import colors from "../constants/colors";
import useChat from "../hooks/useChat";
import { USER } from "../types/UserResponse";
import { keyExtractHandler } from "../utils/MiscUtils";
import { SuccessToast } from "../utils/ToastUtils";

const chatList = [
    {
        id: 0,
        profile: images.ic_soba_uk,
        name: 'SOBA Dallas Business',
        lastSeen: 'Active 2 minutes ago',
        isGroup: true
    },
    {
        id: 1,
        profile: images.ic_soba_america,
        name: 'SOBA Dallas Social',
        lastSeen: 'Active',
        isGroup: true
    },
    {
        id: 2,
        profile: images.ic_soba_uk,
        name: 'SOBA Dallas Executive (Restricted)',
        lastSeen: 'Active',
        isGroup: true
    },
    {
        id: 3,
        profile: images.ic_soba_america,
        name: 'SOBA Convention Committee',
        lastSeen: 'Active',
        isGroup: true
    },
    {
        id: 4,
        profile: images.ic_logo,
        name: 'SOBA 2000 USA',
        lastSeen: 'Active 2 minutes ago',
        isGroup: true
    },
    {
        id: 5,
        profile: images.ic_logo,
        name: 'SOBA 2000 General',
        lastSeen: 'Active 2 minutes ago',
        isGroup: true
    },
    {
        id: 6,
        profile: images.ic_soba_uk,
        name: 'Mola Ndoko',
        lastSeen: 'Active 5 minutes ago',
        isGroup: true
    },
    {
        id: 7,
        profile: images.ic_account,
        name: 'Edwin Eselem',
        lastSeen: 'Active 5 minutes ago',
        isGroup: false
    },
]

type ChatScreenProps = {
    navigation: any
    route: any
}

const ChatScreen = (props: ChatScreenProps) => {
    const { navigation } = props

    const { userData }: { userData: USER } = useSelector((state: any) => state.auth)
    // const isAdmin = useMemo(() => userData?.["Email 1"] === "admin@gmail.com", [userData?.["Email 1"]])

    const {
        isLoading,
        officialChats,
        adminChats,
        getAdminOfficialChannelsHandler,
        getAllOfficialChannelsHandler,
        userChats,
        getUserChatsHandler,
        toggleLoaderHandler
    } = useChat()
    
    const [searchText, setSearchText] = useState('')
    const [approvals, setApprovals] = useState(false)

    const filterButtonPressHandler = useCallback(() => {}, [])

    const openChatHandler = useCallback((chatPayload: any, name: string) => {
        // console.log(chatPayload)
        // const { id, name, phone, profile } = chatPayload
        // navigation.navigate('chatRequestsScreen', {
        //     id,
        //     name,
        //     phone,
        //     profile
        // })
        // return
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
            />
        )
    }, [approvals, userChats])

    return (
        <SafeAreaView style={styles.root}>
            <AppLoader isVisible={isLoading} />
            <SearchBar
                value={searchText}
                onChangeText={setSearchText}
                onFilterButtonPress={filterButtonPressHandler}
            />
            {
                adminChats && adminChats?.length
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
            }
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
