import React, { useCallback, useState } from "react";
import { Keyboard, StyleSheet, View } from 'react-native';

import images from "../assets/images";

import BoldText from "../components/BoldText";
import RegularText from "../components/RegularText";
import RoundedButton from "../components/RoundedButton";
import RoundedInput from "../components/RoundedInput";
import ScreenHeader from "../components/ScreenHeader";
import appConstants from "../constants/appConstants";

import colors from "../constants/colors";

const OTPScreen = (props: any) => {
    const { navigation } = props

    const [otp, setOtp] = useState('')
    const [otpViaPhone, setOtpViaPhone] = useState(true)

    const nextPressHandler = useCallback(() => {
        navigation.navigate('confirmRegistration')
    }, [navigation])

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
        <View style={styles.root}>
            <ScreenHeader
                containerStyle={styles.headerContainer}
                logo={images.ic_logo}
                logoStyle={styles.logoStyle}
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
                            onChangeText={onChangeTextHandler.bind(null, appConstants.EMAIL)}
                            onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.EMAIL)}
                            maxLength={50}
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
