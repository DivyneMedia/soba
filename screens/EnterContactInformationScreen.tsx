import React, { useCallback, useRef, useState } from "react";
import { Image, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSelector } from "react-redux";
import DateTimePickerModal, { PickerComponent } from "react-native-modal-datetime-picker";
import CountryPicker from 'react-native-country-picker-modal'

import BackgroundImageComp from "../components/BackgroundImageComp";
import RoundedInputButton from "../components/RoundedInputButton";
import RoundedButton from "../components/RoundedButton";
import RoundedInput from "../components/RoundedInput";
import ScreenHeader from "../components/ScreenHeader";
import RegularText from "../components/RegularText";
import BoldText from "../components/BoldText";

import appConstants from "../constants/appConstants";
import colors from "../constants/colors";

import { getRegionIcon } from "../utils/GetConditionalIconHelper";
import { ErrorToast } from "../utils/ToastUtils";
import moment from "moment";

type STRING_UNDEFINED = string | undefined

type RouteParams = {
    address: STRING_UNDEFINED,
    dob: STRING_UNDEFINED,
    email: STRING_UNDEFINED,
    phoneNumber: STRING_UNDEFINED
    callingCode: STRING_UNDEFINED
} 

const EnterContactInformation = (props: any) => {
    const { navigation, route } = props
    const params: RouteParams = route.params

    const { regionId } = useSelector((state: any) => state.auth)

    const [callingCode, setCallingCode] = useState(params?.callingCode ? `+${params?.callingCode}` : '+91')
    const [phone, setPhone] = useState(params?.phoneNumber ?? '')
    const [email, setEmail] = useState(params?.email ?? '')
    const [dob, setDob] = useState(params?.dob ? +params?.dob : '')
    const [address, setAddress] = useState(params?.address ?? '')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const phoneRef = useRef<TextInput>(null)
    const emailRef = useRef<TextInput>(null)
    const addressRef = useRef<TextInput>(null)

    const isDataValid = useCallback((showError = false) => {
        if (!phone || !phone.trim()) {
            showError && ErrorToast("Phone number required.")
            return false
        }
        if (isNaN(+phone)) {
            showError && ErrorToast("Entered wrong phone number.")
            return false
        }
        if (!email || !email.trim()) {
            showError && ErrorToast("Email address required.")
            return false
        }
        if (!dob) {
            showError && ErrorToast("Select your Date of birth to continue.")
            return false
        }
        if (!address || !address.trim()) {
            showError && ErrorToast("Address address required.")
            return false
        }
        return true
    }, [email, phone, dob, address])

    const nextPressHandler = useCallback(() => {
        if (!isDataValid(true)) {
            return
        }
        navigation.navigate("otpScreen")
    }, [navigation, isDataValid])

    const onChangeTextHandler = useCallback((key: any, value: string) => {
        switch (key) {
            case appConstants.PHONE:
                setPhone(value);
                break
            case appConstants.EMAIL:
                setEmail(value)
                break
            // case appConstants.DOB:
            //     console.log('val : ', value)
                
                break
            case appConstants.ADDRESS:
                setAddress(value)
                break
        }
    }, [])

    const onSubmitEditingHandler = useCallback((key: any, value?: any) => {
        switch (key) {
            case appConstants.PHONE:
                emailRef.current?.focus()
                break
            case appConstants.EMAIL:
                // setDatePickerVisibility(true)
                break
            case appConstants.DOB: // on date select
            console.log(value)
                if (value) {
                    setDob(moment(value).unix() * 1000)
                    setDatePickerVisibility(false)
                }
                addressRef.current?.focus()
                break
            case appConstants.ADDRESS:
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
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={onSubmitEditingHandler.bind(null, appConstants.DOB)}
                    onCancel={setDatePickerVisibility.bind(null, false)}
                />
                <View style={styles.detailsContainer}>
                    <View style={{ flex: 1, paddingHorizontal: 35 }}>
                        <BoldText style={{ fontSize: 22, alignSelf: 'center', textAlign: 'center' }}>
                            {"Hey, you are almost done!"}
                        </BoldText>
                        <RegularText style={{ textAlign: 'center', marginVertical: 10 }}>
                            {"To complete your account setup, please\ncreate your username and password"}
                        </RegularText>
                        <View
                            style={{
                                width: "100%",
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderWidth: 1,
                                paddingHorizontal: 20,
                                borderRadius: 30,
                                marginTop: 20
                            }}
                        >
                            <RegularText
                                style={{
                                    position: 'absolute',
                                    top: -10,
                                    left: 23,
                                    paddingHorizontal: 5,
                                    backgroundColor: colors.white,
                                }}
                            >
                                {"Phone No."}
                            </RegularText>
                            <CountryPicker
                                withAlphaFilter={true}
                                withCallingCode={true}
                                placeholder={
                                    <BoldText
                                        style={{
                                            fontSize: 14
                                        }}
                                    >
                                        {callingCode}
                                    </BoldText>
                                }
                                onSelect={(data) => {
                                    if (data.callingCode.length) {
                                        setCallingCode(`+${data.callingCode[0]}`)
                                    }
                                }}
                            />
                            <TextInput
                                placeholder="Phone No."
                                value={phone}
                                onChangeText={onChangeTextHandler.bind(null, appConstants.PHONE)}
                                onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.PHONE)}
                                maxLength={10}
                                ref={phoneRef}
                                style={{ flex: 1, paddingTop: 12 }}
                                // inputStyle={{ flex: 1, paddingLeft: 50 }}
                                keyboardType="number-pad"
                            />
                        </View>
                        <RoundedInput
                            placeholder="Email Address"
                            value={email}
                            onChangeText={onChangeTextHandler.bind(null, appConstants.EMAIL)}
                            onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.EMAIL)}
                            maxLength={50}
                            ref={emailRef}
                            returnKeyType="done"
                            blurOnSubmit={true}
                        />
                        <RoundedInputButton
                            placeholder="Date of Birth"
                            onPress={setDatePickerVisibility.bind(null, true)}
                            value={dob ? moment(dob).format('DD-MM-YYYY') : ''}
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

export default EnterContactInformation
