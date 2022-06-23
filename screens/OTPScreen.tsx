import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
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
import useAccount from "../hooks/useAccount";
import { LoaderContext } from "../context/LoaderContextProvider";
import { PhoneAuthContext } from "../context/PhoneAuthContextProvider";

var confirmation: any = null
var otpVerificationId: string | null = ''

const OTPScreen = (props: any) => {
    const { navigation, route } = props
    // const routeData = route?.params ?? {
    //     params: {
    //         accId: '',
    //         callingCode: '',
    //         phone: '',
    //         verificationId: '',
    //         updateableDetails: ''
    //     }
    // }
    const { params } = route
    const {
        accId,
        callingCode,
        phone,
        verificationId: phoneVerificationId,
        updateableDetails
    } = params

    const {
        isLoading: accountLoading,
        updateUserAccountDetails
    } = useAccount()

    const { createAccount, verifyAccount } = useContext(PhoneAuthContext)

    const mountefRef = useRef(false)

    const [otp, setOtp] = useState('')
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        otpVerificationId = phoneVerificationId
        return () => {
            otpVerificationId = ''
        }
    }, [phoneVerificationId])

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

            // const credential = auth.PhoneAuthProvider.credential(otpVerificationId, otp);
            // const myUserData: any = await auth().signInWithCredential(credential)
            setLoading(true)
            const verifyRes = await verifyAccount(otp)
            setLoading(false)
            // const { additionalUserInfo, user } = myUserData
            // const { uid, phoneNumber } = user

            if (verifyRes) {
                if (updateableDetails) {
                    setLoading(true)
                    await updateUserAccountDetails(accId, JSON.parse(updateableDetails))
                    setLoading(false)
                }
    
                navigation.navigate('confirmRegistration', {
                    // uid,
                    accId,
                    // phoneNumber
                })
            }
        } catch (err: any) {
            setLoading(false)
            console.log('Error : ', err)
            let errorMessage = appConstants.SOMETHING_WENT_WRONG
            switch (err?.code) {
                case 'auth/invalid-verification-code':
                    errorMessage = 'The sms verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.'
                    break
                case 'auth/session-expired':
                    errorMessage = 'The sms code has expired. Please re-send the verification code to try again.'
                    break
                default:
                    errorMessage = 'Something went wrong please try again.'
                    break
            }
            ErrorToast(errorMessage)
        }
    }, [otp, confirmation, navigation, accId, updateableDetails, verifyAccount])

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
            if (auth().currentUser?.uid) {
                await auth().signOut()
            }
            const res = await createAccount(`${callingCode} ${phone}`)
            // const confirmation = await auth()
            //     .verifyPhoneNumber(`${callingCode} ${phone}`, false, false)
            console.log('confirmation : ', confirmation.verificationId)
            toggleLoader(false)
            otpVerificationId = confirmation.verificationId
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
    }, [callingCode, phone, createAccount])

    const loaderContext = useContext(LoaderContext)

    useEffect(() => {
        loaderContext.toggleLoader(isLoading || accountLoading)
    }, [isLoading, accountLoading, loaderContext])

    return (
        <BackgroundImageComp>
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
                            {"SMS OTP Verification"}
                        </BoldText>
                        <RegularText style={{ textAlign: 'center', marginTop: 10 }}>
                            {`Please enter the 6-digit verification code we sent via SMS. We want to make sure it your's before we let you claim this account`}
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
                                    fontSize: 13,
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                    marginTop: 15
                                }}
                            >
                                {"I haven't received it, "}
                                <RegularText
                                    onPress={onResendHandler}
                                    style={{
                                        fontSize: 13,
                                        color: colors.primary,
                                        fontWeight: "bold"
                                    }}
                                >
                                    {"resend my OTP code"}
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
