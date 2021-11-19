import React from "react";
import { Image, ImageRequireSource, ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native";
import colors from "../constants/colors";
import BoldText from "./BoldText";

type RegionButtonProps = {
    logo: ImageRequireSource
    text: string
    onPress: () => any
    selected: boolean
    rootContainerStyle?: ViewStyle
    containerStyle?: ViewStyle
    logoStyle?: ImageStyle
    textStyle?: TextStyle
}

const RegionButton = (props: RegionButtonProps) => {
    const {logo, text, onPress, rootContainerStyle,containerStyle, logoStyle, textStyle, selected} = props
    return (
        <Pressable
            onPress={onPress}
            style={rootContainerStyle}
        >
            <View
                style={{
                    paddingVertical: 18,
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    borderRadius: 12,
                    backgroundColor: selected ? colors.primary : colors.grey,
                    ...containerStyle
                }}
            >
                <Image
                    style={{
                        height: 95,
                        width: 95,
                        ...logoStyle
                    }}
                    source={logo}
                />
            </View>
            <BoldText style={{ marginTop: 5, color: colors.black, ...textStyle }}>
                {text}
            </BoldText>
        </Pressable>
    )
}

export default RegionButton;