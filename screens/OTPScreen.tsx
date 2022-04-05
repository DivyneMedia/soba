import React, { useCallback, useEffect, useState } from "react";
import { Keyboard, StyleSheet, View } from 'react-native';
import { useSelector } from "react-redux";

import images from "../assets/images";
import AppLoader from "../components/AppLoader";
import BackgroundImageComp from "../components/BackgroundImageComp";

import BoldText from "../components/BoldText";
import HeaderComponent from "../components/HeaderComponent";
import RegularText from "../components/RegularText";
import RoundedButton from "../components/RoundedButton";
import RoundedInput from "../components/RoundedInput";
import ScreenHeader from "../components/ScreenHeader";
import appConstants from "../constants/appConstants";
import auth from '@react-native-firebase/auth'

import colors from "../constants/colors";
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
        // confirmation
    } = params

    const [otp, setOtp] = useState('')
    const [otpViaPhone, setOtpViaPhone] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [isVarified, setVarified] = useState(false)
    const [userObj, setUserObj] = useState<any>(null)

    useEffect(() => {
        setLoading(true)
        auth().signInWithPhoneNumber(`${callingCode} ${phone}`)
        .then(res => {
            confirmation = res
        })
        .catch(err => {
            ErrorToast("Something went wrong at sending OTP.")
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(userData => {
            if (userData) {
                console.log('userData', userData)
                setUserObj(userData)
                setVarified(true)
            }
        })
        return unsubscribe
    }, [])

    const nextPressHandler = useCallback(async () => {
        try {
            if (!otp || !otp.trim()) {
                ErrorToast("Enter OTP to continue.")
                return
            }
            if (isVarified && userObj) {
                // const { additionalUserInfo, user } = userObj
                // const { isNewUser } = additionalUserInfo
                const { uid, phoneNumber } = userObj
                navigation.navigate('confirmRegistration', {
                    uid,
                    accId,
                    phoneNumber
                })
            } else {
                setLoading(true)
                const res = await confirmation?.confirm(otp)
                if (res) {
                    const { additionalUserInfo, user } = res
                    const { isNewUser } = additionalUserInfo
                    const { uid, phoneNumber } = user
        
                    navigation.navigate('confirmRegistration', {
                        uid,
                        accId,
                        phoneNumber
                    })
                    // if (isNewUser) {
                    //     // create new user in firestore
                    //     navigation.navigate('confirmRegistration', {
                    //         isNewUser,
                    //         uid,
                    //         phoneNumber
                    //     })
                    // } else {
                    //     // will think on it
                    //     ErrorToast('User already exist with same phone number.')
                    // }
                }
            }
        } catch (err: any) {
            ErrorToast(appConstants.SOMETHING_WENT_WRONG)
        } finally {
            setLoading(false)
        }
    }, [otp, confirmation, navigation, accId, userObj, isVarified])

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
    
    const onResendHandler = useCallback(() => {

    }, [])

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
                            {`Check your ${otpViaPhone ? 'phone' : 'email'} inbox to read your OTP.\nand fill it to the box below`}
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
                        <RegularText
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
                        </RegularText>
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
