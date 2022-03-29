import { useState, useCallback, useRef, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import appConstants from '../constants/appConstants'

const useChatHistory = (channelId: string, senderId: string) => {
    // **States
    const [isLoading, setLoading] = useState(false)
    const [endReached, setEndReached] = useState(true)
    const [messages, setMessages] = useState<any[]>([])

    // **Refs
    const mountedRef = useRef(false)
    const paginationRef = useRef<any>(null)

    const toggleLoader = useCallback((status: boolean) => {
        mountedRef.current && setLoading(status)
    }, [])

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    const getChatHistory = useCallback(async () => {
        try {
            const getHistoryRes = await firestore()
                .collection(appConstants.privateChannel)
                .doc(channelId)
                .collection(appConstants.chatMessages)
                .where("isDeleted", "==", false)
                .orderBy("messageTime", "desc")
                .limit(appConstants.chatMessagesFetchLimit)
                .get()

            if (getHistoryRes && getHistoryRes.docs.length) {
                if (!(appConstants.chatMessagesFetchLimit > getHistoryRes.docs.length)) {
                    setEndReached(false)
                    paginationRef.current = getHistoryRes.docs[getHistoryRes.docs.length - 1]
                } else {
                    paginationRef.current = null
                }
                setMessages(getHistoryRes.docs.map(chat => chat.data()))
            }
        } catch (err: any) {
            console.log('[getChatHistory] Error : ', err.message)
        } finally {
            toggleLoader(false)
        }
    }, [])

    const fetchMore = useCallback(async () => {
        try {
            if (endReached || !paginationRef.current) {
                return
            }
            const getHistoryRes = await firestore()
                .collection(appConstants.privateChannel)
                .doc(channelId)
                .collection(appConstants.chatMessages)
                .where("isDeleted", "==", false)
                .orderBy("messageTime", "desc")
                .limit(appConstants.chatMessagesFetchLimit)
                .startAfter(paginationRef.current)
                .get()

            if (getHistoryRes && getHistoryRes.docs.length) {
                if (!(appConstants.chatMessagesFetchLimit > getHistoryRes.docs.length)) {
                    paginationRef.current = getHistoryRes.docs[getHistoryRes.docs.length - 1]
                    setEndReached(false)
                } else {
                    paginationRef.current = null
                    setEndReached(true)
                }
                const messagesData = getHistoryRes.docs.map(chat => chat.data())
                setMessages(prevState => [...prevState, ...messagesData])
            }
        } catch (err: any) {
            console.log('[fetchMore] Error : ', err.message)
        }
    }, [endReached])

    const sendMessage = useCallback(async (messageText: string) => {
        try {
            const chatMessagesRef = firestore()
                .collection(appConstants.privateChannel)
                .doc(channelId)
                .collection(appConstants.chatMessages)

            const newDocId = chatMessagesRef.doc().id

            const messageData = {
                chatId: newDocId,
                isDeleted: false,
                message: messageText,
                messageType: 'text',
                messageTime: Math.floor(new Date().getTime() / 1000),
                senderId
            }

            await chatMessagesRef.doc(newDocId).set(messageData)

            setMessages(prevState => [messageData, ...prevState])

        } catch (err: any) {
            console.log('Error : ', err.message)
        }
    }, [channelId, senderId])

    return {
        isLoading,
        toggleLoader,
        getChatHistory,
        fetchMore,
        messages,
        endReached,
        sendMessage
    }
}

export default useChatHistory
