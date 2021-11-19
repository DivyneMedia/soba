import React, { useCallback, useRef, useState } from "react";
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import images from "../assets/images";

import AuthFooter from "../components/AuthFooter";
import BoldText from "../components/BoldText";
import RegularText from "../components/RegularText";
import RoundedButton from "../components/RoundedButton";
import RoundedInput from "../components/RoundedInput";
import RoundedInputButton from "../components/RoundedInputButton";
import ScreenHeader from "../components/ScreenHeader";
import appConstants from "../constants/appConstants";

import colors from "../constants/colors";

const EnterContactInformation = (props: any) => {
    const { navigation } = props

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [dob, setDob] = useState('')
    const [address, setAddress] = useState('')

    const phoneRef = useRef<TextInput>(null)
    const emailRef = useRef<TextInput>(null)
    const addressRef = useRef<TextInput>(null)

    const nextPressHandler = useCallback(() => {
        navigation.navigate("otpScreen")
    }, [navigation])

    const onChangeTextHandler = useCallback((key: any, value: string) => {
        switch (key) {
            case appConstants.PHONE:
                setPhone(value);
                break
            case appConstants.EMAIL:
                setEmail(value)
                break
            case appConstants.DOB:
                setDob(value)
                break
            case appConstants.ADDRESS:
                setAddress(value)
                break
        }
    }, [])

    const onSubmitEditingHandler = useCallback((key: any) => {
        switch (key) {
            case appConstants.PHONE:
                emailRef.current?.focus()
                break
            case appConstants.EMAIL:
                //  show date picker 
                break
            case appConstants.DOB: // on date select
                addressRef.current?.focus()
                break
            case appConstants.ADDRESS:
                Keyboard.dismiss()
                break
        }
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
                    <BoldText style={{ fontSize: 22, alignSelf: 'center' }}>
                        {"Hey, you are almost done!"}
                    </BoldText>
                    <RegularText style={{ textAlign: 'center', marginVertical: 10 }}>
                        {"To complete your account setup, please\ncreate your username and password"}
                    </RegularText>
                    <RoundedInput
                        placeholder="Username"
                        value={phone}
                        onChangeText={onChangeTextHandler.bind(null, appConstants.USERNAME)}
                        onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.USERNAME)}
                        maxLength={15}
                        ref={phoneRef}
                    />
                    <RoundedInput
                        placeholder="Email Address"
                        value={email}
                        onChangeText={onChangeTextHandler.bind(null, appConstants.EMAIL)}
                        onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.EMAIL)}
                        maxLength={50}
                        ref={emailRef}
                    />
                    <RoundedInputButton
                        placeholder="Date of Birth"
                        onPress={() => {}}
                        value={dob}
                    />
                    <RoundedInput
                        placeholder="Address"
                        value={address}
                        onChangeText={onChangeTextHandler.bind(null, appConstants.ADDRESS)}
                        onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.ADDRESS)}
                        maxLength={100}
                        ref={addressRef}
                    />
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

export default EnterContactInformation
