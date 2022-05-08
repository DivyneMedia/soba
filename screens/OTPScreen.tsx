import React, { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth'

import BoldText from "../components/BoldText";
import AppLoader from "../components/AppLoader";
import RegularText from "../components/RegularText";
import RoundedInput from "../components/RoundedInput";
import ScreenHeader from "../components/ScreenHeader";
import RoundedButton from "../components/RoundedButton";
import BackgroundImageComp from "../components/BackgroundImageComp";

import colors from "../constants/colors";
import appConstants from "../constants/appConstants";

import { getRegionIcon } from "../utils/GetConditionalIconHelper";
import { ErrorToast } from "../utils/ToastUtils";

var confirmation: any = null

const OTPScreen = (props: any) => {
    const { navigation, route } = props
    const { params } = route
    const {
        accId,
        callingCode,
        phone,
        verificationId: phoneVerificationId
    } = params

    const mountefRef = useRef(false)

    const [otp, setOtp] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [verificationId, setVerificationId] = useState(phoneVerificationId)

    const nextPressHandler = useCallback(async () => {
        try {
            if (!otp || !otp.trim()) {
                ErrorToast("Enter OTP to continue.")
                return
            }

            if (otp.length < 4 && otp.length > 8) {
                ErrorToast("Enter a valid OTP to continue.")
                return
            }

            const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
            const myUserData: any = await auth().signInWithCredential(credential)
            const { additionalUserInfo, user } = myUserData
            const { uid, phoneNumber } = user

            navigation.navigate('confirmRegistration', {
                uid,
                accId,
                phoneNumber
            })
        } catch (err: any) {
            console.log('Error : ', err)
            let errorMessage = appConstants.SOMETHING_WENT_WRONG
            switch (err?.code) {
                case 'auth/session-expired':
                    errorMessage = 'The sms code has expired. Please re-send the verification code to try again.'
                    break
                default:
                    errorMessage = 'Something went wrong at verifying OTP.'
                    break
            }
            ErrorToast(errorMessage)
        } finally {
            setLoading(false)
        }
    }, [verificationId, otp, confirmation, navigation, accId])

    const onChangeTextHandler = useCallback((key: any, value: string) => {
        switch (key) {
            case appConstants.OTP:
                setOtp(value)
                break
        }
    }, [])

    const onSubmitEditingHandler = useCallback((key: any) => {
        switch (key) {
            case appConstants.OTP:
                Keyboard.dismiss()
                break
        }
    }, [])

    useEffect(() => {
        mountefRef.current = true
        return () => {
            mountefRef.current = false
        }
    }, [])
    
    const toggleLoader = useCallback((visibility) => {
        if (mountefRef.current) {
            setLoading(visibility)
        }
    }, [])

    const onResendHandler = useCallback(async () => {
        try {
            toggleLoader(true)
            const confirmation = await auth()
                .signInWithPhoneNumber(`${callingCode} ${phone}`)
            console.log('confirmation : ', confirmation.verificationId)
            toggleLoader(false)
            setVerificationId(confirmation.verificationId)
        } catch(err: any) {
            console.log('[onResendHandler - signInWithPhoneNumber] Error : ', err)
            toggleLoader(false)
            let errorMessage = 'Something went wrong at sending OTP.'
            switch (err?.code) {
                case 'auth/invalid-phone-number':
                    errorMessage = 'Enter a valid phone number.'
                    break
                case 'auth/phone-number-already-exists':
                    errorMessage = 'Phone number already exist.'
                    break
                case 'auth/too-many-requests':
                    errorMessage = 'Limit exceeded for sending verification codes, please try after some time.'
                    break
                case 'auth/network-request-failed':
                    errorMessage = 'Check your network connection.'
                    break
                default:
                    errorMessage = 'Something went wrong at sending OTP.'
                    break
            }
            ErrorToast(errorMessage)
        }
    }, [callingCode, phone])

    return (
        <BackgroundImageComp>
            <AppLoader isVisible={isLoading} />
            <View style={styles.root}>
                <ScreenHeader
                    containerStyle={styles.headerContainer}
                    logo={getRegionIcon()}
                    logoStyle={styles.logoStyle}
                    onBackPress={navigation.goBack}
                />
                <View style={styles.detailsContainer}>
                    <View style={{ flex: 1, paddingHorizontal: 35 }}>
                        <BoldText style={{ fontSize: 22, alignSelf: 'center', textAlign: 'center' }}>
                            {"Sending You an OTP"}
                        </BoldText>
                        <RegularText style={{ textAlign: 'center', marginTop: 10 }}>
                            {`Check your phone inbox to read your OTP.\nand fill it to the box below`}
                        </RegularText>
                        <View
                            style={{
                                flex: 1,
                                marginTop: 5
                            }}
                        >
                            <RoundedInput
                                placeholder="OTP Code"
                                value={otp}
                                onChangeText={onChangeTextHandler.bind(null, appConstants.OTP)}
                                onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.OTP)}
                                maxLength={6}
                                returnKeyType="done"
                                blurOnSubmit={true}
                            />
                            <RegularText
                                style={{
                                    fontSize: 12,
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                    marginTop: 15
                                }}
                            >
                                {"I haven't received it, "}
                                <RegularText
                                    onPress={onResendHandler}
                                    style={{
                                        fontSize: 12,
                                        color: colors.primary
                                    }}
                                >
                                    {"resent my OTP Code"}
                                </RegularText>
                            </RegularText>
                        </View>
                        {/* <RegularText
                            onPress={setOtpViaPhone.bind(null, !otpViaPhone)}
                            style={{
                                fontSize: 12,
                                color: colors.primary,
                                alignSelf: 'center',
                                textAlign: 'center',
                                marginBottom: 5
                            }}
                        >
                            {`Send my OTP via ${otpViaPhone ? 'phone' : 'email'} instead`}
                        </RegularText> */}
                    </View>
                    <RoundedButton
                        style={{ borderRadius: 0 }}
                        onPress={nextPressHandler}
                        text={"Next"}
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

export default OTPScreen
