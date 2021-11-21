import React from "react";
import { Text } from "react-native";
import colors from "../constants/colors";

const RegularText = (props: any) => {
    return (
        <Text style={{ fontSize: 16, color: colors.black, ...props.style }} {...props} >{props.children}</Text>
    )
}

export default RegularText;
