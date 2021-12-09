import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, Image, Keyboard, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSelector } from "react-redux";
import images from "../assets/images";

import BackgroundImageComp from "../components/BackgroundImageComp";
import BoldText from "../components/BoldText";
import CustomBackdrop from "../components/CustomBackdrop";
import RegularText from "../components/RegularText";
import RoundedButton from "../components/RoundedButton";
import RoundedInput from "../components/RoundedInput";
import ScreenHeader from "../components/ScreenHeader";
import appConstants from "../constants/appConstants";

import colors from "../constants/colors";
import { getRegionIcon } from "../utils/GetConditionalIconHelper";
import { ErrorToast, SuccessToast } from "../utils/ToastUtils";

const data = [
    {
        id: 0,
        profile: images.ic_account,
        title: "SOBA Dallas Vice President",
        phone: '+1 (888) 504-SOBA(7622)',
    },
    {
        id: 1,
        profile: images.ic_account,
        title: "SOBA America Vice President",
        phone: '+1 (888) 504-SOBA(7622)',
    },
    {
        id: 2,
        profile: images.ic_account,
        title: "SOBA America Czar",
        phone: '+1 (888) 504-SOBA(7622)',
    },
    {
        id: 3,
        profile: images.ic_account,
        title: "Your Class President",
        phone: '+1 (888) 504-SOBA(7622)',
    },
]

const ConfirmRegistrationScreen = (props: any) => {
    const { navigation } = props

    const { regionId } = useSelector((state: any) => state.auth)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)

    const usernameRef = useRef<TextInput>(null)
    const passwordRef = useRef<TextInput>(null)
    const confirmPasswordRef = useRef<TextInput>(null)

    const isDataValid = useCallback((showError = false) => {
        if (!username || !username.trim()) {
            showError && ErrorToast("Username required.")
            return false
        }
        if (!password || !password.trim()) {
            showError && ErrorToast("Password required.")
            return false
        }
        if (password.length < 8) {
            showError && ErrorToast("Password should be minimum 8 character long.")
            return false
        }
        if (!confirmPassword || !confirmPassword.trim()) {
            showError && ErrorToast("Re-enter password.")
            return false
        }
        if (password !== confirmPassword) {
            showError && ErrorToast("Password and confirm password doesn't match.")
            return false
        }
        return true
    }, [username, password, confirmPassword])

    const nextPressHandler = useCallback(() => {
        console.log('press')
        if (!isDataValid(true)) {
            return
        }
        // setShowSuccess(true)
        bottomSheetModalRef.current?.present();
    }, [isDataValid, navigation])

    const onChangeTextHandler = useCallback((key: any, value: string) => {
        switch (key) {
            case appConstants.USERNAME:
                setUsername(value);
                break
            case appConstants.PASSWORD:
                setPassword(value)
                break
            case appConstants.CONF_PASSWORD:
                setConfirmPassword(value)
                break
        }
    }, [])

    const onSubmitEditingHandler = useCallback((key: any) => {
        switch (key) {
            case appConstants.USERNAME:
                passwordRef.current?.focus()
                break
            case appConstants.PASSWORD:
                confirmPasswordRef.current?.focus()
                break
            case appConstants.CONF_PASSWORD:
                Keyboard.dismiss()
                break
        }
    }, [])

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

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
        // console.log('handleSheetChanges', index);
        if (index === -1) {
        }
    }, []);

    const openChatHandler = useCallback((data: any) => {
        try {
            const { id, profile, title, phone } = data
            navigation.navigate('chattingScreen', {
                name: title
            })
        } catch (err: any) {
            console.log('[openChatHandler] Error : ', err.message)
        }
    }, [navigation])

    const renderItemHandler = useCallback((user) => {
        try {
            const {item, index} = user
            const { id, profile, title, phone } = item
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
                        source={profile}
                        style={{
                            height: 36,
                            width: 36
                        }}
                        resizeMode="contain"
                    />
                    <View style={{ marginLeft: 10 }}>
                        <BoldText style={{ fontSize: 14 }}>{title}</BoldText>
                        <RegularText style={{ fontSize: 11 }}>{phone}</RegularText>
                    </View>
                </Pressable>
            )
        } catch (err: any) {
            console.log('Error : ', err.message)
            return null
        }
    }, [openChatHandler])

    const renderSuccessDialog = useMemo(() => {
        return (
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backdropComponent={CustomBackdrop}
                enablePanDownToClose={false}
            >
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
                        <BoldText style={{ textAlign: 'center' }}>{"Welcome, Soban 7443!"}</BoldText>
                        <RegularText style={{ textAlign: 'center', marginVertical: 10 }}>
                            {"It's great to have you on board.\nNotify us for approval"}
                        </RegularText>
                        <FlatList
                            data={data}
                            renderItem={renderItemHandler}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <RegularText style={{ fontSize: 11, textAlign: 'center' }}>{"Approval make take between up to 72 hours"}</RegularText>
                    <RoundedButton
                        text={"Fides * Quarrens * Intellectum"}
                        onPress={closeBottomSheetHandler}
                        style={{ borderRadius: 0 }}
                    />
                </View>
            </BottomSheetModal>
        )
    }, [renderItemHandler])

    return (
        <BottomSheetModalProvider>
           {renderSuccessDialog}
            <BackgroundImageComp>
                <View style={styles.root}>
                    <ScreenHeader
                        containerStyle={styles.headerContainer}
                        logo={getRegionIcon(regionId)}
                        logoStyle={styles.logoStyle}
                        onBackPress={navigation.goBack}
                    />
                    <View style={styles.detailsContainer}>
                        <View style={{ flex: 1, paddingHorizontal: 35 }}>
                            <BoldText style={{ fontSize: 22, alignSelf: 'center' }}>
                                {"Hey, you are almost done!"}
                            </BoldText>
                            <RegularText style={{ textAlign: 'center', marginVertical: 10 }}>
                                {"To complete your account setup, please\ncreate your username and password"}
                            </RegularText>
                            <RoundedInput
                                placeholder="username"
                                value={username}
                                onChangeText={onChangeTextHandler.bind(null, appConstants.USERNAME)}
                                onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.USERNAME)}
                                maxLength={25}
                                ref={usernameRef}
                            />
                            <RoundedInput
                                placeholder="password"
                                value={password}
                                onChangeText={onChangeTextHandler.bind(null, appConstants.PASSWORD)}
                                onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.PASSWORD)}
                                maxLength={15}
                                password
                                ref={passwordRef}
                            />
                            <RoundedInput
                                placeholder="confirm password"
                                value={confirmPassword}
                                onChangeText={onChangeTextHandler.bind(null, appConstants.CONF_PASSWORD)}
                                onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.CONF_PASSWORD)}
                                maxLength={15}
                                ref={confirmPasswordRef}
                                password
                            />
                        </View>
                        <RoundedButton
                            style={{ borderRadius: 0 }}
                            onPress={nextPressHandler}
                            text={"Finish"}
                            // disabled={!isDataValid()}
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
    }
})

export default ConfirmRegistrationScreen
