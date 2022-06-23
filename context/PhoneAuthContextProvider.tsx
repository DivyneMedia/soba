import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import auth from '@react-native-firebase/auth';
import { ErrorToast } from '../utils/ToastUtils';

export const PhoneAuthContext = createContext<any>({
})

const styles = {
    container: {
        flex: 1
    }
}

let methodRef:any = null

export default (props: any) => {
    const { style, children } = props
    const confirmRef = useRef<any>({
        confirmation: null
    })

    const loggedInRef = useRef<any>({
        authorized: false
    })

    const onAuthStateChangeHandler = useCallback((userData) => {
        try {
            if (userData) {
                loggedInRef.current.authorized = true
            } else {
                loggedInRef.current.authorized = false
            }
        } catch (err: any) {
            console.log('[onAuthStateChangeHandler] Error : ', err.message)
        }
    }, [])

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(onAuthStateChangeHandler)
        return unsubscribe
    }, [])

    const createAccount = useCallback(async (phoneNumber) => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            confirmRef.current = {
                confirmation
            }
        }  catch (err: any) {
            console.log('[createAccount] - Error : ', err.message)
            let errorMessage = 'Something went wrong at sending OTP.'
            switch (err?.code) {
                case 'auth/invalid-phone-number':
                    errorMessage = 'Enter a valid phone number.'
                    break
                case 'auth/phone-number-already-exists':
                    errorMessage = 'Phone number already exist.'
                    break
                case 'auth/too-many-requests':
                    errorMessage = 'Limit exceeded for sending verification codes, please try after some time.'
                    break
                case 'auth/network-request-failed':
                    errorMessage = 'Check your network connection.'
                    break
                default:
                    errorMessage = err?.message ?? 'Something went wrong at sending OTP.'
                    break
            }
            ErrorToast(errorMessage)
            throw new Error(errorMessage)
        }
    }, [])

    const verifyAccount = useCallback(async (code) => {
        try {
            if (confirmRef.current && confirmRef.current?.confirmation) {
                const userData: any = await confirmRef.current.confirmation.confirm(code)
                if (userData) {
                    loggedInRef.current.authorized = true
                    // const { additionalUserInfo, user } = userData
                    // if (additionalUserInfo) {
                    //     const {
                    //         isNewUser,
                    //         profile,
                    //         providerId,
                    //         username
                    //     } = additionalUserInfo
                    // }

                    // if (user) {
                    //     const { uid } = user
                    // }
                    return true
                } else {
                    throw new Error("Something went wrong at verifing account.")
                }
            } else {
                throw new Error("Something went wrong at verifing account.")
            }
        }  catch (err: any) {
            console.log('[verifyAccount] - Error : ', err.message)
            let errorMessage = 'Something went wrong at sending OTP.'
            switch (err?.code) {
                case 'auth/invalid-verification-code':
                    errorMessage = 'The sms verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.'
                    break
                case 'auth/session-expired':
                    errorMessage = 'The sms code has expired. Please re-send the verification code to try again.'
                    break
                case 'auth/invalid-phone-number':
                    errorMessage = 'Enter a valid phone number.'
                    break
                case 'auth/phone-number-already-exists':
                    errorMessage = 'Phone number already exist.'
                    break
                case 'auth/too-many-requests':
                    errorMessage = 'Limit exceeded for sending verification codes, please try after some time.'
                    break
                case 'auth/network-request-failed':
                    errorMessage = 'Check your network connection.'
                    break
                default:
                    errorMessage = err?.message ?? 'Something went wrong at sending OTP.'
                    break
            }
            if (!loggedInRef.current.authorized) {
                ErrorToast(errorMessage)
            }
            return loggedInRef.current.authorized ?? false
        }
    }, [])

    return (
        <PhoneAuthContext.Provider value={{
            createAccount,
            verifyAccount
        }}>
            <View style={styles.container}>
                {children}
            </View>
        </PhoneAuthContext.Provider>
    )
}