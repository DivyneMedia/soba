import React, { useCallback, useMemo, useRef, useState } from "react";
import { Image, Keyboard, Pressable, ScrollView, StyleSheet, View }  from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import colors from "../constants/colors";

import BoldText from "../components/BoldText";
import images from "../assets/images";
import RegularText from "../components/RegularText";
import MembershipSymbol from "../components/MembershipPlanSymbol";
import ProfileButton from "../components/ProfileButton";
import HorizontalRular from "../components/HorizontalRular";
import RoundedInput from "../components/RoundedInput";
import appConstants from "../constants/appConstants";
import RoundedInputButton from "../components/RoundedInputButton";

type EditProfileScreenProps = {
    navigation: any
    route: any
}

const EditProfileScreen = (props: EditProfileScreenProps) => {
    const { navigation, route } = props

    const [showImagePicker, setShowImagePicker] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    
    const [email, setEmail] = useState('petchu87@yahoo.com')
    const [phoneNumber, setPhoneNumber] = useState('+1 (804) 605-3051')
    const [dob, setDob] = useState('July 26, 1987')
    const [address, setAddress] = useState('11788 Culebra Rd, San Antonio, TX 78253')
    const [baseChapter, setBaseChapter] = useState('SOBA Dallas')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    
    const emailRef = useRef(null)
    const phoneRef = useRef(null) 
    const addressRef = useRef(null) 
    const baseChapterRef = useRef(null) 
    const passwordRef = useRef(null) 
    const confirmPasswordRef = useRef(null)

    const onChangeTextHandler = useCallback((key: any, value: string) => {
        switch (key) {
            case appConstants.EMAIL:
                setEmail(value)
                break
            case appConstants.PHONE:
                setPhoneNumber(value)
                break
            case appConstants.ADDRESS:
                setAddress(value)
                break
            case appConstants.BASE_CHAPTER:
                setBaseChapter(value)
                break
            case appConstants.PASSWORD:
                setPassword(value)
                break
            case appConstants.CONF_PASSWORD:
                setConfPassword(value)
                break
        }
    }, [])

    const onSubmitEditingHandler = useCallback((key: any, value?: any) => {
        switch (key) {
            case appConstants.EMAIL:
                phoneRef.current?.focus()
                break
            case appConstants.PHONE:
                Keyboard.dismiss()
                break
            case appConstants.DOB:
                setDob(value)
                break
            case appConstants.ADDRESS:
                baseChapterRef.current?.focus()
                break
            case appConstants.BASE_CHAPTER:
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

    const updateProfileHandler = useCallback(() => {
        try {
            navigation?.goBack()
        } catch (err: any) {
            console.log('[onEditPressHandler] Error : ', err?.message)
        }
    }, [navigation])

    return (
        <ScrollView style={styles.root}>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={onSubmitEditingHandler.bind(null, appConstants.DOB)}
                onCancel={setDatePickerVisibility.bind(null, false)}
            />
            <View style={styles.headerContainer} >
                <ProfileButton
                    profileImageUri={images.ic_account}
                    onPress={setShowImagePicker.bind(null, true)}
                />
                <BoldText style={{ marginTop: 20 }}>{"Philbert Mac Etchu"}</BoldText>
                <View style={styles.plansContainer}>
                    <MembershipSymbol icon={images.ic_red_symbol} />
                    <MembershipSymbol icon={images.ic_blue_symbol} />
                    <MembershipSymbol icon={images.ic_green_symbol} />
                    <MembershipSymbol icon={images.ic_yellow_symbol} />
                </View>
                <RegularText style={{ fontSize: 12 }}>{'SOBA 2000'}</RegularText>
                <RegularText style={{ fontSize: 12 }}>{'7443'}</RegularText>
            </View>
            <HorizontalRular />
            <View style={styles.profileDetailsContainer}>
                <RoundedInput
                    placeholder="email or username"
                    value={email}
                    onChangeText={onChangeTextHandler.bind(null, appConstants.EMAIL)}
                    onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.EMAIL)}
                    maxLength={50}
                    ref={emailRef}
                />
                <RoundedInput
                    placeholder="Phone no."
                    value={phoneNumber}
                    onChangeText={onChangeTextHandler.bind(null, appConstants.PHONE)}
                    onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.PHONE)}
                    keyboardType="number-pad"
                    maxLength={20}
                    ref={phoneRef}
                />
                 <RoundedInputButton
                    placeholder="Date of Birth"
                    onPress={setDatePickerVisibility.bind(null, true)}
                    value={dob ? new Date(dob).toLocaleDateString() : ''}
                />
                <RoundedInput
                    placeholder="Address"
                    value={address}
                    onChangeText={onChangeTextHandler.bind(null, appConstants.ADDRESS)}
                    onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.ADDRESS)}
                    maxLength={200}
                    ref={addressRef}
                />
                <RoundedInput
                    placeholder="Base Chapter"
                    value={baseChapter}
                    onChangeText={onChangeTextHandler.bind(null, appConstants.BASE_CHAPTER)}
                    onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.BASE_CHAPTER)}
                    maxLength={50}
                    ref={addressRef}
                />
                <RoundedInput
                    placeholder="password"
                    value={password}
                    onChangeText={onChangeTextHandler.bind(null, appConstants.PASSWORD)}
                    onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.PASSWORD)}
                    blurOnSubmit={true}
                    secureTextEntry={true}
                    maxLength={15}
                    ref={passwordRef}
                    password
                />
                <RoundedInput
                    placeholder="confirm password"
                    value={confPassword}
                    onChangeText={onChangeTextHandler.bind(null, appConstants.CONF_PASSWORD)}
                    onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.CONF_PASSWORD)}
                    blurOnSubmit={true}
                    secureTextEntry={true}
                    returnKeyType="done"
                    maxLength={15}
                    ref={confirmPasswordRef}
                    password
                />
            </View>
            <HorizontalRular />
            <Pressable
                onPress={updateProfileHandler}
                style={{
                    marginVertical: 20,
                    alignSelf: 'center'
                }}
            >
                <Image
                    source={images.ic_ok}
                    style={{
                        height: 48,
                        width: 48
                    }}
                    resizeMode="contain"
                />
            </Pressable>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.white
    },
    headerContainer: {
        paddingTop: 30,
        flexShrink: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plansContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    profileDetailsContainer: {
        flex: 1,
        paddingHorizontal: 20
    },
    actionsContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        marginTop: 10
    },
})

export default EditProfileScreen
