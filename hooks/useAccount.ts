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
                        }
                    ]
                })
            } catch(err: unknown | AxiosError<any, any>) {
                // throw new Error(err.response)
                throw new Error(appConstants.SOMETHING_WENT_WRONG)
            }

            if (!accDetailsRes.data.searchResults.length) {
                throw new Error("Account not found.")
            }
            return accDetailsRes.data
        } catch (err: any) {
            console.log('[getUserByAccountId] Error : ', err?.message)
        } finally {
            toggleLoader(false)
        }
    }, [])

    return {
        isLoading,
        getUserByAccountId,
        getAvailableChapters
    }
}

export default useAccount
