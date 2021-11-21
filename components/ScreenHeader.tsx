import React from "react"
import { View, Image, StyleSheet, ViewStyle, ImageRequireSource, ImageStyle, } from 'react-native'
import HeaderComponent from "./HeaderComponent"

type ScreenHeaderProps = {
    containerStyle: ViewStyle
    logo: ImageRequireSource
    logoStyle: ImageStyle
    onBackPress?: () => any
}

const ScreenHeader = (props: ScreenHeaderProps) => {
    const {containerStyle, logo, logoStyle, onBackPress} = props
    return (
        <>
            {
                onBackPress
                ?
                    <HeaderComponent
                        onBack={onBackPress}
                    />
                : null
            }
            <View style={{...containerStyle}}>
                <Image
                    style={{...styles.logoStyle, ...logoStyle}}
                    source={logo}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    logoStyle: {
        height: 100,
        width: 100
    }
})

export default ScreenHeader
