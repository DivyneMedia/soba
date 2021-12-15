import React from 'react';
import { Image, ImageRequireSource, StyleSheet, View } from 'react-native'
import colors from '../constants/colors';
import RegularText from './RegularText';

type TitleTextProps = {
    logo: ImageRequireSource
    title: string
    text: string
}

const TitleText = (props: TitleTextProps) => {
    const { logo, title, text } = props
    return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: "15%", alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={logo}
                style={{ height: 18, width: 18 }}
                resizeMode='contain'
            />
            </View>
            <View style={{ flex: 1, marginTop: 10 }}>
                <RegularText style={styles.titleStyle}>{title}</RegularText>
                <RegularText style={styles.textStyle}>{text}</RegularText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleStyle: { flex: 1, fontSize: 16, textAlign: 'left' },
    textStyle: { flex: 1, color: colors.primary, fontSize: 16, textAlign: 'left' }
})

export default TitleText
