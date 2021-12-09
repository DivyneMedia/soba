import React, { useCallback, useState } from "react";
import { FlatList, Image, ImageRequireSource, Pressable, StyleSheet, View }  from 'react-native';
import images from "../assets/images";
import BoldText from "../components/BoldText";
import ChatTile, { ChatTileProps } from "../components/ChatTile";
import RegularText from "../components/RegularText";
import SearchBar from "../components/SearchBar";
import colors from "../constants/colors";
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
    
    const [searchText, setSearchText] = useState('')

    const filterButtonPressHandler = useCallback(() => {}, [])

    const openChatHandler = useCallback((chatPayload: any) => {
        const { id, lastSeen, name, profile, isGroup } = chatPayload
        navigation.navigate('chattingScreen', {
            id,
            lastSeen,
            name,
            profile
        })
    }, [navigation])

    const favoriteChatHander = useCallback((chatPayload: any) => {
       SuccessToast('Coming Soon')
    }, [])

    const renderChatListHandler = useCallback((item: any) => {
        try {
            const {item: chat, index}: { item: ChatTileProps, index: number } = item
            const { id, lastSeen, name, profile, isGroup } = chat
            return (
                <ChatTile
                    id={id}
                    lastSeen={lastSeen}
                    name={name}
                    profile={profile}
                    onOpen={openChatHandler.bind(null, chat)}
                    onFavPress={isGroup ? favoriteChatHander.bind(null, chat) : null}
                />
            )
        } catch (err: any) {
            console.log('Error : ', err.message)
            return null
        }
    }, [])

    return (
        <View style={styles.root}>
            <SearchBar
                value={searchText}
                onChangeText={setSearchText}
                onFilterButtonPress={filterButtonPressHandler}
            />
            <FlatList
                data={chatList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderChatListHandler}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.white
    }
})

export default ChatScreen
