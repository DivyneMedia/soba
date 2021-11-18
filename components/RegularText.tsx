import React from "react";
import { Text } from "react-native";

const RegularText = (props: any) => {
    return (
        <Text style={{ fontSize: 16, ...props.style }} {...props} >{props.children}</Text>
    )
}

export default RegularText;
