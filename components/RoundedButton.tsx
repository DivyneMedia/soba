import React from "react";
import { Pressable, TextStyle, ViewStyle } from 'react-native'
import colors from "../constants/colors";
import BoldText from "./BoldText";

type RoundedButtonProps = {
    onPress: () => any
    text: string
    style?: ViewStyle
    textStyle?: TextStyle
    disabled?: boolean
}

const RoundedButton = (props: RoundedButtonProps) => {
    const { onPress, text, style, textStyle, disabled } = props
    return (
        <Pressable
            disabled={!!disabled}
            onPress={onPress}
            style={{
                borderRadius: 50,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: disabled ? colors.grey : colors.primary,
                width: '100%',
                paddingVertical: 15,
                marginTop: 10,
                ...style
            }}
        >
            <BoldText style={{ color: disabled ? colors.primary : colors.white, ...textStyle }}>{text}</BoldText>
        </Pressable>
    )
}

export default RoundedButton;
