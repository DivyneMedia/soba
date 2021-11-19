import React from "react";
import { Pressable, TextStyle, ViewStyle } from 'react-native'
import colors from "../constants/colors";
import BoldText from "./BoldText";

type RoundedButtonProps = {
    onPress: () => any
    text: string
    style?: ViewStyle
    textStyle?: TextStyle
}

const RoundedButton = (props: RoundedButtonProps) => {
    const { onPress, text, style, textStyle } = props
    return (
        <Pressable
            onPress={onPress}
            style={{
                borderRadius: 50,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.primary,
                width: '100%',
                paddingVertical: 15,
                marginTop: 10,
                ...style
            }}
        >
            <BoldText style={{ color: colors.white, ...textStyle }}>{text}</BoldText>
        </Pressable>
    )
}

export default RoundedButton;
