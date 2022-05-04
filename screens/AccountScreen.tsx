import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { BackHandler, Button, ScrollView, StyleSheet, View }  from 'react-native';
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

import Animated, {
    useAnimatedStyle,
    interpolateColor,
    Extrapolate,
    interpolate,
  } from "react-native-reanimated";

import { useDispatch } from "react-redux";
import * as authActions from '../store/actions/AuthActions'
import { SuccessToast } from "../utils/ToastUtils";
import CustomBackdrop from "../components/CustomBackdrop";
import Root from "../components/RootComponent";

type AccountScreenProps = {
    navigation: any
    route: any
}

const AccountScreen = (props: AccountScreenProps) => {
    const { navigation, route } = props
    const dispatch = useDispatch()

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const bottomSheetOpenStatusRef = useRef(false)

    // variables
    const snapPoints = useMemo(() => ['50%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    
    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
        bottomSheetOpenStatusRef.current = index !== -1
    }, []);

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
            bottomSheetModalRef.current?.present();
        } catch (err: any) {
            console.log('[onEditPressHandler] Error : ', err?.message)
        }
    }, [])

    const logoutHandler = useCallback(async () => {
        try {
            await dispatch(authActions.logout())
            SuccessToast("Logged Successfully.")
        } catch (err: any) {
            console.log('[onEditPressHandler] Error : ', err?.message)
        }
    }, [])

    const androidBackButtonPressHandler = useCallback(() => {
        if (bottomSheetOpenStatusRef.current) {
            bottomSheetModalRef.current?.close()
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
            <Root style={styles.container}>
                <ScrollView style={styles.root}>
                    <View style={styles.headerContainer} >
                        <ProfileButton
                            profileImageUri={images.ic_account}
                            onPress={editProfileHandler}
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
                        <TitleText
                            logo={images.ic_email}
                            title={"Email address"}
                            text={"petchu87@yahoo.com"}
                        />
                        <TitleText
                            logo={images.ic_phone}
                            title={"Phone No."}
                            text={"+1 (804) 605-3051"}
                        />
                        <TitleText
                            logo={images.ic_acc_calendar}
                            title={"Date of Birth"}
                            text={"July 26, 1987"}
                        />
                        <TitleText
                            logo={images.ic_address}
                            title={"Address"}
                            text={"11788 Culebra Rd, San Antonio, TX 78253"}
                        />
                        <TitleText
                            logo={images.ic_chapter}
                            title={"Base Chapter"}
                            text={"SOBA Dallas"}
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
                            icon={images.ic_logout}
                            text="Log out"
                            onPress={logoutHandler}
                        />
                    </View>
                </ScrollView>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    backdropComponent={(props: BottomSheetBackdropProps) => <CustomBackdrop {...props} onPress={() => bottomSheetModalRef.current.close()} />}
                    enableDismissOnClose={true}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <BoldText>{"Philbert Mac Etchu"}</BoldText>
                        <View style={styles.plansContainer}>
                            <MembershipSymbol icon={images.ic_red_symbol} />
                            <MembershipSymbol icon={images.ic_blue_symbol} />
                            <MembershipSymbol icon={images.ic_green_symbol} />
                            <MembershipSymbol icon={images.ic_yellow_symbol} />
                        </View>
                        <QRCode
                            value="Just some string value"
                            size={200}
                        />
                    </View>
                </BottomSheetModal>
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
