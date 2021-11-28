import React from 'react'
import { Pressable, ViewStyle, TextStyle } from 'react-native'
import colors from '../constants/colors'
import BoldText from './BoldText'
import RegularText from './RegularText'

type TextButtonProps = {
    isSelected?: boolean
    text: string,
    onPress: () => any
    style?: ViewStyle
    textStyle?: TextStyle
}

const TextButton = (props: TextButtonProps) => {
    const { isSelected, style, text, textStyle, onPress } = props
    return (
        <Pressable
            style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isSelected ? colors.primary : colors.grey,
                ...style
            }}
            onPress={onPress}
        >
            {
                isSelected
                ?
                    <BoldText style={{ ...textStyle, color: isSelected ? colors.white : colors.black }}>{text}</BoldText>
                :
                    <RegularText style={textStyle}>{text}</RegularText>
            }
        </Pressable>
    )
}

export default TextButton