import React from "react";
import { TextStyle } from "react-native";
import colors from "../constants/colors";
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
        <RegularText
            style={{
                alignSelf: 'center',
                fontSize: 14,
                ...style,
            }}
            onPress={onPress}
        >
            {baseText}
            <BoldText
                style={{
                    fontSize: 14,
                    color: colors.primary
                }}
            >
                {innerText}
            </BoldText>
        </RegularText>
    )
}

export default AuthFooter;