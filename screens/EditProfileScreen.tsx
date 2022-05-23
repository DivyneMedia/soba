import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Keyboard, StyleSheet, TextInput, View }  from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import colors from "../constants/colors";

import RegularText from "../components/RegularText";
import HorizontalRular from "../components/HorizontalRular";
import RoundedInput from "../components/RoundedInput";
import appConstants from "../constants/appConstants";
import RoundedInputButton from "../components/RoundedInputButton";
import RoundedButton from "../components/RoundedButton";
import Root from "../components/RootComponent";
import { useDispatch, useSelector } from "react-redux";
import { USER } from "../types/UserResponse";
import moment from "moment";
import { ErrorToast, SuccessToast } from "../utils/ToastUtils";
import useAccount from "../hooks/useAccount";
import { OPTION_VALUES } from '../types/UserResponse'
import SelectChapterModal from "../components/SelectChapterModal";
import { USER_DETAILS } from "../model/UserData";
import AppLoader from "../components/AppLoader";
import { login } from "../store/actions/AuthActions";

type EditProfileScreenProps = {
    navigation: any
    route: any
}

const EditProfileScreen = (props: EditProfileScreenProps) => {
    const { navigation, route } = props

    const userData: USER = useSelector((state: any) => state?.auth?.userData)

    const {
        isLoading,
        getAvailableChapters,
        updateUserAccountHandler,
        getUserAccountDetails,
        toggleLoader
    } = useAccount()

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

    const [userName, setUserName] = useState(userData?.["Mobile App Username"] ?? '')
    const [email, setEmail] = useState(userData?.["Email 1"] ?? '')
    const [phoneNumber, setPhoneNumber] = useState(userData?.["Phone 1 Full Number (F)"] ?? '')
    const [dob, setDob] = useState<any>(moment(`${userData?.["DOB Year"]}/${userData?.["DOB Month"]}/${userData?.["DOB Day"]} 00:00:00`, 'YYYY/MM/DD hh:mm:ss') ?? null)
    const [address, setAddress] = useState(userData?.["Full Street Address (F)"] ?? '')
    const [baseChapter, setBaseChapter] = useState<OPTION_VALUES>()

    const [chapters, setChapters] = useState<OPTION_VALUES[]>([])
    const [userDetails, setUserDetails] = useState<USER_DETAILS | null>(null)

    const dispatch = useDispatch()
    
    const userNameRef = useRef<TextInput>(null)
    const emailRef = useRef<TextInput>(null)
    const phoneRef = useRef<TextInput>(null) 
    const addressRef = useRef<TextInput>(null) 
    const baseChapterRef = useRef<TextInput>(null)
    const selectChapterModalRef = useRef<any>(null)

    useEffect(() => {
        getAvailableChapters()
        .then(res => {
            if (res && Array.isArray(res) && res.length) {
                setChapters(res)
                const userChapter = res.find((chapter: OPTION_VALUES) => {
                    return chapter.name.toLowerCase().includes(userData?.["Chapter Affiliate"]?.toLowerCase());
                })
                setBaseChapter(userChapter)
            }
        })
        .catch((err: any) => {
            console.log('Error : ', err.message)
        })
    }, [])

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

    const updateProfileHandler = useCallback(async () => {
        try {
            if (!userName || !userName.trim()) {
                ErrorToast('Username required.')
                return
            }
            if (!email || !email.trim()) {
                ErrorToast('Email address required.')
                return
            }
            if (!phoneNumber || !phoneNumber.trim()) {
                ErrorToast('Phone number required.')
                return
            }
            if (!dob) {
                ErrorToast('Date of birth required.')
                return
            }
            if (!address || !address.trim()) {
                ErrorToast('Date of birth required.')
                return
            }
            if (!baseChapter) {
                ErrorToast('Select base chapter to continue.')
                return
            }

            const fullDob = moment(dob).format('YYYY-MM-DD')

            const [year, month, date] = fullDob.split('-')

            const addressId = userDetails?.individualAccount.primaryContact.addresses.find(address => address.isPrimaryAddress)?.addressId
            console.log('addressId : ',addressId)
            if (!addressId) {
                throw new Error('No default address found.')
            }

            await updateUserAccountHandler(userData?.["Account ID"], {
                date,
                month,
                year,
                email,
                addressLine1: address.trim(),
                phone: phoneNumber,
                primaryAddressId: addressId,
                chapterId: baseChapter.id,
                chapterName: baseChapter.name
            })
            toggleLoader(true)
            await dispatch(login({
                username: userData?.["Mobile App Username"],
                password: userData?.["Mobile App Password"]
            }))
            toggleLoader(false)

            SuccessToast('Profile updated successfully')
        } catch (err: any) {
            toggleLoader(false)
            console.log('[onEditPressHandler] Error : ', err?.message)
            ErrorToast(err?.response?.data ?? err?.message ?? appConstants.SOMETHING_WENT_WRONG)
        }
    }, [
        navigation,
        userName,
        email,
        phoneNumber,
        dob,
        address,
        baseChapter,
        userDetails
    ])

    useEffect(() => {
        getUserAccountDetails(userData?.["Account ID"])
        .then((userDetailsRes) => {
            setUserDetails(userDetailsRes)
        })
        .catch((err: any) => {
            console.log('Error : ', err.message)
        })
    }, [getUserAccountDetails])

    return (
        <Root style={styles.root}>
            <AppLoader isVisible={isLoading} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={onSubmitEditingHandler.bind(null, appConstants.DOB)}
                onCancel={setDatePickerVisibility.bind(null, false)}
            />
            <SelectChapterModal
                ref={selectChapterModalRef}
                chapters={chapters}
                onSelect={(selected: OPTION_VALUES) => {
                    console.log('select : ',selected)
                    setBaseChapter(selected)
                    selectChapterModalRef.current.hide()
                }}
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
                    maxLength={15}
                    ref={userNameRef}
                    editable={false}
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
                {/* <RoundedInput
                    placeholder="Base Chapter"
                    value={baseChapter}
                    onChangeText={onChangeTextHandler.bind(null, appConstants.BASE_CHAPTER)}
                    onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.BASE_CHAPTER)}
                    maxLength={50}
                    ref={addressRef}
                /> */}
                <RoundedInputButton
                    placeholder="Base Chapter"
                    hideIcon
                    onPress={() => {
                        selectChapterModalRef.current.show()
                    }}
                    value={baseChapter?.name ? baseChapter.name :  '-'}
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
