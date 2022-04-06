import { AxiosError, AxiosResponse } from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'

import axios from '../axios.auth'
import appConstants from '../constants/appConstants'
import { userPayload } from '../model/UserData'
import { BASE_CUSTOM_FIELD_RESPONSE, OPTION_VALUES, UserRespose } from '../types/UserResponse'

const useAccount = () => {
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
            } catch(err: unknown | AxiosError<any, any>) {
                // throw new Error(err.response)
                throw new Error(appConstants.SOMETHING_WENT_WRONG)
            }

            if (!availableChaptersRes.data.optionValues.length) {
                throw new Error(appConstants.SOMETHING_WENT_WRONG)
            }

            return availableChaptersRes.data.optionValues
        } catch (err: any) {
            console.log('[getAvailableChapters] Error : ', err?.message)
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
            } catch(err: unknown | AxiosError<any, any>) {
                // throw new Error(err.response)
                throw new Error(appConstants.SOMETHING_WENT_WRONG)
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

    const approveUserAcc = useCallback(async (accountId: number) => {
        try {
            toggleLoader(true)
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
                                        "name": "No"
                                    },
                                    {
                                        "id": "47",
                                        "name": "Yes"
                                    }
                                ],
                                "value": "Yes"
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

    return {
        isLoading,
        approveUserAcc,
        getUserByAccountId,
        getAvailableChapters
    }
}

export default useAccount
