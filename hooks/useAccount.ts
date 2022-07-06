import { AxiosError, AxiosResponse } from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'
import firestore from '@react-native-firebase/firestore'

import axios from '../axios.auth'
import appConstants from '../constants/appConstants'
import { UPDATE_USER_PAYLOAD, UPDATE_USER_PROFILE, userPayload } from '../model/UserData'
import { BASE_CUSTOM_FIELD_RESPONSE, OPTION_VALUES, UserRespose } from '../types/UserResponse'
import { ErrorToast } from '../utils/ToastUtils'

const useAccount = (chatChannelId?: string) => {
    const [isLoading, setLoading] = useState(false)
    const mountedRef = useRef(false)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    const toggleLoader = useCallback((status) => {
        mountedRef.current && setLoading(status)
    }, [])

    const getAvailableChapters = useCallback(async () => {
        try {
            toggleLoader(true)
            let availableChaptersRes: AxiosResponse<BASE_CUSTOM_FIELD_RESPONSE<OPTION_VALUES>>
            try {
                availableChaptersRes = await axios.get('/customFields/75')
            } catch(err: unknown | AxiosError<any, any> | any) {
                // throw new Error(err.response)
                throw new Error(err?.response?.data ?? err?.message ?? appConstants.SOMETHING_WENT_WRONG)
            }

            if (!availableChaptersRes.data.optionValues.length) {
                throw new Error(appConstants.SOMETHING_WENT_WRONG)
            }

            return availableChaptersRes.data.optionValues
        } catch (err: any) {
            console.log('[getAvailableChapters] Error : ', err?.message)
            ErrorToast(err?.message ?? appConstants.SOMETHING_WENT_WRONG)
        } finally {
            toggleLoader(false)
        }
    }, [])

    const getUserByAccountId = useCallback(async (accountId: number) => {
        try {
            toggleLoader(true)
            let accDetailsRes: AxiosResponse<UserRespose>
            try {
                accDetailsRes = await axios.post('/accounts/search', {
                    ...userPayload,
                    searchFields: [
                        {
                            "field": "Admission Number",
                            "operator": "EQUAL",
                            "value": accountId
                        },
                        {
                            "field": "Mobile App Account Claimed",
                            "operator": "NOT_EQUAL",
                            "value": "true"
                        }
                    ]
                })
            } catch(err: any | unknown | AxiosError<any, any>) {
                // throw new Error(err.response)
                throw new Error(err?.response?.data ?? err?.message ?? appConstants.SOMETHING_WENT_WRONG)
            }

            if (!accDetailsRes.data.searchResults.length) {
                throw new Error("Account not found or already been claimed.")
            }
            return accDetailsRes.data
        } catch (err: any) {
            console.log('[getUserByAccountId] Error : ', err?.message)
            throw new Error(err?.message ?? appConstants.SOMETHING_WENT_WRONG)
        } finally {
            toggleLoader(false)
        }
    }, [])

    const approveUserAcc = useCallback(async (accountId: number, userFirestoreId: string) => {
        try {
            if (!accountId) {
                throw new Error(appConstants.SOMETHING_WENT_WRONG)
            }
            toggleLoader(true)

            await firestore()
            .collection(appConstants.privateChannel)
            .doc(chatChannelId)
            .update({
                isApproved: true
            })

            await firestore()
            .collection(appConstants.users)
            .doc(userFirestoreId)
            .update({
                isAccountApproved: true
            })

            // await firestore()
            // .collection(appConstants.users)
            // .where("crmAccId", "==", accountId)
            // .get()
            // .update({
            //     isApproved: true
            // })

            let accUpdateRes: AxiosResponse<any>
            try {
                accUpdateRes =
                    await axios.patch(`/accounts/${accountId}`, {
                    "individualAccount": {
                        "accountCustomFields": [
                            {
                                "id": "88",
                                "name": "Mobile App Account Approved",
                                "status": "ACTIVE",
                                "optionValues": [
                                    {
                                        "id": "46",
                                        "name": "false"
                                    },
                                    {
                                        "id": "47",
                                        "name": "true"
                                    }
                                ],
                                "value": "true"
                            }
                        ]
                    }
                })
            } catch(err: unknown | AxiosError<any, any>) {
                // throw new Error(err.response)
                throw new Error(appConstants.SOMETHING_WENT_WRONG)
            }

            if (!accUpdateRes.data) {
                throw new Error("Cannot approve account.")
            }
            return accUpdateRes.data
        } catch (err: any) {
            console.log('[approveUserAcc] Error : ', err?.message)
            throw new Error(err?.message ?? appConstants.SOMETHING_WENT_WRONG)
        } finally {
            toggleLoader(false)
        }
    }, [])

    const getUserAccountDetails = useCallback(async (crmId: any) => {
        try {
            toggleLoader(true)
            let userAccountDetails: AxiosResponse<any>
            try {
                userAccountDetails = await axios.get('/accounts/' + crmId)
            } catch(err: unknown | AxiosError<any, any>) {
                // throw new Error(err.response)
                throw new Error(appConstants.SOMETHING_WENT_WRONG)
            }

            if (!userAccountDetails) {
                throw new Error(appConstants.SOMETHING_WENT_WRONG)
            }

            return userAccountDetails.data
        } catch (err: any) {
            console.log('[getUserAccountDetails] Error : ', err?.message)
            throw new Error(err?.message ?? appConstants.SOMETHING_WENT_WRONG)
        } finally {
            toggleLoader(false)
        }
    }, [])

    const updateUserAccountDetails = useCallback(async (crmId: any, userPayload: UPDATE_USER_PAYLOAD) => {
        try {
            toggleLoader(true)
            let updateUserAccountDetailsRes: AxiosResponse<any>
            try {
                console.log('userPayload : ', userPayload)

                updateUserAccountDetailsRes = await axios.patch('/accounts/' + crmId,  {
                    "individualAccount": {
                        "primaryContact": {
                            "dob": {
                                "day": userPayload.date,
                                "month": userPayload.month,
                                "year": userPayload.year
                            },
                            "email1": userPayload.email,
                            "addresses": [
                                {
                                    "addressId": userPayload.primaryAddressId,
                                    "addressLine1": userPayload.addressLine1,
                                    "city": userPayload.city,
                                    "county": userPayload.county,
                                    "zipCode": userPayload.zipCode,
                                    // "zipCodeSuffix": "3188",
                                    "phone1": userPayload.phone
                                }
                            ]
                        }
                    }
                })

                if (!updateUserAccountDetailsRes) {
                    throw new Error(appConstants.SOMETHING_WENT_WRONG)
                }

                console.log('updateUserAccountDetailsRes.data : ', updateUserAccountDetailsRes.data)
    
                return updateUserAccountDetailsRes.data
            } catch(err: unknown | AxiosError<any, any>) {
                // throw new Error(err.response)
                console.log('[updateUserAccountDetails] Error : ', err?.response?.data ?? err?.message ?? appConstants.SOMETHING_WENT_WRONG)
                throw new Error(appConstants.SOMETHING_WENT_WRONG)
            } finally {
                toggleLoader(false)
            }
        } catch (err: any) {
            console.log('[updateUserAccountDetails] Error : ', err?.message)
            throw new Error(err?.message ?? appConstants.SOMETHING_WENT_WRONG)
        }
    }, [])

    const changePasswordHandler = useCallback(async (crmId: any, newPassword: string) => {
        try {
            toggleLoader(true)
            await axios.patch('/accounts/' + crmId, {
                individualAccount: {
                    accountCustomFields: [
                        {
                            id: "87",
                            name: "Mobile App Password",
                            value: newPassword
                        }
                    ]
                }
            })
            toggleLoader(false)
        } catch (err: any) {
            console.log('[changePasswordHandler] Error : ', err?.message)
            toggleLoader(false)
            throw new Error(err?.response?.data ?? err?.message ?? appConstants.SOMETHING_WENT_WRONG)
        }
    }, [])

    const updateUserAccountHandler = useCallback(async (crmId: any, userPayload: UPDATE_USER_PROFILE) => {
        try {
            toggleLoader(true)
            let updateUserAccountDetailsRes: AxiosResponse<any>
            try {
                updateUserAccountDetailsRes = await axios.patch('/accounts/' + crmId,  {
                    "individualAccount": {
                        "primaryContact": {
                            "dob": {
                                "day": userPayload.date,
                                "month": userPayload.month,
                                "year": userPayload.year
                            },
                            "email1": userPayload.email,
                            "addresses": [
                                {
                                    "addressId": userPayload.primaryAddressId,
                                    "addressLine1": userPayload.addressLine1,
                                    // "city": userPayload.city,
                                    // "county": userPayload.county,
                                    // "zipCode": userPayload.zipCode,
                                    "phone1": userPayload.phone
                                }
                            ]
                        }
                    }
                })

                if (!updateUserAccountDetailsRes) {
                    throw new Error(appConstants.SOMETHING_WENT_WRONG)
                }

                console.log('updateUserAccountDetailsRes.data : ', updateUserAccountDetailsRes.data)
    
                return updateUserAccountDetailsRes.data
            } catch(err: unknown | AxiosError<any, any>) {
                // throw new Error(err.response)
                console.log('[updateUserAccountDetails] Error : ', err?.response?.data ?? err?.message ?? appConstants.SOMETHING_WENT_WRONG)
                throw new Error(appConstants.SOMETHING_WENT_WRONG)
            } finally {
                toggleLoader(false)
            }
        } catch (err: any) {
            console.log('[updateUserAccountDetails] Error : ', err?.message)
            throw new Error(err?.message ?? appConstants.SOMETHING_WENT_WRONG)
        }
    }, [])

    return {
        isLoading,
        approveUserAcc,
        getUserByAccountId,
        getAvailableChapters,
        getUserAccountDetails,
        updateUserAccountDetails,
        updateUserAccountHandler,
        changePasswordHandler,
        toggleLoader
    }
}

export default useAccount
