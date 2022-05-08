import React, { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch } from "react-redux";

import AuthFooter from "../components/AuthFooter";
import BackgroundImageComp from "../components/BackgroundImageComp";
import BoldText from "../components/BoldText";
import RegularText from "../components/RegularText";
import RoundedButton from "../components/RoundedButton";
import RoundedInput from "../components/RoundedInput";
import ScreenHeader from "../components/ScreenHeader";
import AppLoader from "../components/AppLoader";

import appConstants from "../constants/appConstants";
import colors from "../constants/colors";
import images from "../assets/images";
import { ErrorToast, SuccessToast } from "../utils/ToastUtils";
import * as authActions from '../store/actions/AuthActions'

const LoginScreen = (props: any) => {
    const { navigation } = props

    const [data] = useState(() => {
        console.log('hello')
    })

    console.log('data : ', data)

    // **Hooks
    const dispatch = useDispatch()

    // **States
    const [email, setEmail] = useState(__DEV__ ? 'tndime' : '')
    const [password, setPassword] = useState(__DEV__ ? '123456' : '')
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

    return (
        <BackgroundImageComp>
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
