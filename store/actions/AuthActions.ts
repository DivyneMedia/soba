export const LOGIN = "LOGIN"
export const SIGNUP = "SIGNUP"
export const SET_REGION = "SET_REGION"
export const SET_CHAPTER = "SET_CHAPTER"

export const login = (loginReq: any) => {
    // return {
    //     type: LOGIN,
    //     payload: loginReq
    // }
    return async (dispatch: any, getState: any) => {
        dispatch({
            type: LOGIN,
            payload: loginReq
        })
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
