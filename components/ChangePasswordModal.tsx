import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Keyboard, StyleSheet, TextInput, View }  from 'react-native';
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
import appConstants from "../constants/appConstants";
import RoundedInput from "./RoundedInput";

type ChangePasswordModalProps = {}

export type ChangePasswordModalRefTypes = {
    show(): void,
    hide(): void,
    isVisible: Ref<any>
}

const ChangePasswordModal = forwardRef((_props: ChangePasswordModalProps, ref: any) => {
    // hooks
    const [currPassword, setCurrPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newConfPassword, setNewConfPassword] = useState('')

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const bottomSheetOpenStatusRef = useRef(false)
    const currPasswordRef = useRef<TextInput>(null)
    const newPasswordRef = useRef<TextInput>(null)
    const newConfPasswordRef = useRef<TextInput>(null)

    // variables
    const snapPoints = useMemo(() => ['70%'], []);

    // callbacks
    const handlePresentModalPress = useCallback((newVisibility) => {
        if (newVisibility) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.close()
        }
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
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

    const onChangeTextHandler = useCallback((key: any, value: string) => {
        switch (key) {
            case appConstants.PASSWORD:
                setCurrPassword(value)
                break
            case appConstants.NEW_PASSWORD:
                setNewPassword(value)
                break
            case appConstants.CONF_PASSWORD:
                setNewConfPassword(value)
                break
        }
    }, [])

    const onSubmitEditingHandler = useCallback((key: any) => {
        switch (key) {
            case appConstants.PASSWORD:
                newPasswordRef.current?.focus()
                break
            case appConstants.NEW_PASSWORD:
                newConfPasswordRef.current?.focus()
                break
            case appConstants.CONF_PASSWORD:
                Keyboard.dismiss()
                break
        }
    }, [])


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
                <BoldText>{'Change Password'}</BoldText>
                <RoundedInput
                    placeholder="Current Password"
                    value={currPassword}
                    onChangeText={onChangeTextHandler.bind(null, appConstants.PASSWORD)}
                    onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.PASSWORD)}
                    secureTextEntry={true}
                    returnKeyType="next"
                    maxLength={15}
                    ref={currPasswordRef}
                    password
                />
                <RoundedInput
                    placeholder="New Password"
                    value={newPassword}
                    onChangeText={onChangeTextHandler.bind(null, appConstants.NEW_PASSWORD)}
                    onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.NEW_PASSWORD)}
                    secureTextEntry={true}
                    returnKeyType="next"
                    maxLength={15}
                    ref={newPasswordRef}
                    password
                />
                <RoundedInput
                    placeholder="Confirm Password"
                    value={newConfPassword}
                    onChangeText={onChangeTextHandler.bind(null, appConstants.CONF_PASSWORD)}
                    onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.CONF_PASSWORD)}
                    blurOnSubmit={true}
                    secureTextEntry={true}
                    returnKeyType="done"
                    maxLength={15}
                    ref={newConfPasswordRef}
                    password
                />
            </View>
        </BottomSheetModal>
    )
})

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    plansContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
})

export default ChangePasswordModal
