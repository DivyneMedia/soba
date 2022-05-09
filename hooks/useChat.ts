import { useState, useCallback, useRef, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'

import appConstants from '../constants/appConstants'
import { getCurrFirestoreTimeStamp } from './useFirebase'
import { USER } from '../types/UserResponse'
import { useSelector } from 'react-redux'

const useChat = () => {
    // **States
    const [isLoading, setLoading] = useState(false)
    const [officialChats, setOfficialChats] = useState<any>([])
    const [userChats, setUserChats] = useState<any>([])
    const [adminChats, setAdminChats] = useState<any>([])

    // **Refs
    const mountedRef = useRef(false)

    // **Redux
    const { userData }: { userData: USER } = useSelector((state: any) => state.auth)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    const toggleLoaderHandler = useCallback((status: boolean) => {
        mountedRef.current && setLoading(prevState => !prevState)
    }, [])

    const getAdminOfficialChannelsHandler = useCallback(async () => {
        try {
            toggleLoaderHandler(true)
            const defaultChannels =
                await firestore()
                .collection(appConstants.defaultChannels)
                .where("admins", "array-contains", userData?.['Mobile App Firebase UID'])
                .where("isDeleted", "!=", true)
                .get()

            const adminChannelIds = defaultChannels.docs.map(doc => doc.data().id)

            if (adminChannelIds.length) {
                const officialChatsRes =
                    await firestore()
                        .collection(appConstants.privateChannel)
                        .where("memberIds", "array-contains-any", adminChannelIds)
                        .where("isDeleted", "!=", true)
                        .where("isApproved", "==", false)
                        .get()

                const allChats = officialChatsRes.docs.map(doc => ({ ...doc.data() }))

                const names = await Promise.all(allChats.map(async chat => {
                    const {
                        channelId,
                        createdAt,
                        isDeleted,
                        lastMessage,
                        lastMessageType,
                        memberIds,
                        senderId,
                        updatedAt
                    } = chat

                    const ind = adminChannelIds.findIndex((id: string) => channelId.includes(id))
                    const memberId = channelId.split('_').filter((id: string) => id !== adminChannelIds[ind])[0]

                    const dataRes = await firestore()
                        .collection(appConstants.users)
                        .doc(memberId)
                        .get()

                    return {
                        name: dataRes.data()?.username,
                        crmAccId: dataRes.data()?.crmAccId,
                        ...chat
                    }
                }))
                setAdminChats(names)
            }
            toggleLoaderHandler(false)
        } catch (err: any) {
            console.log('Error : ', err.message)
            toggleLoaderHandler(false)
        }
    }, [toggleLoaderHandler, userData?.['Mobile App Firebase UID']])

    const getAllOfficialChannelsHandler = useCallback(async () => {
        try {
            toggleLoaderHandler(true)
            const defaultChannels =
                await firestore()
                .collection(appConstants.defaultChannels)
                .get()

            const adminChannelIds = [...defaultChannels.docs.map(doc => doc.data())]
            setOfficialChats(adminChannelIds)   
            toggleLoaderHandler(false)
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
                    senderId: userId,
                    isApproved: false,
                    isPinned: false
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

    const getUserChatsHandler = useCallback(async () => {
        try {
            toggleLoaderHandler(true)

            const userChannels =
                await firestore()
                .collection(appConstants.privateChannel)
                .where("memberIds", "array-contains", userData?.['Mobile App Firebase UID'])
                .where("isDeleted", "!=", true)
                .where("isApproved", "==", false)
                .get()

            const allChats = userChannels.docs.map(doc => doc.data())

            const names = await Promise.all(allChats.map(async chat => {
                const {
                    channelId,
                    createdAt,
                    isDeleted,
                    lastMessage,
                    lastMessageType,
                    memberIds,
                    senderId,
                    updatedAt
                } = chat

                const id = channelId.split('_').filter((id: string) => id !== userData['Mobile App Firebase UID'])[0]

                const dataRes = await firestore()
                    .collection(appConstants.defaultChannels)
                    .doc(id)
                    .get()

                    return {
                        name: dataRes.data()?.name,
                        ...chat
                    }
            }))

            setUserChats(names)
            toggleLoaderHandler(false)
        } catch (err: any) {
            console.log(err.message)
            toggleLoaderHandler(false)
        }
    }, [toggleLoaderHandler, userData?.['Mobile App Firebase UID']])

    return {
        isLoading,
        officialChats,
        userChats,
        adminChats,
        getAdminOfficialChannelsHandler,
        toggleLoaderHandler,
        getAllOfficialChannelsHandler,
        createChannelIdDoesNotExist,
        getUserChatsHandler,
    }
}

export default useChat
