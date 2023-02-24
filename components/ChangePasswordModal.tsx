import React, { forwardRef, Ref, useCallback, useImperativeHandle, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Keyboard, StyleSheet, TextInput, View } from 'react-native';
import {
    BottomSheetBackdropProps,
    BottomSheetModal,
} from '@gorhom/bottom-sheet';

import BoldText from "../components/BoldText";

import CustomBackdrop from "../components/CustomBackdrop";
import { useDispatch, useSelector } from "react-redux";
import { USER } from "../types/UserResponse";
import appConstants from "../constants/appConstants";
import RoundedInput from "./RoundedInput";
import Root from "./RootComponent";
import { height } from "../utils/MiscUtils";
import RoundedButton from "./RoundedButton";
import useAccount from "../hooks/useAccount";
import colors from "../constants/colors";
import { ErrorToast, SuccessToast } from "../utils/ToastUtils";
import { changePassword } from "../store/actions/AuthActions";

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

    const userData: USER = useSelector((state: any) => state?.auth?.userData)

    const dispatch = useDispatch()

    const {
        isLoading,
        changePasswordHandler
    } = useAccount()

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const bottomSheetOpenStatusRef = useRef(false)
    const currPasswordRef = useRef<TextInput>(null)
    const newPasswordRef = useRef<TextInput>(null)
    const newConfPasswordRef = useRef<TextInput>(null)

    // variables
    const snapPoints = useMemo(() => [height / 2], []);

    // callbacks
    const handlePresentModalPress = useCallback((newVisibility) => {
        if (newVisibility) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.close()
            setCurrPassword('')
            setNewPassword('')
            setNewConfPassword('')
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

    const savePasswordHandler = useCallback(async () => {
        try {
            if (!currPassword || !currPassword.trim()) {
                ErrorToast('Current Password Required!')
                return
            }
            if (currPassword.trim().length < 6) {
                ErrorToast('Current password should not less then 6 characters!')
                return
            }
            if (!newPassword || !newPassword.trim()) {
                ErrorToast('New Password Required!')
                return
            }
            if (newPassword.trim().length < 6) {
                ErrorToast('New Password should not less then 6 characters!')
                return
            }
            if (!newConfPassword || !newConfPassword.trim()) {
                ErrorToast('Confirm Password Required!')
                return
            }
            if (newConfPassword.trim().length < 6) {
                ErrorToast('Confirm Password should not less then 6 characters!')
                return
            }
            if (newConfPassword.trim() !== newPassword.trim()) {
                ErrorToast('New password and confirm password must be same!')
                return
            }
            if (currPassword.trim() !== userData?.["Mobile App Password"]?.trim()) {
                ErrorToast('Current password does not match!')
                return
            }
            if (currPassword.trim() === newPassword.trim()) {
                ErrorToast('Current password cannot be used as new password!')
                return
            }
            await changePasswordHandler(userData?.["Account ID"], newPassword)
            dispatch(changePassword(newPassword))
            SuccessToast('Password updated successfully!')
            handlePresentModalPress(false)
        } catch (err: any) {
            console.log('[savePasswordHandler] Error : ', err.message)
        }
    }, [
        currPassword,
        newPassword,
        newConfPassword,
        changePasswordHandler,
        handlePresentModalPress,
        userData,
        dispatch
    ])

    const passwordFields = useMemo(() => {
        return (
            <>
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
            </>
        )
    }, [currPassword, newPassword, newConfPassword, onChangeTextHandler, onSubmitEditingHandler])


    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={backDropComponent}
            enableDismissOnClose={true}
        >
            <Root style={styles.root}>
                <BoldText>{'Change Password'}</BoldText>
                {
                    isLoading
                        ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size={"large"} color={colors.primary} />
                        </View>
                        : passwordFields
                }
            </Root>
            <RoundedButton
                text="SAVE"
                onPress={savePasswordHandler}
                style={{ borderRadius: 0, height: 50 }}
                disabled={isLoading}
            />
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
