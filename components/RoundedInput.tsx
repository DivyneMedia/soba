import React, { forwardRef } from "react"
import { View, TextInput, TextInputProps, TextStyle } from 'react-native'
import colors from "../constants/colors"
import RegularText from "./RegularText"

type RoundedInputProps = {
    inputStyle?: TextStyle
}

const RoundedInput = forwardRef((props: RoundedInputProps & TextInputProps, ref: any) => {
    return (
        <View
            style={{
                borderRadius: 30,
                borderWidth: 1,
                marginTop: 20
            }}
        >
            <RegularText
                style={{
                    position: 'absolute',
                    top: -12,
                    left: 18,
                    backgroundColor: colors.white,
                    paddingHorizontal: 5,
                }}
            >
                {props.placeholder}
            </RegularText>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                {...props}
                placeholder=""
                style={{ paddingHorizontal: 15, ...props.inputStyle }}
            />
        </View>
    )
})
 
export default RoundedInput;
