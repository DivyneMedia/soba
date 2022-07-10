import { useState, useCallback, useRef, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'

import appConstants from '../constants/appConstants'
import { getCurrFirestoreTimeStamp } from './useFirebase'
import { USER } from '../types/UserResponse'
import { useSelector } from 'react-redux'

const useChat = () => {
    // ** States
    const [isLoading, setLoading] = useState(false)
    const [officialChats, setOfficialChats] = useState<any>([])
    const [userChats, setUserChats] = useState<any>([])
    const [adminChats, setAdminChats] = useState<any>([])
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [approvedChats, setApprovedChats] = useState<any>([])

    // ** Refs
    const mountedRef = useRef(false)

    // ** Redux
    const { userData }: { userData: USER } = useSelector((state: any) => state.auth)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    const onSnapshotHandler = useCallback((snap) => {
        try {
            snap.docChanges().forEach((changes: any) => {
                const data = changes.doc.data()
                switch (changes.type) {
                    case 'added':
                        break
                    case 'modified':
                        const updatedAt = data?.updatedAt
                        const channelId = data?.channelId
                        if (updatedAt !== null && !!channelId) {
                            const userChatsUpdateInd = userChats.findIndex((chat: any) => chat.channelId === channelId)
                            const adminChatsUpdateInd = adminChats.findIndex((chat: any) => chat.channelId === channelId)
                            const approvedChatsUpdateInd = approvedChats.findIndex((chat: any) => chat.channelId === channelId)
                            if (userChatsUpdateInd !== -1 || adminChatsUpdateInd !== -1 || approvedChatsUpdateInd !== -1) {
                                if (userChatsUpdateInd !== -1) {
                                    setUserChats((prevState: any) => {
                                        const existingChats = [...prevState]
                                        existingChats[userChatsUpdateInd] = {
                                            ...existingChats[userChatsUpdateInd],
                                            lastMessage: data?.lastMessage,
                                            lastMessageType: data?.lastMessageType,
                                        }
                                        return existingChats
                                    })
                                }
                                if (adminChatsUpdateInd !== -1) {
                                    setAdminChats((prevState: any) => {
                                        const existingChats = [...prevState]
                                        existingChats[adminChatsUpdateInd] = {
                                            ...existingChats[adminChatsUpdateInd],
                                            lastMessage: data?.lastMessage,
                                            lastMessageType: data?.lastMessageType,
                                        }
                                        return existingChats
                                    })
                                }
                                if (approvedChatsUpdateInd !== -1) {
                                    setApprovedChats((prevState: any) => {
                                        const existingChats = [...prevState]
                                        existingChats[approvedChatsUpdateInd] = {
                                            ...existingChats[approvedChatsUpdateInd],
                                            lastMessage: data?.lastMessage,
                                            lastMessageType: data?.lastMessageType,
                                        }
                                        return existingChats
                                    })
                                }
                            }
                        }
                        break
                    case 'removed':
                        break
                }
            })
        } catch (err: any) {
            console.log('[onSnapshotHandler] Error : ', err?.message)
        }
    }, [userChats, adminChats, approvedChats])

    useEffect(() => {
        const subscribe = firestore()
            .collection(appConstants.privateChannel)
            // .where('memberIds', 'array-contains-any', userData['Mobile App Firebase UID'])
            .onSnapshot(onSnapshotHandler)

        return subscribe
    }, [onSnapshotHandler, userData])

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
                setIsAdmin(true)
                const officialChatsRes =
                    await firestore()
                        .collection(appConstants.privateChannel)
                        .where("memberIds", "array-contains-any", adminChannelIds)
                        .where("isDeleted", "!=", true)
                        // .where("isApproved", "==", false)
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
                        updatedAt,
                        isApproved,
                        isPinned
                    } = chat

                    const ind = adminChannelIds.findIndex((id: string) => channelId.includes(id))
                    const memberId = channelId.split('_').filter((id: string) => id !== adminChannelIds[ind])[0]

                    const dataRes = await firestore()
                        .collection(appConstants.users)
                        .doc(memberId)
                        .get()

                    return {
                        name: dataRes.data()?.firstName + " " + dataRes.data()?.lastName,
                        crmAccId: dataRes.data()?.crmAccId,
                        ...chat
                    }
                }))

                console.log('names : ', names)

                const unApprovedChats = names.filter((chat: any) => chat?.isApproved === false)
                const approvedChats = names.filter((chat: any) => chat?.isApproved === true)

                // console.log('approvedChats : ', approvedChats)
                setApprovedChats(approvedChats.map((res: any) => ({ ...res, isAdmin: true })))
                setAdminChats(unApprovedChats)
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
                // .where("isApproved", "==", true)
                .get()

            const allChats = userChannels.docs.map(doc => doc.data())

            // console.log('allChats : ', allChats)

            const names = await Promise.all(allChats.map(async chat => {
                const {
                    channelId,
                    createdAt,
                    isDeleted,
                    lastMessage,
                    lastMessageType,
                    memberIds,
                    senderId,
                    updatedAt,
                    isApproved,
                    isPinned
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

            console.log('names : ', names)

            setUserChats(names)
            toggleLoaderHandler(false)
        } catch (err: any) {
            console.log(err.message)
            toggleLoaderHandler(false)
        }
    }, [toggleLoaderHandler, userData?.['Mobile App Firebase UID']])

    return {
        isLoading,
        isAdmin,
        officialChats,
        userChats,
        adminChats,
        approvedChats,
        getAdminOfficialChannelsHandler,
        toggleLoaderHandler,
        getAllOfficialChannelsHandler,
        createChannelIdDoesNotExist,
        getUserChatsHandler,
    }
}

export default useChat
