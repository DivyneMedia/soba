import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Alert, BackHandler, ScrollView, StyleSheet, View }  from 'react-native';
import colors from "../constants/colors";
import {
    BottomSheetBackdropProps,
    BottomSheetBackgroundProps,
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import QRCode from 'react-native-qrcode-svg';

import BoldText from "../components/BoldText";
import images from "../assets/images";
import RegularText from "../components/RegularText";
import MembershipSymbol from "../components/MembershipPlanSymbol";
import TitleText from "../components/TitleText";
import TextLogoButton from "../components/TextLogoButton";
import ProfileButton from "../components/ProfileButton";
import HorizontalRular from "../components/HorizontalRular";

import { useDispatch, useSelector } from "react-redux";
import * as authActions from '../store/actions/AuthActions'
import { SuccessToast } from "../utils/ToastUtils";
import CustomBackdrop from "../components/CustomBackdrop";
import Root from "../components/RootComponent";
import { USER } from "../types/UserResponse";
import moment from "moment";
import QrCodeModal, { QrCodeModalRefTypes } from "../components/QrCodeModal";
import ChangePasswordModal from "../components/ChangePasswordModal";

type AccountScreenProps = {
    navigation: any
    route: any
}

const AccountScreen = (props: AccountScreenProps) => {
    const { navigation, route } = props
    const dispatch = useDispatch()

    const userData: USER = useSelector((state: any) => state.auth?.userData)

    // refs
    const qrCodeModalRef = useRef<QrCodeModalRefTypes>(null)
    const changePasswordModalRef = useRef<QrCodeModalRefTypes>(null)

    const editProfileHandler = useCallback(() => {
        try {
            navigation.navigate('editProfile')
        } catch (err: any) {
            console.log('[onEditPressHandler] Error : ', err?.message)
        }
    }, [navigation])

    const showMembershipPlanHandler = useCallback(() => {
        try {
        } catch (err: any) {
            console.log('[onEditPressHandler] Error : ', err?.message)
        }
    }, [])

    const showQrCodeHandler = useCallback(() => {
        try {
            qrCodeModalRef.current?.show()
        } catch (err: any) {
            console.log('[onEditPressHandler] Error : ', err?.message)
        }
    }, [])

    const changePasswordHandler = useCallback(() => {
        changePasswordModalRef.current?.show()
    }, [])

    const logoutHandler = useCallback(async () => {
        try {
            Alert.alert(
                'Are you sure?',
                'You are about to logout from the app.',
                [
                    {
                        onPress: async () => {
                            await dispatch(authActions.logout())
                            SuccessToast("Logged Successfully.")
                        },
                        style: 'destructive',
                        text: 'LOGOUT'
                    },
                    {
                        style: 'cancel',
                        text: 'Cancel'
                    },
                ]
            )
        } catch (err: any) {
            console.log('[onEditPressHandler] Error : ', err?.message)
        }
    }, [])

    const onBaseChapterPressHandler = useCallback(() => {
        navigation.navigate('executives', {
            chapter: 'Dallas'
        })
    }, [navigation])

    const androidBackButtonPressHandler = useCallback(() => {
        const qrCodeModalVisibility = qrCodeModalRef.current?.isVisible?.current
        const changePasswordModalVisibility = changePasswordModalRef.current?.isVisible?.current
        if (qrCodeModalVisibility) {
            qrCodeModalRef.current?.hide()
            return true
        } else if (changePasswordModalVisibility) {
            changePasswordModalRef.current?.hide()
            return true
        } else {
            return false
        }
    }, [])

    useEffect(() => {
        const backHandlerEvent = BackHandler.addEventListener("hardwareBackPress", androidBackButtonPressHandler)
        return () => backHandlerEvent.remove()
    }, [androidBackButtonPressHandler])

    return (
        <BottomSheetModalProvider>
            <QrCodeModal
                ref={qrCodeModalRef}
            />
            <ChangePasswordModal
                ref={changePasswordModalRef}
            />
            <Root style={styles.container}>
                <ScrollView style={styles.root}>
                    <View style={styles.headerContainer} >
                        <ProfileButton
                            profileImageUri={userData?.["Photo URL"]}
                            onPress={editProfileHandler}
                        />
                        <BoldText style={{ marginTop: 20 }}>{userData?.["Full Name (F)"] ?? '-'}</BoldText>
                        <View style={styles.plansContainer}>
                            <MembershipSymbol icon={images.ic_red_symbol} />
                            <MembershipSymbol icon={images.ic_blue_symbol} />
                            <MembershipSymbol icon={images.ic_green_symbol} />
                            <MembershipSymbol icon={images.ic_yellow_symbol} />
                        </View>
                        <RegularText style={{ fontSize: 12 }}>{`SOBA ${userData?.["Year of Entry"]}`}</RegularText>
                        <RegularText style={{ fontSize: 12 }}>{userData?.["Admission Number"] ?? '-'}</RegularText>
                    </View>
                    <HorizontalRular />
                    <View style={styles.profileDetailsContainer}>
                        <TitleText
                            logo={images.ic_email}
                            title={"Email address"}
                            text={userData?.["Email 1"] ?? '-'}
                        />
                        <TitleText
                            logo={images.ic_phone}
                            title={"Phone No."}
                            text={`+1 (${userData?.["Phone 1 Area Code"]}) ${userData?.["Phone 1 Number"]}` ?? '-'}
                        />
                        <TitleText
                            logo={images.ic_acc_calendar}
                            title={"Date of Birth"}
                            // text={"July 26, 1987"}
                            text={moment(`${userData?.["DOB Day"]}/${userData?.["DOB Month"]}/${userData?.["Year of Entry"]} 00:00:00`, "D/M/YYYY hh:mm:ss").format("MMMM DD, YYYY") ?? '-'}
                        />
                        <TitleText
                            logo={images.ic_address}
                            title={"Address"}
                            text={`${userData?.["Full Street Address (F)"]}, ${userData?.["State/Province"]}` ?? '-'}
                        />
                        <TitleText
                            logo={images.ic_chapter}
                            title={"Base Chapter"}
                            text={userData?.["Chapter Affiliate"] ?? '-'}
                            onPress={onBaseChapterPressHandler}
                        />
                    </View>
                    <HorizontalRular />
                    <View style={styles.actionsContainer}>
                        <TextLogoButton
                            icon={images.ic_ok}
                            text="Membership Plan"
                            onPress={showMembershipPlanHandler}
                        />
                        <TextLogoButton
                            icon={images.ic_show_qr_code}
                            text="Show My QRCode"
                            onPress={showQrCodeHandler}
                        />
                        <TextLogoButton
                            icon={images.ic_password}
                            text="Change Password"
                            onPress={changePasswordHandler}
                        />
                        <TextLogoButton
                            icon={images.ic_logout}
                            text="Log out"
                            onPress={logoutHandler}
                        />
                    </View>
                </ScrollView>
            </Root>
        </BottomSheetModalProvider>
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
    },
    actionsContainer: {
        flex: 1,
        // paddingHorizontal: 20,
        paddingBottom: 20,
        marginTop: 10
    },
    container: {
        flex: 1,
      },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.white
    },
})

export default AccountScreen
