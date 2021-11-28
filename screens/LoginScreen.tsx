import React, { useCallback, useRef, useState } from "react";
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import images from "../assets/images";

import AuthFooter from "../components/AuthFooter";
import BackgroundImageComp from "../components/BackgroundImageComp";
import BoldText from "../components/BoldText";
import RegularText from "../components/RegularText";
import RoundedButton from "../components/RoundedButton";
import RoundedInput from "../components/RoundedInput";
import ScreenHeader from "../components/ScreenHeader";
import appConstants from "../constants/appConstants";
import * as authActions from '../store/actions/AuthActions'

import colors from "../constants/colors";
import { SuccessToast } from "../utils/ToastUtils";

const LoginScreen = (props: any) => {
    const { navigation } = props

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailRef = useRef<TextInput>(null)
    const passwordRef = useRef<TextInput>(null)

    const onForgotPasswordPress = useCallback(() => {
        SuccessToast("Coming Soon")
    }, [])

    const signInHandler = useCallback(async () => {
        try {
            await dispatch(authActions.login({
                isLoggedIn: true
            }))
            SuccessToast("Login Successfully.")
        } catch (err) {
            console.log('[signInHandler] Error : ', err)
        }
    }, [dispatch])

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
            <View style={styles.root}>
                <ScreenHeader
                    containerStyle={styles.headerContainer}
                    logo={images.ic_logo}
                    logoStyle={styles.logoStyle}
                />
                <View style={styles.detailsContainer}>
                    <View style={{ flex: 1 }}>
                        <BoldText style={{ fontSize: 22, alignSelf: 'center' }}>
                            {"Sign-in Now!"}
                        </BoldText>
                        <RoundedInput
                            placeholder="email or username"
                            value={email}
                            onChangeText={onChangeTextHandler.bind(null, appConstants.EMAIL)}
                            onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.EMAIL)}
                            maxLength={50}
                            ref={emailRef}
                        />
                        <RoundedInput
                            placeholder="password"
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
                            {"forgot passoword"}
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
