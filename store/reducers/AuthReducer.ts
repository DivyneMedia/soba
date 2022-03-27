import * as authActions from '../actions/AuthActions'

const initialState = {
    userData: null
}

type ActionType = {
    type: string,
    payload: any
}

export default (state = initialState, action: ActionType) => {
    const { type, payload } = action
    switch (type) {
        case authActions.LOGIN:
            return {
                ...state,
                userData: {
                    ...payload
                }
            }
        case authActions.SIGNUP:
            return state
        case authActions.SET_REGION:
            return {
                ...state,
                regionId: payload
            }
        case authActions.SET_CHAPTER:
            return {
                ...state,
                chapterId: payload
            }
        case authActions.SET_CHAPTERS:
            return {
                ...state,
                chapters: payload
            }
        case authActions.LOGOUT:
            return initialState
        default:
            return state
    }
}
