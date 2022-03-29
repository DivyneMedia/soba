import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BackHandler, FlatList, Image, Keyboard, Pressable, StyleSheet, TextInput, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import AuthFooter from "../components/AuthFooter";
import BackgroundImageComp from "../components/BackgroundImageComp";
import BoldText from "../components/BoldText";
import RegularText from "../components/RegularText";
import RoundedButton from "../components/RoundedButton";
import RoundedInput from "../components/RoundedInput";
import ScreenHeader from "../components/ScreenHeader";
import CustomBackdrop from "../components/CustomBackdrop";
import AppLoader from "../components/AppLoader";
import data from '../data/appStaticData'

import appConstants from "../constants/appConstants";
import colors from "../constants/colors";
import images from "../assets/images";
import { ErrorToast, SuccessToast } from "../utils/ToastUtils";
import * as authActions from '../store/actions/AuthActions'
import { USER } from "../types/UserResponse";
import useChat from "../hooks/useChat";

const LoginScreen = (props: any) => {
    const { navigation } = props

    // **Hooks
    const { userData }: { userData: USER } = useSelector((state: any) => state.auth)
    const {
        isLoading: firebaseLoading,
        officialChats,
        getAllOfficialChannelsHandler,
        createChannelIdDoesNotExist
    } = useChat()
    const dispatch = useDispatch()

    // **States
    const [email, setEmail] = useState('tndime')
    const [password, setPassword] = useState('123456')
    const [isLoading, setLoading] = useState(false)

    // **Refs
    const mountedRef = useRef(false)
    const emailRef = useRef<TextInput>(null)
    const passwordRef = useRef<TextInput>(null)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    const onForgotPasswordPress = useCallback(() => {
        SuccessToast("Coming Soon")
    }, [])

    const signInHandler = useCallback(async () => {
        try {
            setLoading(true)
            await dispatch(authActions.login({
                username: email,
                password: password
            }))
            SuccessToast("Login Successfully.")
        } catch (err: any) {
            console.log('[signInHandler] Error : ', err?.message)
            ErrorToast(err.message)
        } finally {
            mountedRef.current && setLoading(false)
        }
    }, [dispatch, email, password])

    const onClaimPressHandler = useCallback(() => {
        navigation.navigate("selectRegion")
    }, [navigation])

    const onChangeTextHandler = useCallback((key: any, value: string) => {
        switch (key) {
            case appConstants.EMAIL:
                setEmail(value);
                break
            case appConstants.PASSWORD:
                setPassword(value)
                break
        }
    }, [])

    const onSubmitEditingHandler = useCallback((key: any) => {
        switch (key) {
            case appConstants.EMAIL:
                passwordRef.current?.focus()
                break
            case appConstants.PASSWORD:
                Keyboard.dismiss()
                signInHandler()
                break
        }
    }, [signInHandler])

    // ** BottomSheet Manage
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const bottomSheetOpenStatusRef = useRef(false)

    // variables
    const snapPoints = useMemo(() => ['85%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const closeBottomSheetHandler = useCallback(() => {
        // bottomSheetModalRef.current?.close();
    }, [])

    const handleSheetChanges = useCallback((index: number) => {
        bottomSheetOpenStatusRef.current = index !== -1
    }, []);

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
                } else {
                    ErrorToast(appConstants.SOMETHING_WENT_WRONG)
                }
            } else {
                ErrorToast(appConstants.SOMETHING_WENT_WRONG)
            }
        } catch (err: any) {
            console.log('[openChatHandler] Error : ', err.message)
        }
    }, [navigation, userData])

    const renderItemHandler = useCallback((user) => {
        try {
            const {item, index} = user
            const { id, profile, name, phone } = item
            return (
                <Pressable
                    onPress={openChatHandler.bind(null, item)}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                        backgroundColor: colors.grey,
                        borderRadius: 30,
                        paddingVertical: 10,
                        paddingHorizontal: 10
                    }}
                >
                    <Image
                        source={profile || images.ic_account}
                        style={{
                            height: 36,
                            width: 36
                        }}
                        resizeMode="contain"
                    />
                    <View style={{ marginLeft: 10 }}>
                        <BoldText style={{ fontSize: 14 }}>{name}</BoldText>
                        <RegularText style={{ fontSize: 11 }}>{phone}</RegularText>
                    </View>
                </Pressable>
            )
        } catch (err: any) {
            console.log('Error : ', err.message)
            return null
        }
    }, [openChatHandler])

    const forceCloseBottomSheet = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, [])

    const androidBackButtonPressHandler = useCallback(() => {
        if (bottomSheetOpenStatusRef.current) {
            forceCloseBottomSheet()
            return true
        } else {
            return false
        }
    }, [])

    useEffect(() => {
        const backHandlerEvent = BackHandler.addEventListener("hardwareBackPress", androidBackButtonPressHandler)
        return () => backHandlerEvent.remove()
    }, [androidBackButtonPressHandler])

    const renderSuccessDialog = useMemo(() => {
        return (
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                // backdropComponent={CustomBackdrop}
                backdropComponent={(props) => <CustomBackdrop {...props} onPress={forceCloseBottomSheet} />}
                enablePanDownToClose={false}
            >
                {
                    firebaseLoading
                    ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                            <ActivityIndicator size={'large'} color={colors.primary} />
                        </View>
                    :
                        <View
                            style={{
                                flex: 1,
                                minHeight: '100%',
                            }}
                        >
                            <Image
                                source={images.ic_done}
                                style={{
                                    height: 80,
                                    width: 80,
                                    alignSelf: 'center',
                                    marginVertical: 10
                                }}
                                resizeMode="contain"
                            />
                            <View style={{ flex: 1, padding: 20 }}>
                                <BoldText style={{ textAlign: 'center' }}>{`Hello, ${userData["Mobile App Username"]}!`}</BoldText>
                                <RegularText style={{ textAlign: 'center', marginVertical: 10 }}>
                                    {"It's great to have you on board.\nNotify us for approval"}
                                </RegularText>
                                <FlatList
                                    data={officialChats}
                                    renderItem={renderItemHandler}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                            <RegularText style={{ fontSize: 11, textAlign: 'center' }}>
                                {"Approval make take between up to 72 hours"}
                            </RegularText>
                            <RoundedButton
                                text={"Fides * Quarrens * Intellectum"}
                                onPress={closeBottomSheetHandler}
                                style={{ borderRadius: 0 }}
                            />
                        </View>    
                }
            </BottomSheetModal>
        )
    }, [renderItemHandler, forceCloseBottomSheet, userData, firebaseLoading, officialChats])

    useEffect(() => { 
        if (userData && !userData["Mobile App Account Approved"]) {
            getAllOfficialChannelsHandler()
            bottomSheetModalRef.current?.present();
        }
    }, [userData])

    return (
        <BottomSheetModalProvider>
            <BackgroundImageComp>
                {renderSuccessDialog}
                <AppLoader isVisible={isLoading} />
                <View style={styles.root}>
                    <ScreenHeader
                        containerStyle={styles.headerContainer}
                        logo={images.ic_soba_america}
                        logoStyle={styles.logoStyle}
                    />
                    <View style={styles.detailsContainer}>
                        <View style={{ flex: 1 }}>
                            <BoldText style={{ fontSize: 22, alignSelf: 'center' }}>
                                {"Sign-in Now!"}
                            </BoldText>
                            <RoundedInput
                                placeholder="SOBA Number or username"
                                value={email}
                                onChangeText={onChangeTextHandler.bind(null, appConstants.EMAIL)}
                                onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.EMAIL)}
                                maxLength={50}
                                ref={emailRef}
                            />
                            <RoundedInput
                                placeholder="Password"
                                value={password}
                                onChangeText={onChangeTextHandler.bind(null, appConstants.PASSWORD)}
                                onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.PASSWORD)}
                                blurOnSubmit={true}
                                secureTextEntry={true}
                                returnKeyType="done"
                                maxLength={15}
                                ref={passwordRef}
                            />
                            <RegularText
                                onPress={onForgotPasswordPress}
                                style={{
                                    alignSelf: 'flex-end',
                                    marginVertical: 10,
                                    color: colors.primary,
                                }}
                            >
                                {"Forgot Password?"}
                            </RegularText>
                            <RoundedButton
                                text="Sign in"
                                onPress={signInHandler}
                            />
                        </View>
                        <AuthFooter
                            baseText={"Don't have an account? "}
                            innerText={"Claim Now"}
                            onPress={onClaimPressHandler}
                            style={{ marginBottom: 15 }}
                        />
                    </View>
                </View>
            </BackgroundImageComp>
        </BottomSheetModalProvider>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    headerContainer: {
        flex: 0.35,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'pink'
    },
    logoStyle: {
        height: 100,
        width: 100,
    },
    detailsContainer: {
        flex: 0.65,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20,
        paddingHorizontal: 35
    }
})

export default LoginScreen
