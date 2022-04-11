import * as ChatActions from '../actions/chatActions'

const initialState = {
    userChats: [],
    approvalChat: []
}

export default (state = initialState, action: any) =>{
    const { type, payload } = action
    switch (type) {
        default:
            return state
    }
}