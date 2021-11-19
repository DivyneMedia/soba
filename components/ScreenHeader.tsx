import React from "react"
import { View, Image, StyleSheet, ViewStyle, ImageRequireSource, ImageStyle, } from 'react-native'

type ScreenHeaderProps = {
    containerStyle: ViewStyle
    logo: ImageRequireSource
    logoStyle: ImageStyle
}

const ScreenHeader = (props: ScreenHeaderProps) => {
    const {containerStyle, logo, logoStyle} = props
    return (
        <View style={{...containerStyle}}>
            <Image
                style={{...styles.logoStyle, ...logoStyle}}
                source={logo}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    logoStyle: {
        height: 100,
        width: 100
    }
})

export default ScreenHeader
