import { AxiosResponse } from 'axios'
import axios from '../../axios.auth'
import appConstants from '../../constants/appConstants'
import { userPayload } from '../../model/UserData'
import { USER, UserRespose } from '../../types/UserResponse'
export const LOGIN = "LOGIN"
export const SIGNUP = "SIGNUP"
export const SET_REGION = "SET_REGION"
export const SET_CHAPTER = "SET_CHAPTER"
export const LOGOUT = "LOGOUT"
export const SET_CHAPTERS = "SET_CHAPTERS"

const loginWithUserNameRequest = (username: string, password: string) => [
    {
        "field": "Mobile App Username",
        "operator": "EQUAL",
        "value": username
    },
    {
        "field": "Mobile App Password",
        "operator": "EQUAL",
        "value": password
    }
]

const loginWithMatriculationRequest = (number: number, password: string) => [
    {
        "field": "Admission Number",
        "operator": "EQUAL",
        "value": number
    },
    {
        "field": "Mobile App Password",
        "operator": "EQUAL",
        "value": password
    }
]

type LoginRequestType = {
    username: string
    password: string
}

export const login = (loginReq: LoginRequestType) => {
    return async (dispatch: any, getState: any) => {
        try {
            const { username, password } = loginReq
            const loginRes: AxiosResponse<UserRespose> = await axios.post('/accounts/search', {
                ...userPayload,
                searchFields: isNaN(+username)
                    ? loginWithUserNameRequest(username, password)
                    : loginWithMatriculationRequest(+username, password)
            })

            if (loginRes && loginRes.data) {
                const {searchResults} = loginRes.data
                if (searchResults && Array.isArray(searchResults) && searchResults.length) {
                    dispatch({
                        type: LOGIN,
                        payload: searchResults[0]
                    })
                } else {
                    throw new Error("User not found, Please check details and try again.")
                }
            } else {
                throw new Error("User not found, Please check details and try again.")
            }
        } catch (err: any) {
            console.log('Error : ', err?.message)
            throw new Error(err?.message ?? appConstants.SOMETHING_WENT_WRONG)
        }
    }
}

export const setRegion = (region: number) => {
    return {
        type: SET_REGION,
        payload: region
    }
    // return (dispatch: Dispatch, getState: any) => {
    //     dispatch({
    //         type: SET_REGION,
    //         payload: region
    //     })
    // }
}

export const getChapters = () => {
    return async (dispatch: any) => {
        try {
            const getChaptersRes = await axios.get('/customFields/75')
            const { optionValues } = getChaptersRes.data
            dispatch({
                type: SET_CHAPTERS,
                payload: [...optionValues]
            })
        } catch (err: any) {
            console.log('[getChapters] Error : ', err?.message)
        }
    }
}

export const setChapter = (chapter: number) => {
    return {
        type: SET_CHAPTER,
        payload: chapter
    }
    // return (dispatch: Dispatch, getState: any) => {
    //     dispatch({
    //         type: SET_REGION,
    //         payload: region
    //     })
    // }
}

export const logout = () => {
    return async (dispatch: any, getState: any) => {
        dispatch({
            type: LOGOUT
        })
    }
}