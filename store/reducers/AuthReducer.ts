import { USER } from '../../types/UserResponse'
import * as authActions from '../actions/AuthActions'

type InitialStateType = {
    userData: USER | null
}

const initialState: InitialStateType = {
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
        case authActions.UPDATE_CURR_PASSWORD:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    'Mobile App Password': payload
                }
            }
        case 'FLUSH':
            return initialState;
        default:
            return state
    }
}
