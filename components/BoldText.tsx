import React from "react";
import { Text } from "react-native";

const BoldText = (props: any) => {
    return (
        <Text style={{ fontWeight: "bold", fontSize: 16, ...props.style }}>{props.children}</Text>
    )
}

export default BoldText;
