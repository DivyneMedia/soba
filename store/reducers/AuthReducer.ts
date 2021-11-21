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
            return state
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
        default:
            return state
    }
}
