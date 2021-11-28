import React from 'react';
import { StyleSheet, View } from 'react-native'
import colors from '../constants/colors';
import RegularText from './RegularText';

type TitleTextProps = {
    title: string
    text: string
}

const TitleText = (props: TitleTextProps) => {
    const { title, text } = props
    return (
        <View style={{ marginTop: 10 }}>
            <RegularText style={styles.titleStyle}>{title}</RegularText>
            <RegularText style={styles.textStyle}>{text}</RegularText>
        </View>
    )
}

const styles = StyleSheet.create({
    titleStyle: { fontSize: 16, textAlign: 'left' },
    textStyle: { color: colors.primary, fontSize: 16, textAlign: 'left' }
})

export default TitleText
