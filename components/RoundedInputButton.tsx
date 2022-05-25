import React from "react"
import { Image, ImageRequireSource, Pressable, View, ViewStyle } from 'react-native'

import RegularText from "./RegularText"

import colors from "../constants/colors"
import images from "../assets/images"

type RoundedInputButtonProps = {
    placeholder: string
    value: string
    onPress?: () => any
    style?: ViewStyle
    icon?: ImageRequireSource
    hideIcon?: boolean
    disabled?: boolean
}

const RoundedInputButton = (props: RoundedInputButtonProps) => {
    const { placeholder, value, onPress, style, icon, hideIcon, disabled } = props
    return (
        <Pressable
            style={{
                borderRadius: 30,
                borderWidth: 1,
                marginTop: 20,
                minHeight: 50,
                ...style
            }}
            disabled={!!disabled}
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
            {
                hideIcon
                ?
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        paddingVertical: 12
                    }}
                >
                    <RegularText
                        style={{
                            fontSize: 14,
                            marginLeft: 5
                        }}
                    >
                        {value}
                    </RegularText>
                </View>
                :
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            paddingVertical: 12
                        }}
                    >
                        <Image
                            source={icon || images.ic_calendar}
                            style={{
                                height: 24,
                                width: 24
                            }}
                            resizeMode="contain"
                        />
                        <RegularText
                            style={{
                                fontSize: 14,
                                marginLeft: 5
                            }}
                        >
                            {value}
                        </RegularText>
                    </View>
            }
        </Pressable>
    )
}
 
export default RoundedInputButton;
