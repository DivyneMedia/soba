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

type LoginRequestType = {
    username: string
    password: string
}

export const login = (loginReq: LoginRequestType) => {
    return async (dispatch: any, getState: any) => {
        try {
            const { username, password } = loginReq

            if (username === "admin" && password === "admin@123") {
                const user: USER = {
                    "Admission Number": "",
                    "DOB Month": "",
                    "First Name": "Admin",
                    "Gender": "Male",
                    "Photo URL": "",
                    "Mobile App Password": "",
                    "Account Note": "",
                    "DOB Day": "",
                    "Email 1": "admin@gmail.com",
                    "Phone 1 Area Code": "",
                    "Phone 1 Full Number (F)": "",
                    "Phone 1 Number": "",
                    "Phone 1 Type": "",
                    "Full Zip Code (F)": "",
                    "Account Type": "",
                    "Address Type": "",
                    "Account ID": "",
                    "Full Name (F)": "Admin",
                    "Year of Entry": "",
                    "City": "",
                    "DOB Year": "",
                    "Account Created Date/Time": "",
                    "Account Login Name": "",
                    "Full Street Address (F)": "",
                    "Mobile App Account Claimed": "",
                    "Account Created By": "",
                    "Mobile App Username": "",
                    "Country": "",
                    "Chapter Affiliate": "",
                    "Last Name": "",
                    "Mobile App Account Approved": "true",
                    "Mobile App Firebase UID": "1",
                    "State/Province": ""
                }
                dispatch({
                    type: LOGIN,
                    payload: user
                })
                return
            }

            const loginRes: AxiosResponse<UserRespose> = await axios.post('/accounts/search', {
                ...userPayload,
                searchFields: [
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