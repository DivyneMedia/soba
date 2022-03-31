import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import ChatTile from '../components/ChatTile'
import colors from '../constants/colors'

import firestore from '@react-native-firebase/firestore'
import appConstants from '../constants/appConstants'
import images from '../assets/images'
import AppLoader from '../components/AppLoader'

type RouteProps = {
    params: {
        id: string
        name: string
        phone: string | null
        profile: string | null
    }
}

type ChatRequestsScreenProps = {
    navigation: any
    route: RouteProps
}

const keyExtractorHandler = (item: any, index: number) => index.toString()

type ChatChannel = {
    channelId: string,
    createdAt: any,
    isDeleted: boolean,
    lastMessage: string,
    lastMessageType: string,
    memberIds: any,
    senderId: string,
    updatedAt: any
}

const getUserName = async (userId: string) => {
    try {
        const res = await firestore()
            .collection(appConstants.users)
            .where("uid", "==", userId)
            .get()

        if (res.docs.length && res.docs[0].exists) {
            return res.docs[0].data().username
        } else {
            return "No Name"
        }
    } catch (err: any) {
        console.log('[getUserName] Error : ', err.message)
        return "No Name"
    }
}

const ChatRequestsScreen = (props: ChatRequestsScreenProps) => {
    const { navigation, route } = props
    const { params } = route
    const { id, name, phone, profile } = params

    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState<ChatChannel[]>([])

    const getAvailableChatsHandler = useCallback(async () => {
        try {
            const channels = await firestore()
                .collection(appConstants.privateChannel)
                .where("memberIds", "array-contains", id)
                .where("isDeleted", "!=", true)
                .get()

            const tempData = channels.docs.map((channel: any) => channel.data())
            const dataWithUserName = await Promise.all(
                await tempData.map(async (item) => {
                    const userId = item.memberIds.filter((mid: string) => mid !== id)[0]
                    const userName = await getUserName(userId)
                    return {
                        ...item,
                        userName
                    }
                })
            )
            setData(dataWithUserName)
        } catch (err: any) {
            console.log('[getAvailableChatsHandler] Error : ', err.message)
        }
    }, [id])

    useEffect(() => {
        getAvailableChatsHandler()
    }, [getAvailableChatsHandler])

    const openChatHistoryHandler = useCallback((name, channelId, firebaseUid) => {
        navigation.navigate("chattingScreen", {
            name,
            channelId,
            firebaseUid
        })
    }, [navigation])

    const renderChatsHandler = useCallback((obj) => {
        try {
            const { item, index }: { item: ChatChannel, index: number } = obj
            return (
                <ChatTile
                    id={+item.channelId}
                    lastSeen={""}
                    name={item?.userName ?? "No Name"}
                    onFavPress={null}
                    onOpen={openChatHistoryHandler.bind(null, item.userName, item.channelId, id)}
                    profile={images.ic_user}
                    isGroup={false}
                    key={item.channelId}
                />
            )
        } catch (err: any) {
            console.log('Error : ', err.message)
            return null
        }
    }, [])

    return (
        <View style={styles.root}>
            <AppLoader isVisible={isLoading} />
            <FlatList
                data={data}
                renderItem={renderChatsHandler}
                keyExtractor={keyExtractorHandler}
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

export default ChatRequestsScreen
