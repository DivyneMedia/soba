import React, { useCallback, useRef, useState } from "react";
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { useSelector } from "react-redux";

import BackgroundImageComp from "../components/BackgroundImageComp";
import BoldText from "../components/BoldText";
import RegularText from "../components/RegularText";
import RoundedButton from "../components/RoundedButton";
import RoundedInput from "../components/RoundedInput";
import ScreenHeader from "../components/ScreenHeader";
import appConstants from "../constants/appConstants";

import colors from "../constants/colors";
import { getRegionIcon } from "../utils/GetConditionalIconHelper";
import { ErrorToast, SuccessToast } from "../utils/ToastUtils";

const ConfirmRegistrationScreen = (props: any) => {
    const { navigation } = props

    const { regionId } = useSelector((state: any) => state.auth)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const usernameRef = useRef<TextInput>(null)
    const passwordRef = useRef<TextInput>(null)
    const confirmPasswordRef = useRef<TextInput>(null)

    const isDataValid = useCallback(() => {
        if (!username || !username.trim()) {
            ErrorToast("Username required.")
            return false
        }
        if (!password || !password.trim()) {
            ErrorToast("Password required.")
            return false
        }
        if (password.length < 8) {
            ErrorToast("Password should be minimum 8 character long.")
            return false
        }
        if (!confirmPassword || !confirmPassword.trim()) {
            ErrorToast("Re-enter password.")
            return false
        }
        if (password !== confirmPassword) {
            ErrorToast("Password and confirm password doesn't match.")
            return false
        }
        return true
    }, [username, password, confirmPassword])

    const nextPressHandler = useCallback(() => {
        if (!isDataValid()) {
            return
        }
        SuccessToast('Coming Up')
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

    return (
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
                            secureTextEntry={true}
                            ref={passwordRef}
                        />
                        <RoundedInput
                            placeholder="confirm password"
                            value={confirmPassword}
                            onChangeText={onChangeTextHandler.bind(null, appConstants.CONF_PASSWORD)}
                            onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.CONF_PASSWORD)}
                            maxLength={15}
                            ref={confirmPasswordRef}
                            secureTextEntry={true}
                        />
                    </View>
                    <RoundedButton
                        style={{ borderRadius: 0 }}
                        onPress={nextPressHandler}
                        text={"Finish"}
                    />
                </View>
            </View>
        </BackgroundImageComp>
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
