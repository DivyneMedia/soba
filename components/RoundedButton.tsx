import React from "react";
import { Pressable } from 'react-native'
import colors from "../constants/colors";
import BoldText from "./BoldText";

type RoundedButtonProps = {
    onPress: () => any
    text: string
}

const RoundedButton = (props: RoundedButtonProps) => {
    const { onPress, text } = props
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
                marginTop: 10
            }}
        >
            <BoldText style={{ color: colors.white }}>{text}</BoldText>
        </Pressable>
    )
}

export default RoundedButton;
