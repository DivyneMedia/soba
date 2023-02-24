import axios, { AxiosResponse } from "axios"
import appConstants from "../../constants/appConstants"

export const OUTPUT_FIELDS = 'OUTPUT_FIELDS';

export type CustomFieldsType = {
    displayName: string;
    id: number;
}

export type OutputFieldsType = {
    standardFields: string[];
    customFields: CustomFieldsType[]
}

export const getOutputFields = () => {
    return async (dispatch: any, getState: any) => {
        try {
            const outputFieldsRes: AxiosResponse<OutputFieldsType> = await axios.get('/accounts/search/outputFields')
            dispatch({
                type: OUTPUT_FIELDS,
                payload: outputFieldsRes.data
            })
        } catch (err: any) {
            console.log('[getOutputFields] Error : ', JSON.stringify(err?.response?.data ?? err?.message))
            throw new Error(err?.response?.data ?? err?.message ?? appConstants.SOMETHING_WENT_WRONG)
        }
    }
}