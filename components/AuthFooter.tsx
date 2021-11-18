import React from "react";
import { TextStyle } from "react-native";
import BoldText from "./BoldText";
import RegularText from "./RegularText";

type AuthFooterProps = {
    onPress: () => any
    baseText: string
    innerText: string
    style?: TextStyle
}

const AuthFooter = (props: AuthFooterProps) => {
    const { baseText, innerText, onPress, style } = props
    return (
        <RegularText style={{ alignSelf: 'center', ...style }} onPress={onPress}>
            {baseText}
            <BoldText style={{ fontSize: 14 }} >{innerText}</BoldText>
        </RegularText>
    )
}

export default AuthFooter;