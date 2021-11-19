import React from "react";
import colors from "../constants/colors";
import RoundedButton from "./RoundedButton";

type ChapterButtonProps = {
    text: string
    selected: boolean
    onPress: () => any
}

const ChapterButton = (props: ChapterButtonProps) => {
    const { text, onPress, selected } = props
    return (
        <RoundedButton
            text={text}
            onPress={onPress}
            style={{
                backgroundColor: selected ? colors.primary : colors.grey,
                marginVertical: 5
            }}
            textStyle={{
                color: selected ? colors.white :  colors.black
            }}
        />
    )
}

export default ChapterButton
