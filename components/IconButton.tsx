import React from "react";
import { Image, ImageRequireSource, ImageStyle, Pressable, StyleSheet, ViewStyle } from 'react-native'
import RegularText from "./RegularText";

type IconButtonProps = {
    style?: ViewStyle
    icon: ImageRequireSource
    text?: string | number
    imageStyle?: ImageStyle
}

const IconButton = (props: IconButtonProps) => {
    const { icon, text, imageStyle, style } = props
    return (
        <Pressable
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 8,
                paddingHorizontal: 5,
                ...style
            }}
        >
            <Image
                style={{
                    height: 24,
                    width: 20,
                    ...imageStyle
                }}
                source={icon}
                resizeMode={"contain"}
            />
            {
                text && <RegularText style={{ marginLeft: 5, fontSize: 12 }}>{text}</RegularText>
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({

})

export default IconButton;
