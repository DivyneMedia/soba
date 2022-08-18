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
    
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    const [chats, setChats] = useState<any[]>([])
    const [approvals, setApprovals] = useState<any[]>([])
    const [chatsEndReached, setChatsEndReached] = useState(true)
    const [approvalsEndReached, setApprovalsEndReached] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    // ** Refs
    const mountedRef = useRef(false)
    const adminIds = useRef<any[]>([])

    const lastUserChatRef = useRef<any>(null)
    const lastAdminChatRef = useRef<any>(null)

    // ** Redux
    const { userData }: { userData: USER } = useSelector((state: any) => state.auth)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    const toggleLoaderHandler = useCallback((status: boolean) => {
        mountedRef.current && setLoading(status)
    }, [])

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

    const createChannelIdDoesNotExist = useCallback(async (
        userId: string,
        chatId: string,
        isAdmin = false,
        isApproved = false,
        isExecutiveChat = false
    ) => {
        try {
            toggleLoaderHandler(true)
            const channelId = userId.trim() > chatId.trim() ? `${userId.trim()}_${chatId.trim()}` : `${chatId.trim()}_${userId.trim()}`
            const chatChannel = await firestore()
                .collection(appConstants.privateChannel)
                .doc(channelId)
                .get()

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
                    isApproved,
                    isAdminChat: isAdmin,
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
    
    const getAdminChatIds = useCallback(async (refreshing = false) => {
        try {
            if (!refreshing && Array.isArray(adminIds.current) && adminIds.current.length) {
                return adminIds.current
            }
            
            const defaultChannels =
                await firestore()
                .collection(appConstants.defaultChannels)
                .where("admins", "array-contains", userData['Mobile App Firebase UID'])
                .where("isDeleted", "!=", true)
                .get()

            const adminChannelIds = defaultChannels.docs.map(doc => doc.data().id)

            // console.log('adminChannelIds : ', adminChannelIds)
            
            if (adminChannelIds.length) {
                setIsAdmin(true)
                adminIds.current = [...adminChannelIds, userData['Mobile App Firebase UID']]
            }
            return adminIds.current
        } catch (err: any) {
            console.log('[getAdminChatIds] Error : ', err.message)
            return []
        }
    }, [userData])

    // ** Fetch User Chats firebase call
    const fetchUserChats = useCallback(async (refresh = false) => {
        try {
            const userChatIds: any[] = await getAdminChatIds(refresh)
            console.log('userChatIds : ', userChatIds)
            let query = firestore()
                .collection(appConstants.privateChannel)
                // .where("memberIds", "array-contains-any", userChatIds)
                .where("memberIds", "array-contains", userData['Mobile App Firebase UID'])
                .where("isApproved", "!=", false)
                .where("isDeleted", "==", false)
                .orderBy('isApproved', 'asc')
                .limit(appConstants.chatsLimit)

            if (!refresh && !!lastUserChatRef.current) {
                query = query.startAfter(lastUserChatRef.current)
            }
            
            const getChatsRes = await query.get()

            console.log('getChatsRes.docs.length : ', getChatsRes.docs.length, !refresh && !!lastUserChatRef.current)

            lastUserChatRef.current = getChatsRes.docs[getChatsRes.docs.length - 1]

            if (getChatsRes.docs.length < appConstants.chatsLimit) {
                setChatsEndReached(true)
            } else {
                setChatsEndReached(false)
            }

            if (getChatsRes.docs.length) {
                const chatsArr: any = await Promise.all(getChatsRes.docs.map(async (doc, index) => {
                    const docData = doc.data()

                    if ('isAdminChat' in docData) { // has key
                        if (docData?.isAdminChat) {

                            let id = ''
                                
                            docData
                            .channelId
                            .split('_')
                            .forEach((channelIdPart: string) => {
                                try {
                                    if (!userData['Mobile App Firebase Admin Ids']) {
                                        throw new Error("not an admin")
                                    }
                                    const adminChatIds = JSON.parse(userData['Mobile App Firebase Admin Ids'])

                                    const myID = adminChatIds.filter((adminChatId: any) => adminChatId !== channelIdPart)

                                    if (myID.length) {
                                        id = myID[0]
                                    }
                                } catch (err: any) {
                                    if (channelIdPart !== userData['Mobile App Firebase UID']) {
                                        id = channelIdPart
                                    }
                                }
                            })

                            const dataRes = await firestore()
                                .collection(appConstants.defaultChannels)
                                .doc(id)
                                .get()
            
                            return {
                                name: dataRes.data()?.name,
                                profilePic: dataRes.data()?.profilePic,
                                ...docData,
                                isAdminChat: false
                            }
                        } else {
                            const id = docData.channelId.split('_').filter((id: string) => id !== userData['Mobile App Firebase UID'])[0]

                            const dataRes = await firestore()
                                .collection(appConstants.users)
                                .doc(id)
                                .get()

                            return {
                                name: dataRes.data()?.firstName + " " + dataRes.data()?.lastName,
                                profilePic: dataRes.data()?.profilePic,
                                ...docData,
                                isAdminChat: false
                            }
                        }
                    }
                }))

                if (refresh) {
                    setRefreshing(false)
                } else {
                    toggleLoaderHandler(false)
                }
                return chatsArr
            } else {
                return []
            }
        } catch (err: any) {
            console.log('[fetchUserChats] Error : ', err.message)
            return []
        }
    }, [userData, getAdminChatIds])

    const getUserChats = useCallback(async (refresh = false) => {
        try {
            if (refresh) {
                setRefreshing(true)
            } else {
                toggleLoaderHandler(true)
            }
            const initialUserChats = await fetchUserChats(refresh)
            setChats(initialUserChats)
            if (refresh) {
                setRefreshing(false)
            } else {
                toggleLoaderHandler(false)
            }
        } catch (err: any) {
            console.log('[getUserChats] Error : ', err.message)
            if (refresh) {
                setRefreshing(false)
            } else {
                toggleLoaderHandler(false)
            }
            setChatsEndReached(true)
        }
    }, [fetchUserChats])

    const fetchMoreUserChats = useCallback(async () => {
        try {
            if (chatsEndReached || !lastUserChatRef.current) {
                return
            }
            const nextChats = await fetchUserChats(false)
            setChats(prevState => [...prevState, ...nextChats])
        } catch (err: any) {
            console.log('[fetchMoreUserChats] Error : ', err.message)
            setChatsEndReached(true)
        }
    }, [fetchUserChats, chatsEndReached])

    // ** Fetch Admin Chats firebase call
    const fetchAdminApprovals = useCallback(async (refresh = false) => {
        try {
            const userChatIds: any[] = await getAdminChatIds(refresh)

            if (!userChatIds.length) {
                return []
            }

            let query = firestore()
                .collection(appConstants.privateChannel)
                .where("memberIds", "array-contains-any", userChatIds)
                .where("isAdminChat", "==", true)
                .where("isDeleted", "==", false)
                .where('isApproved', '!=', '')
                .orderBy('isApproved', 'asc')
                .limit(appConstants.chatsLimit)

            if (!refresh && !!lastAdminChatRef.current) {
                query.startAfter(lastAdminChatRef.current)
            }

            const getChatsRes = await query.get()

            lastAdminChatRef.current = getChatsRes.docs[getChatsRes.docs.length - 1]

            if (getChatsRes.docs.length < appConstants.chatsLimit) {
                setApprovalsEndReached(true)
            } else {
                setApprovalsEndReached(false)
            }
                            
            if (getChatsRes.docs.length) {
                const chatsArr = await Promise.all(getChatsRes.docs.map(async (doc, index) => {
                    const docData = doc.data()
                    let id = ''
                                
                    docData
                    .channelId
                    .split('_')
                    .forEach((channelIdPart: string) => {
                        try {
                            if (!userData['Mobile App Firebase Admin Ids']) {
                                throw new Error("not an admin")
                            }
                            const adminChatIds = JSON.parse(userData['Mobile App Firebase Admin Ids'])

                            const myID = adminChatIds.filter((adminChatId: any) => adminChatId !== channelIdPart)

                            if (myID.length) {
                                id = channelIdPart
                            }
                        } catch (err: any) {
                            console.log('in catch')
                            if (channelIdPart !== userData['Mobile App Firebase UID']) {
                                id = channelIdPart
                            }
                        }
                    })

                    const dataRes = await firestore()
                        .collection(appConstants.users)
                        .doc(id)
                        .get()
    
                    return {
                        name: dataRes.data()?.firstName + " " + dataRes.data()?.lastName,
                        crmAccId: dataRes.data()?.crmAccId,
                        profilePic: dataRes.data()?.profilePic,
                        ...docData
                    }
                }))
                return chatsArr
            } else {
                return []
            }
        } catch (err: any) {
            console.log('Error : ', err.message)
            return []
        }
    }, [userData, getAdminChatIds])

    const getAdminChats = useCallback(async (refresh = false) => {
        try {
            if (refresh) {
                setRefreshing(true)
            } else {
                toggleLoaderHandler(true)
            }
            const chatsArr = await fetchAdminApprovals(refresh)
            setApprovals(chatsArr)
            if (refresh) {
                setRefreshing(false)
            } else {
                toggleLoaderHandler(false)
            }
        } catch (err: any) {
            console.log('[getAdminChats] Error : ', err.message)
            if (refresh) {
                setRefreshing(false)
            } else {
                toggleLoaderHandler(false)
            }
            setApprovalsEndReached(true)
        }
    }, [fetchAdminApprovals])

    const fetchMoreAdminChats = useCallback(async () => {
        try {
            if (approvalsEndReached || !lastAdminChatRef.current) {
                return
            }
            const chatsArr = await fetchAdminApprovals()
            setApprovals(prevState => [...prevState, ...chatsArr])
        } catch (err: any) {
            console.log('[getAdminChats] Error : ', err.message)
            setApprovalsEndReached(true)
        }
    }, [approvalsEndReached, fetchAdminApprovals])

    const getAllChatIds = useCallback(() => adminIds.current, [])

    useEffect(() => {
        try {
            firestore()
            .collection(appConstants.privateChannel)
            .where("createdAt", ">", new Date())
            .where("memberIds", "array-contains", userData['Mobile App Firebase UID'])
            .onSnapshot((snapShot) => {
                snapShot.docChanges().forEach(async (doc) => {
                    console.log('----- doc type : ', doc.type)
                    if (doc.type === "added") {
                        const docData = doc.doc.data()
                        let docDataToAddedInList: any = null

                        console.log('docData : ', docData)
        
                        if ('isAdminChat' in docData) { // has key
                            if (docData?.isAdminChat) {
                                let id = ''
                                    
                                docData
                                .channelId
                                .split('_')
                                .forEach((channelIdPart: string) => {
                                    try {
                                        if (!userData['Mobile App Firebase Admin Ids']) {
                                            throw new Error("not an admin")
                                        }
                                        const adminChatIds = JSON.parse(userData['Mobile App Firebase Admin Ids'])
    
                                        const myID = adminChatIds.filter((adminChatId: any) => adminChatId !== channelIdPart)
    
                                        if (myID.length) {
                                            id = myID[0]
                                        }
                                    } catch (err: any) {
                                        if (channelIdPart !== userData['Mobile App Firebase UID']) {
                                            id = channelIdPart
                                        }
                                    }
                                })
    
                                const dataRes = await firestore()
                                    .collection(appConstants.defaultChannels)
                                    .doc(id)
                                    .get()
                
                                docDataToAddedInList = {
                                    name: dataRes.data()?.name,
                                    profilePic: dataRes.data()?.profilePic,
                                    ...docData,
                                    isAdminChat: false
                                }
                            } else {
                                const id = docData.channelId.split('_').filter((id: string) => id !== userData['Mobile App Firebase UID'])[0]
    
                                const dataRes = await firestore()
                                    .collection(appConstants.users)
                                    .doc(id)
                                    .get()
    
                                docDataToAddedInList = {
                                    name: dataRes.data()?.firstName + " " + dataRes.data()?.lastName,
                                    profilePic: dataRes.data()?.profilePic,
                                    ...docData,
                                    isAdminChat: false
                                }
                            }
                        }
                        setChats(prevState => [...prevState, docDataToAddedInList])
                    }
                })
            }, (error) => {
                console.log('[useEffect-userChats] Error : ', error)
            })
        } catch (error) {
            console.log('[[useEffect-userChats] ] Error : ', error)
        }
    }, [userData])

    useEffect(() => {
        try {
            firestore()
            .collection(appConstants.privateChannel)
            .where("memberIds", "array-contains", userData['Mobile App Firebase UID'])
            .onSnapshot((snapShot) => {
                snapShot.docChanges().forEach(async (doc) => {
                    console.log('----- doc type : ', doc.type)
                    if (doc.type === 'modified') {
                        const docData = doc.doc.data()
                        setChats((prevState: any[]) => {
                            const existingChats = [...prevState]

                            const updateIndex = existingChats.findIndex(chat => chat.channelId === docData.channelId)

                            if (updateIndex > -1) {
                                existingChats[updateIndex] = {
                                    ...existingChats[updateIndex],
                                    ...docData
                                }
                                return existingChats
                            } else {
                                return prevState
                            }
                        })
                    }
                })
            }, (error) => {
                console.log('[useEffect-userChats] Error : ', error)
            })
        } catch (error) {
            console.log('[[useEffect-userChats 2] ] Error : ', error)
        }
    }, [userData])

    const setAccountApprovedLocally = useCallback((channelId: string) => {
        setApprovals((prevState: any[]) => {
            const existingApprovals = [...prevState]

            const updateIndex = existingApprovals.findIndex(approval => approval.channelId === channelId)

            if (updateIndex > -1) {
                existingApprovals[updateIndex] = {
                    ...existingApprovals[updateIndex],
                    isApproved: true
                }
                return existingApprovals
            } else {
                return prevState
            }
        })
    }, [])

    // useEffect(() => {
    //     try {
    //         getAdminChatIds(false)
    //         .then(res => {
    //             if (!res.length) {
    //                 return []
    //             }
    
    //             firestore()
    //             .collection(appConstants.privateChannel)
    //             .where("memberIds", "array-contains-any", [...res].splice(0, res.length - 1))
    //             .where("createdAt", ">", new Date())
    //             .onSnapshot((snapShot) => {
    //                 snapShot.docChanges().forEach((doc) => {
    //                     if (doc.type === "added") {
    //                         setApprovals(prevState => [...prevState, doc.doc.data()])
    //                     }
    //                 })
    //             }, (error) => {
    //                 console.log('[useEffect - getAdminChatIds] Error : ', error)
    //             })
    //         })
    //         .catch((err: any) => {
    //             console.log('[useEffect - getAdminChatIds] Error : ', err.message)
    //         })
    //     } catch (error) {
    //         console.log('[useEffect - getAdminChatIds] Error : ', error)
    //     }
    // }, [userData])

    return {
        officialChats,
        getAllOfficialChannelsHandler,
        isLoading,
        isAdmin,
        chats,
        approvals,
        refreshing,
        getUserChats,
        fetchMoreUserChats,
        getAdminChats,
        fetchMoreAdminChats,
        createChannelIdDoesNotExist,
        getAllChatIds,
        getAdminChatIds,
        chatsEndReached,
        approvalsEndReached,
        setAccountApprovedLocally
    }
}

export default useChat
