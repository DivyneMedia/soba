import React, { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import AppLoader, { AppLoaderProps } from '../components/AppLoader'

import ExecutivesItem from '../components/ExecutivesItem'

import colors from '../constants/colors'
import { LoaderContext } from '../context/LoaderContextProvider'
import useChat from '../hooks/useChat'
import useExecutives, { ExecutiveItemType } from '../hooks/useExecutives'
import { USER } from '../types/UserResponse'
import { keyExtractHandler } from '../utils/MiscUtils'

type ExecutivesScreenProps = {
    navigation: any,
    route: any
}

const ExecutivesScreen = (props: ExecutivesScreenProps) => {
    const { navigation, route } = props
    const params = route?.params

    const loaderRef = useRef<AppLoaderProps>()

    const userData: USER = useSelector((state: any) => state?.auth?.userData)

    const {
        isLoading,
        isRefreshing,
        endReached,
        executives,
        getExecutives,
        fetchMore
    } = useExecutives({
        fetchOnMount: true
    })

    const {
        isLoading: chatLoading,
        createChannelIdDoesNotExist
    } = useChat()

    useEffect(() => {
        loaderRef.current?.toggleLoader(isLoading)
    }, [isLoading])

    useEffect(() => {
        loaderRef.current?.toggleLoader(chatLoading)
    }, [chatLoading])
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `${params?.chapter} Executives`
        })
    }, [navigation, params])

    const openChatHandler = useCallback(async (obj: ExecutiveItemType) => {
        try {
            const {
                chapterId, // ": "XCEEbOz3t4qFuI3PyUQh",
                email, // ": "paulcoleon@yahoo.com",
                id, // ": "59GGeD5HzkHgxIwypON7",
                name, // ": "Paul Forbang",
                phoneNo, // ": "(813) 793-1836",
                role // ": "President"
            } = obj

            console.log(id.trim(), userData['Mobile App Firebase UID']?.trim())

            if (userData['Mobile App Firebase UID']) {
                const data: any = await createChannelIdDoesNotExist(userData['Mobile App Firebase UID'], id, false)
                const {
                    channelId, // ": "lVLTCs1NtlWYhniVvAyk_QFYiNomTRcMZCXzvCbOGoravDrY2",
                    createdAt, // ": {"_elements": undefined, "_type": "timestamp"},
                    isApproved, // ": false,
                    isDeleted, // ": false,
                    isPinned, // ": false,
                    lastMessage, // ": "",
                    lastMessageType, // ": "text",
                    memberIds, // ": ["QFYiNomTRcMZCXzvCbOGoravDrY2", "lVLTCs1NtlWYhniVvAyk"],
                    senderId, // ": "QFYiNomTRcMZCXzvCbOGoravDrY2",
                    updatedAt, // ": {"_elements": undefined, "_type": "timestamp"}
                } = data

                navigation.navigate('chattingScreen', {
                    showApproveBtn: false,
                    chatName: name || 'Messages',
                    chatChannelId: channelId,
                    chatSenderId: userData['Mobile App Firebase UID'],
                    crmAccId: ''
                })
            }
        } catch (err: any) {
            console.log('[openChatHandler] Error : ', err.message)
        }
    }, [userData, createChannelIdDoesNotExist, navigation])

    const renderExecutivesHandler = useCallback((itemObj) => {
        const { item, index }: { item: ExecutiveItemType, index: number } = itemObj
        const {
            id,
            name,
            role,
            email,
            phoneNo
        } = item
        try {
            return (
                <ExecutivesItem
                    key={id}
                    id={id}
                    name={name}
                    role={role}
                    email={email}
                    phoneNumber={phoneNo}
                    onChat={openChatHandler.bind(null, item)}
                />
            )
        } catch (err: any) {
            console.log('[renderExecutivesHandler] Error : ', err.message)
            return null
        }
    }, [openChatHandler])

    const listFooterComponent = useMemo(() => {
        return !endReached
        ? <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={"large"} color={colors.primary} />
        </View>
        : null
    }, [endReached])

    const loaderContext = useContext(LoaderContext)

    useEffect(() => {
        loaderContext.toggleLoader(isLoading)
    }, [isLoading, loaderContext])

    return (
        <SafeAreaView style={styles.root}>
            <AppLoader ref={loaderRef} />
            <FlatList
                data={executives}
                renderItem={renderExecutivesHandler}
                keyExtractor={keyExtractHandler}
                style={styles.listStyle}
                contentContainerStyle={styles.listContainerStyle}
                ListFooterComponent={listFooterComponent}
                refreshing={isRefreshing}
                onRefresh={getExecutives.bind(null, true)}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.white
    },
    listStyle: {
        flex: 1,
    },
    listContainerStyle: {
        marginTop: 10,
        paddingBottom: 10
    }
})

export default ExecutivesScreen
