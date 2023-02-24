import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Image, Keyboard, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useSelector } from "react-redux";

import images from "../assets/images";
import BackgroundImageComp from "../components/BackgroundImageComp";

import BoldText from "../components/BoldText";
import HeaderComponent from "../components/HeaderComponent";
import RegionButton from "../components/RegionButton";
import RegularText from "../components/RegularText";
import RoundedButton from "../components/RoundedButton";
import RoundedInput from "../components/RoundedInput";
import ScreenHeader from "../components/ScreenHeader";
import appConstants from "../constants/appConstants";

import colors from "../constants/colors";
import { getRegionIcon } from "../utils/GetConditionalIconHelper";
import { ErrorToast } from "../utils/ToastUtils";
import axios from '../axios.auth'
import useAccount from "../hooks/useAccount";
import AppLoader from "../components/AppLoader";
import { UserRespose } from "../types/UserResponse";
import moment from "moment";
import { LoaderContext } from "../context/LoaderContextProvider";

let userBasicInfo: UserRespose | undefined = undefined

const FetchMatriculationDetailsScreen = (props: any) => {
    const { navigation, route } = props
    const chapterId = useMemo(() => route?.params?.chapterId, [route])

    const { isLoading, getUserByAccountId } = useAccount()

    const [matriculationNumber, setMatriculationNumber] = useState('')
    const [details, setDetails] = useState<any>(null)

    const matriculationInputRef = useRef<TextInput>(null)

    const onChangeTextHandler = useCallback((key: any, value: string) => {
        switch (key) {
            case appConstants.MATRICULATION_INPUT:
                setMatriculationNumber(value);
                break
        }
    }, [])

    const onSubmitEditingHandler = useCallback((key: any) => {
        switch (key) {
            case appConstants.MATRICULATION_INPUT:
                Keyboard.dismiss()
                break
        }
    }, [])

    const nextPressHandler = useCallback(() => {
        try {
            if (!userBasicInfo?.searchResults.length) {
                return
            }
            const date = userBasicInfo?.searchResults[0]["DOB Day"]
            const month = userBasicInfo?.searchResults[0]["DOB Month"]
            const year = userBasicInfo?.searchResults[0]["DOB Year"]

            const dob = moment(`${date}/${month}/${year} 00:00:00`, "D/M/YYYY hh:mm:ss")

            const payloadToSend = {
                firstName: userBasicInfo?.searchResults[0]?.["First Name"],
                lastName: userBasicInfo?.searchResults[0]["Last Name"],
                accId: userBasicInfo?.searchResults[0]["Account ID"],
                phoneNumber: userBasicInfo?.searchResults[0]["Phone 1 Full Number (F)"]?.split('-').join('').split(' ').join(''),
                callingCode: userBasicInfo?.searchResults[0]["Phone 1 Area Code"],
                email: userBasicInfo?.searchResults[0]["Email 1"],
                dob: dob.unix() * 1000,
                address: userBasicInfo?.searchResults[0]["Full Street Address (F)"],
                state: userBasicInfo?.searchResults[0]["State/Province"],
                city: userBasicInfo?.searchResults[0].City,
                zipCode: userBasicInfo?.searchResults[0]["Zip Code"],
                profilePic: userBasicInfo?.searchResults[0]["Photo URL"]
            }

            navigation.navigate('enterContactInformation', payloadToSend)
        } catch (err: any) {
            console.log('[nextPressHandler] Error : ', err?.message)
            ErrorToast(appConstants.SOMETHING_WENT_WRONG)
        }
    }, [navigation])

    const onFetchDetailsHandler = useCallback(async () => {
        try {
            if (!matriculationNumber || !matriculationNumber.trim()) {
                ErrorToast("Enter your Matriculation Number to continue.")
                return
            }
            if (isNaN(+matriculationNumber)) {
                ErrorToast("Enter valid Matriculation Number to continue.")
                return
            }
            const data: UserRespose | undefined = await getUserByAccountId(+matriculationNumber.trim(), chapterId)
            if (data && typeof data !== "undefined") {
                userBasicInfo = data

                const confirmationData = {
                    profile: data.searchResults[0]["Photo URL"],
                    name: data.searchResults[0]["Full Name (F)"],
                    from: data.searchResults[0]["Year of Entry"]
                }
                setDetails(confirmationData)
            } else {
                setDetails(null)
            }
        } catch (err: any) {
            ErrorToast(err.message)
        }
    }, [matriculationNumber, getUserByAccountId])

    const renderDetailsHandler = useMemo(() => {
        if (details) {
            const { profile, name, from } = details
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ minHeight: 180, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.grey }}>
                        <Image
                            source={{ uri: profile }}
                            style={{
                                height: 70,
                                width: 70,
                                borderRadius: 50,
                                overflow: 'hidden',
                                marginBottom: 10
                            }}
                            resizeMode="contain"
                        />
                        <BoldText style={{ textAlign: 'center' }}>
                            {name}
                        </BoldText>
                        <RegularText style={{ textAlign: 'center', marginTop: 5 }}>
                            {from}
                        </RegularText>
                    </View>

                    <BoldText style={{ textAlign: 'center', marginTop: 20 }}>
                        {"is this you ?"}
                    </BoldText>
                    <RegularText style={{ textAlign: 'center', marginTop: 5 }}>
                        {"Click the below button to claim your account."}
                    </RegularText>

                </View>
            )
        } else {
            return null
        }
    }, [details])

    const loaderContext = useContext(LoaderContext)

    useEffect(() => {
        loaderContext.toggleLoader(isLoading)
    }, [isLoading, loaderContext])

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
                    <View style={{ flex: 1, paddingHorizontal: 30 }}>
                        <BoldText style={{ fontSize: 22, alignSelf: 'center', textAlign: 'center' }}>
                            {"Enter Your Matriculation Number"}
                        </BoldText>
                        <View style={{ marginVertical: 10 }}>
                            <RoundedInput
                                ref={matriculationInputRef}
                                placeholder="Matriculation Number"
                                value={matriculationNumber}
                                maxLength={15}
                                keyboardType="number-pad"
                                blurOnSubmit={true}
                                returnKeyType="done"
                                onChangeText={onChangeTextHandler.bind(null, appConstants.MATRICULATION_INPUT)}
                                onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.MATRICULATION_INPUT)}
                            />
                            <Pressable
                                style={{
                                    position: 'absolute',
                                    top: 36,
                                    right: 20
                                }}
                                onPress={onFetchDetailsHandler}
                            >
                                <Image
                                    source={images.ic_send}
                                    style={{
                                        height: 20,
                                        width: 20,
                                    }}
                                    resizeMode="contain"
                                />
                            </Pressable>
                        </View>
                        {renderDetailsHandler}
                    </View>
                    <RoundedButton
                        style={{ borderRadius: 0 }}
                        onPress={nextPressHandler}
                        text={"Next"}
                        disabled={!details}
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

export default FetchMatriculationDetailsScreen
