import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, Platform, Pressable, StyleSheet, TextInput, View }  from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../assets/images";
import AppLoader from "../components/AppLoader";
import ChatMessageItem from "../components/ChatMessageItem";
import RegularText from "../components/RegularText";
import appConstants from "../constants/appConstants";
import colors from "../constants/colors";
import useAccount from "../hooks/useAccount";
import useChatHistory from "../hooks/useChatHistory";
import { ErrorToast, SuccessToast } from "../utils/ToastUtils";

type ChatItem = {
    chatId: string,
    isDeleted: boolean,
    message: string,
    messageTime: number,
    messageType: string,
    senderId: string,
    serverTime: any,
}

type ChattingScreenProps = {
    navigation: any
    route: any
}

const ChattingScreen = (props: ChattingScreenProps) => {
    const { navigation, route } = useMemo(() => props, [props]) 
    const { params } = useMemo(() => route, [route])
    const showApproveBtn = useMemo(() => params?.showApproveBtn, [params])
    const chatName = useMemo(() => params?.chatName, [params])
    const chatChannelId = useMemo(() => params?.chatChannelId, [params])
    const chatSenderId = useMemo(() =>
        params?.showApproveBtn
            ? params?.chatChannelId.split('_').filter((id: string) => id !== params?.chatSenderId)[0]
            : params?.chatSenderId
    , [params])
    const userCrmId = useMemo(() => params?.crmAccId, [params])

    console.log('params : ', params)

    const {
        isLoading,
        toggleLoader,
        getChatHistory,
        fetchMore,
        messages,
        endReached,
        sendMessage
    } = useChatHistory(chatChannelId, chatSenderId)

    const {
        approveUserAcc,
        isLoading: accountLoading
    } = useAccount()

    // ** Refs
    const flatListRef = useRef(null)

    // ** State
    const [message, setMessage] = useState('')

    const approveAccHandler = useCallback(async () => {
        try {
            if (userCrmId) {
                await approveUserAcc(+userCrmId)
                SuccessToast('Account Approved succfully.')
            } else {
                throw new Error('Cannot approve account please try again.')
            }
        } catch (err: any)  {
            console.log('Error : ', err?.message)
            ErrorToast(err?.message ?? appConstants.SOMETHING_WENT_WRONG)
        }
    }, [userCrmId])

    const renderApproveBtnHandler = useCallback(() => {
        return (
            <Pressable
                onPress={approveAccHandler}
            >
                <RegularText>
                    {"Approve"}
                </RegularText>
            </Pressable>
        )
    }, [approveAccHandler])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: chatName,
            headerRight: showApproveBtn ? renderApproveBtnHandler : null
        })
    }, [navigation, showApproveBtn, renderApproveBtnHandler])

    const renderChatHandler = useCallback((item: any) => {
        try {
            const { item: chatItem, index }: { item: ChatItem, index: number } = item
            return (
                <ChatMessageItem
                    currUserId={chatSenderId}
                    message={chatItem.message}
                    messageTime={chatItem.messageTime}
                    senderId={chatItem.senderId}
                    senderName={''}
                />
            )
        } catch(err: any) {
            console.log('Error : ', err.message)
            return null
        }
    }, [chatSenderId])

    const getChatMessagesHandler = useCallback(async () => {
        try {
            await getChatHistory()
        } catch (err: any) {
            console.log('Error : ', err.message)
        }
    }, [chatChannelId])

    useEffect(() => {
        getChatMessagesHandler()
    }, [getChatMessagesHandler])

    const sendMessageHandler = useCallback(() => {
        sendMessage(message)
        setMessage('')
    }, [sendMessage, message])

    return (
        <SafeAreaView style={styles.root}>
            <AppLoader isVisible={isLoading || accountLoading} />
            <FlatList
                ref={flatListRef}
                style={{flex: 1}}
                keyExtractor={(item, index) => index.toString()}
                inverted={true}
                data={messages}
                // viewabilityConfig={viewConfigRef.current}
                // onViewableItemsChanged={onViewRef.current}
                onEndReachedThreshold={0.01}
                ListFooterComponent={() => {
                  return endReached ? null : (
                    <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={"large"} color={colors.primary} />
                    </View>
                  );
                }}
                onEndReached={fetchMore}
                renderItem={renderChatHandler}
            />
            <View
                style={{
                    minHeight: 50,
                    backgroundColor: colors.grey,
                    alignItems: 'center',
                    paddingHorizontal: 5,
                    flexDirection: 'row',
                    margin: 10,
                    borderRadius: 30
                }}
            >
                <View
                    style={{
                        width: '90%',
                        maxHeight: 100,
                        minHeight: Platform.OS === 'android' ? 50 : 55,
                        justifyContent: 'center',
                    }}
                >
                    <TextInput
                        placeholder="Type your text here"
                        placeholderTextColor={'#00000060'}
                        value={message}
                        returnKeyType="next"
                        onChangeText={(enteredText: string) => {
                            setMessage(enteredText);
                        }}
                        autoCapitalize="none"
                        multiline
                        scrollEnabled
                        style={{
                            // fontFamily:
                            // Platform.OS === 'android' ? 'FuturaPTBook' : 'Futura-Medium',
                            fontSize: 16,
                            paddingBottom: Platform.OS === 'android' ? 12 : 5,
                            marginLeft: 10,
                            marginRight: 10,
                            color: colors.black,
                            borderRightWidth: 0.4,
                            borderRightColor: colors.white,
                        }}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Pressable
                        onPress={sendMessageHandler}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 5,
                        }}
                    >
                        <Image
                            source={images.ic_send}
                            style={{width: 20, height: 20, resizeMode: 'cover'}}
                        />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.white
    }
})

export default ChattingScreen
