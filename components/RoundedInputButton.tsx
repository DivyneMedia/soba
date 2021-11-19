import React from "react"
import { Image, Pressable, View } from 'react-native'

import RegularText from "./RegularText"

import colors from "../constants/colors"
import images from "../assets/images"

type RoundedInputButtonProps = {
    placeholder: string
    value: string
    onPress: () => any
}

const RoundedInputButton = (props: RoundedInputButtonProps) => {
    const { placeholder, value, onPress } = props
    return (
        <Pressable
            style={{
                borderRadius: 30,
                borderWidth: 1,
                marginTop: 20,
                minHeight: 50
            }}
            onPress={onPress}
        >
            <RegularText
                style={{
                    position: 'absolute',
                    top: -12,
                    left: 22,
                    backgroundColor: colors.white,
                    paddingHorizontal: 5,
                }}
            >
                {placeholder}
            </RegularText>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 12
                }}
            >
                <Image
                    source={images.ic_calendar}
                    style={{
                        height: 24,
                        width: 24
                    }}
                    resizeMode="contain"
                />
                <RegularText
                    style={{
                        fontSize: 14
                    }}
                >
                    {value}
                </RegularText>
            </View>
        </Pressable>
    )
}
 
export default RoundedInputButton;
