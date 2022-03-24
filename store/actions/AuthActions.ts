import axios from '../../axios.auth'
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

            const loginRes = await axios.post('/accounts/search', {
                outputFields: [
                    "Account Created By",
                    "Account Created Date/Time",
                    "Account ID",
                    "Account Login Name",
                    "Account Note",
                    "Account Type",
                    "Address Type",
                    "City",
                    "Country",
                    "DOB Day",
                    "DOB Month",
                    "DOB Year",
                    "Email 1",
                    "First Name",
                    "Last Name",
                    "Full Name (F)",
                    "Full Street Address (F)",
                    "Full Zip Code (F)",
                    "Gender",
                    "Photo URL",
                    75,
                    77,
                    83,
                    85,
                    86,
                    87
                ],
                pagination: {
                    currentPage: 0,
                    pageSize: 20
                },
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

            console.log('loginRes : ', loginRes.data)

            // dispatch({
            //     type: LOGIN,
            //     payload: loginReq
            // })
        } catch (err: any) {
            console.log('Error : ', err?.message)
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
            type: LOGOUT,
            payload: {
                isLoggedIn:false
            }
        })
    }
}