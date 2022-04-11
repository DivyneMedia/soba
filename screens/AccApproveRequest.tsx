import React, { useCallback, useEffect } from 'react'
import { View, StyleSheet, Pressable, ActivityIndicator, Image, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import useChat from '../hooks/useChat'

import BoldText from '../components/BoldText'
import RegularText from '../components/RegularText'
import RoundedButton from '../components/RoundedButton'

import images from '../assets/images'
import colors from '../constants/colors'
import appConstants from '../constants/appConstants'
import { ErrorToast } from '../utils/ToastUtils'
import { USER } from "../types/UserResponse";
import { keyExtractHandler } from '../utils/MiscUtils'

type AccApproveRequestType = {
    navigation: any
    route: any
}

const AccApproveRequest = (props: AccApproveRequestType) => {
    const { navigation } = props

    // **Hooks
    const { userData }: { userData: USER } = useSelector((state: any) => state.auth)
    const {
        isLoading: firebaseLoading,
        officialChats,
        getAllOfficialChannelsHandler,
        createChannelIdDoesNotExist
    } = useChat()

    useEffect(() => {
        getAllOfficialChannelsHandler()
    }, [])
    
    const openChatHandler = useCallback(async (data: any) => {
        try {
            // navigation.navigate('chattingScreen', {
            //     name
            // })
            // console.log(userData)
            if (userData["Mobile App Firebase UID"] && data) {
                const { id, profile, name, phone } = data
                const firebaseUid = userData["Mobile App Firebase UID"]
                const channelData = await createChannelIdDoesNotExist(firebaseUid, id)
                if (channelData) {
                    const {
                        channelId,
                        createdAt,
                        isDeleted,
                        updatedAt
                    } = channelData

                    navigation.navigate('chattingScreen', {
                        name,
                        channelId,
                        firebaseUid
                    })
                    navigation.navigate('chattingScreen', {
                        showApproveBtn: false,
                        chatName: name || 'No Name',
                        chatChannelId: channelId,
                        chatSenderId: userData['Mobile App Firebase UID']
                    })
                } else {
                    ErrorToast(appConstants.SOMETHING_WENT_WRONG)
                }
            } else {
                ErrorToast(appConstants.SOMETHING_WENT_WRONG)
            }
        } catch (err: any) {
            console.log('[openChatHandler] Error : ', err?.message ?? appConstants.SOMETHING_WENT_WRONG)
        }
    }, [navigation, userData])

    const renderItemHandler = useCallback((user) => {
        try {
            const {item, index} = user
            const { id, profile, name, phone } = item
            return (
                <Pressable
                    onPress={openChatHandler.bind(null, item)}
                    style={styles.chatItemContainer}
                >
                    <Image
                        source={profile || images.ic_account}
                        style={styles.chatItemImage}
                        resizeMode="contain"
                    />
                    <View style={styles.chatItemTextContainer}>
                        <BoldText style={styles.chatItemTextName}>{name}</BoldText>
                        <RegularText style={styles.chatItemTextPhone}>{phone}</RegularText>
                    </View>
                </Pressable>
            )
        } catch (err: any) {
            console.log('Error : ', err.message)
            return null
        }
    }, [openChatHandler])

    const onBtnPress = useCallback(() => {}, [])

    if (firebaseLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size={'large'} color={colors.primary} />
            </View>
        )
    }

    return (
        <View style={styles.root}>
            <Image
                source={images.ic_done}
                style={styles.topImage}
                resizeMode="contain"
            />
            <View style={styles.detailsContainer}>
                <BoldText style={styles.userName}>
                    {`Hello, ${userData?.["Mobile App Username"] ?? "User"}!`}
                </BoldText>
                <RegularText style={styles.infoText}>
                    {"It's great to have you on board.\nNotify us for approval"}
                </RegularText>
                <FlatList
                    data={officialChats}
                    renderItem={renderItemHandler}
                    keyExtractor={keyExtractHandler}
                />
            </View>
            <RegularText style={{ fontSize: 11, textAlign: 'center' }}>
                {"Approval make take between up to 72 hours"}
            </RegularText>
            <RoundedButton
                text={"Fides * Quarrens * Intellectum"}
                onPress={onBtnPress}
                style={styles.bottomBtn}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        minHeight: '100%',
        backgroundColor: colors.white,
    },
    container: {
        flex: 1,
    },
    topImage: {
        height: 80,
        width: 80,
        alignSelf: 'center',
        marginVertical: 10
    },
    detailsContainer: { flex: 1, padding: 20 },
    userName: { textAlign: 'center' },
    loaderContainer: { flex: 1, alignItems: 'center', justifyContent: "center", backgroundColor: colors.white },
    infoText: { textAlign: 'center', marginVertical: 10 },
    chatItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: colors.grey,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    chatItemImage: {
        height: 36,
        width: 36
    },
    chatItemTextContainer: { marginLeft: 10 },
    chatItemTextName: { fontSize: 14 },
    chatItemTextPhone: { fontSize: 11 },
    bottomBtn: { borderRadius: 0 }
})

export default AccApproveRequest
