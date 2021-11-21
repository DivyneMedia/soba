import React from "react";
import { Text } from "react-native";
import colors from "../constants/colors";

const BoldText = (props: any) => {
    return (
        <Text style={{ fontWeight: "bold", fontSize: 16, color: colors.black, ...props.style }}>{props.children}</Text>
    )
}

export default BoldText;
