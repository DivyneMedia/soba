import { useState, useCallback, useRef, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import appConstants from '../constants/appConstants'

var unsubscribeChat: any = null
var lastMessageTime: any = 0

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

    const setListener = useCallback(() => {
        try {
            unsubscribeChat = firestore()
                .collection(appConstants.privateChannel)
                .doc(channelId)
                .collection(appConstants.chatMessages)
                .orderBy('messageTime', 'desc')
                .where("messageTime", ">", lastMessageTime)
                .onSnapshot((snapShot) => {
                    let newMessage: any[] = []
                    snapShot.docs.forEach(doc => {
                        if (doc.exists) {
                            const docData = doc.data()
                            if (docData?.senderId !== senderId){
                                newMessage.push(docData)
                                lastMessageTime = docData.messageTime
                            }
                        }
                    })
                    setMessages(prevState => {
                        return [...newMessage, ...prevState]
                    })
                })
        } catch (err: any) {
            console.log('[setListener] Error : ', err.message)
        }
    }, [channelId, senderId])

    const removeListener = useCallback(() => {
        if (unsubscribeChat) {
            unsubscribeChat()
        }
    }, [])

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    useEffect(() => {
        return removeListener
    }, [removeListener])

    useEffect(() => {
        console.log('in messages useEffect')
        if(messages.length) {
            removeListener()
            setListener()
        }
    }, [messages.length, setListener, removeListener])

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
                const messagesObj = getHistoryRes.docs.map(chat => chat.data())
                lastMessageTime = messagesObj[0].messageTime+1
                setMessages(messagesObj)
                setListener()
            }
        } catch (err: any) {
            console.log('[getChatHistory] Error : ', err.message)
        } finally {
            toggleLoader(false)
        }
    }, [setListener, channelId])

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
                message: messageText.trim(),
                messageType: 'text',
                messageTime: Math.floor(new Date().getTime() / 1000),
                senderId
            }

            await chatMessagesRef.doc(newDocId).set(messageData)

            await firestore().collection(appConstants.privateChannel).doc(channelId).update({
                lastMessage: messageText.trim(),
                updatedAt: firestore.FieldValue.serverTimestamp()
            })

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
