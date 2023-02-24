import React, { forwardRef, Ref, useCallback, useImperativeHandle, useMemo, useRef } from "react";
import { StyleSheet, View } from 'react-native';
import {
    BottomSheetBackdropProps,
    BottomSheetModal,
} from '@gorhom/bottom-sheet';
import QRCode from 'react-native-qrcode-svg';

import BoldText from "../components/BoldText";
import images from "../assets/images";
import MembershipSymbol from "../components/MembershipPlanSymbol";

import CustomBackdrop from "../components/CustomBackdrop";
import { useSelector } from "react-redux";
import { USER } from "../types/UserResponse";

type QrCodeModalProps = {}

export type QrCodeModalRefTypes = {
    show(): void,
    hide(): void,
    isVisible: Ref<any>
}

const QrCodeModal = forwardRef((_props: QrCodeModalProps, ref: any) => {
    // hooks
    const userData: USER = useSelector((state: any) => state.auth?.userData)

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const bottomSheetOpenStatusRef = useRef(false)

    // variables
    const snapPoints = useMemo(() => ['50%'], []);

    // callbacks
    const handlePresentModalPress = useCallback((newVisibility) => {
        if (newVisibility) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.close()
        }
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        bottomSheetOpenStatusRef.current = index !== -1
    }, []);

    const imperativeHandler = useCallback(() => {
        return {
            show: handlePresentModalPress.bind(null, true),
            hide: handlePresentModalPress.bind(null, false),
            isVisible: bottomSheetOpenStatusRef
        }
    }, [handlePresentModalPress])

    useImperativeHandle(ref, imperativeHandler)

    const backDropComponent = useCallback((props: BottomSheetBackdropProps) => {
        return (
            <CustomBackdrop
                {...props}
                onPress={handlePresentModalPress.bind(null, false)}
            />
        )
    }, [handlePresentModalPress])


    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={backDropComponent}
            enableDismissOnClose={true}
        >
            <View style={styles.root}>
                <BoldText>{userData?.["Full Name (F)"] ?? '-'}</BoldText>
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
    )
})

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    plansContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
})

export default QrCodeModal
