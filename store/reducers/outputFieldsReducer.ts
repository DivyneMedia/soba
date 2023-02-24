import * as outputFieldsActions from '../actions/outputFieldsActions'

const initialState: outputFieldsActions.OutputFieldsType = {
    standardFields: [],
    customFields: []
}

export default (state = initialState, action: any) => {
    const { type, payload } = action
    switch (type) {
        case outputFieldsActions.OUTPUT_FIELDS:
            return payload;
        case 'FLUSH':
            return initialState;
        default:
            return state
    }
}