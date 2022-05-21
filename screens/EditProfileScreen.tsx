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
import RoundedButton from "../components/RoundedButton";
import Root from "../components/RootComponent";
import { useSelector } from "react-redux";
import { USER } from "../types/UserResponse";

type EditProfileScreenProps = {
    navigation: any
    route: any
}

const EditProfileScreen = (props: EditProfileScreenProps) => {
    const { navigation, route } = props

    const userData: USER = useSelector((state: any) => state?.auth?.userData)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

    const [userName, setUserName] = useState('petchu87@yahoo.com')
    const [email, setEmail] = useState('petchu87@yahoo.com')
    const [phoneNumber, setPhoneNumber] = useState('+1 (804) 605-3051')
    const [dob, setDob] = useState('July 26, 1987')
    const [address, setAddress] = useState('11788 Culebra Rd, San Antonio, TX 78253')
    const [baseChapter, setBaseChapter] = useState('SOBA Dallas')
    
    const userNameRef = useRef(null)
    const emailRef = useRef(null)
    const phoneRef = useRef(null) 
    const addressRef = useRef(null) 
    const baseChapterRef = useRef(null) 

    const onChangeTextHandler = useCallback((key: any, value: string) => {
        switch (key) {
            case appConstants.USERNAME:
                setUserName(value)
                break
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
        }
    }, [])

    const onSubmitEditingHandler = useCallback((key: any, value?: any) => {
        switch (key) {
            case appConstants.USERNAME:
                emailRef.current?.focus()
                break
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
                // passwordRef.current?.focus()
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
        <Root style={styles.root}>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={onSubmitEditingHandler.bind(null, appConstants.DOB)}
                onCancel={setDatePickerVisibility.bind(null, false)}
            />
            <View style={styles.headerContainer} >
                <Image
                    source={{ uri: userData?.["Photo URL"] }}
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: 50,
                        overflow: 'hidden'
                    }}
                    resizeMode="contain"
                />
                <RegularText
                    style={{
                        fontSize: 12,
                        marginTop: 10,
                        color: colors.primary
                    }}
                >
                        {'Update Profile Image'}
                </RegularText>
            </View>
            <HorizontalRular />
            <View style={styles.profileDetailsContainer}>
                <RoundedInput
                    placeholder="Username"
                    value={userName}
                    onChangeText={onChangeTextHandler.bind(null, appConstants.EMAIL)}
                    onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.EMAIL)}
                    maxLength={50}
                    ref={userNameRef}
                />
                <RoundedInput
                    placeholder="Email"
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
            </View>
            <HorizontalRular />
            <RoundedButton
                text="SAVE"
                style={{ borderRadius: 0, height: 50 }}
                onPress={updateProfileHandler}
            />
        </Root>
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
