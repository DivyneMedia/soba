import { useCallback, useEffect, useRef, useState } from 'react'
import firestore from '@react-native-firebase/firestore'

import axios from '../axios.auth'
import appConstants from '../constants/appConstants'

const users = "users"
const usersCollection = firestore().collection(users)

export const getCurrFirestoreTimeStamp = () => firestore.FieldValue.serverTimestamp()

type UserAccDeails = {
    accId: string,
    uid: string
    phoneNumber: string
    username: string
    password: string
}

const useFirebase = () => {
    // **States
    const [isLoading, setLoading] = useState(false)

    // **Refs
    const mountedRef = useRef(false)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    const toggleLoader = useCallback((status: boolean) => {
        mountedRef.current && setLoading(status)
    }, [])

    const createUserAcc = useCallback(async (userAccDetails: UserAccDeails) => {
        try {
            const {
                accId,
                uid,
                username,
                password,
                phoneNumber
            } = userAccDetails
            
            toggleLoader(true)
            try {
                await axios.patch(`/accounts/${accId}`, {
                    "individualAccount": {
                        "accountCustomFields": [
                            {
                                "id": "86",
                                "name": "Mobile App Username",
                                "value": username
                            },
                            {
                                "id": "87",
                                "name": "Mobile App Password",
                                "value": password
                            },
                            {
                                "id": "85",
                                "name": "Mobile App Account Claimed",
                                "value": true
                            },
                            {
                                "id": "89",
                                "name": "Mobile App Firebase UID",
                                "value": uid
                            }
                        ]
                    }
                })
            } catch (err: any) {
                throw new Error(appConstants.SOMETHING_WENT_WRONG)
            }

            const currFirebaseTimeStamp = getCurrFirestoreTimeStamp()

            await usersCollection.doc(uid).set({
                crmAccId: accId,
                uid,
                username,
                phoneNumber,
                fcmToken: '',
                createdAt: currFirebaseTimeStamp,
                updatedAt: currFirebaseTimeStamp,
                isDeleted: false
            })
            return true
        } catch (err: any) {
            console.log('[createUserAcc] Error : ', err?.message)
            throw new Error(appConstants.SOMETHING_WENT_WRONG)
        } finally {
            toggleLoader(false)
        }
    }, [])

    return {
        isLoading,
        createUserAcc
    }
}

export default useFirebase
