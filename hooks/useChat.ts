import { useState, useCallback, useRef, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'

import appConstants from '../constants/appConstants'
import { getCurrFirestoreTimeStamp } from './useFirebase'

const useChat = () => {
    // **States
    const [isLoading, setLoading] = useState(false)
    const [officialChats, setOfficialChats] = useState<any>([])

    // **Refs
    const mountedRef = useRef(false)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    const toggleLoaderHandler = useCallback((status: boolean) => {
        mountedRef.current && setLoading(prevState => !prevState)
    }, [])

    const getAllOfficialChannelsHandler = useCallback(async () => {
        try {
            toggleLoaderHandler(true)
            const defaultChannels = await firestore().collection(appConstants.defaultChannels).get()
            toggleLoaderHandler(false)
            setOfficialChats([...defaultChannels.docs.map(doc => doc.data())])
        } catch (err: any) {
            toggleLoaderHandler(false)
        }
    }, [toggleLoaderHandler])

    const createChannelIdDoesNotExist = useCallback(async (userId: string, chatId: string) => {
        try {
            toggleLoaderHandler(true)
            const channelId = userId > chatId ? `${userId}_${chatId}` : `${chatId}_${userId}`
            const chatChannel = await firestore().collection(appConstants.privateChannel).doc(channelId).get()
            if (chatChannel.exists) {
                return chatChannel.data()
            } else {
                const data = {
                    channelId,
                    createdAt: getCurrFirestoreTimeStamp(),
                    updatedAt: getCurrFirestoreTimeStamp(),
                    isDeleted: false,
                    lastMessage: '',
                    lastMessageType: 'text',
                    memberIds: [userId, chatId],
                    senderId: userId
                }
                await firestore().collection(appConstants.privateChannel).doc(channelId).set(data)
                await firestore()
                    .collection(appConstants.privateChannel)
                    .doc(channelId)
                    .collection(appConstants.chatMembersData)
                    .doc(userId)
                    .set({
                        isOnline: false,
                        memberId: userId,
                        roomId: channelId,
                        unreadCount: 0
                    })
                await firestore()
                    .collection(appConstants.privateChannel)
                    .doc(channelId)
                    .collection(appConstants.chatMembersData)
                    .doc(chatId)
                    .set({
                        isOnline: false,
                        memberId: chatId,
                        roomId: channelId,
                        unreadCount: 0
                    })
                    return data
            }
        } catch (err: any) {
            console.log('Error : ', err.message)
            return null
        } finally {
            toggleLoaderHandler(false)
        }
    }, [])

    return {
        isLoading,
        officialChats,
        toggleLoaderHandler,
        getAllOfficialChannelsHandler,
        createChannelIdDoesNotExist,
    }
}

export default useChat
