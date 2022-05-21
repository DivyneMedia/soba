import React, { useCallback, useMemo } from 'react';
import { Image, ImageRequireSource, Pressable, StyleSheet, View } from 'react-native'
import colors from '../constants/colors';
import RegularText from './RegularText';

type TitleTextProps = {
    logo: ImageRequireSource
    title: string
    text: string
    onPress?: () => void
}

const TitleText = React.memo((props: TitleTextProps) => {
    const { logo, title, text, onPress } = props

    const onPressHandler = useMemo(() => onPress ?? (() => {}), [onPress])

    return (
        <Pressable style={styles.container} onPress={onPressHandler} disabled={!!!onPress}>
            <View style={styles.logoContainer}>
            <Image
                source={logo}
                style={styles.logo}
                resizeMode='contain'
            />
            </View>
            <View style={styles.textContainer}>
                <RegularText style={styles.titleStyle}>{title}</RegularText>
                <RegularText style={styles.textStyle}>{text}</RegularText>
            </View>
        </Pressable>
    )
})

const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'row', alignItems: 'center' },
    logoContainer: { width: "15%", alignItems: 'center', justifyContent: 'center' },
    logo: { height: 18, width: 18 },
    textContainer: { flex: 1, marginTop: 10 },
    titleStyle: { flex: 1, fontSize: 16, textAlign: 'left', color: colors.black },
    textStyle: { flex: 1, color: colors.primary, fontSize: 16, textAlign: 'left' }
})

export default TitleText
