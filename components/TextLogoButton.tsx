import React from 'react';
import { Image, ImageRequireSource, Pressable, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import BoldText from './BoldText';

type TextLogoButtonProps = {
    icon: ImageRequireSource
    text: string
    onPress?: () => any
}

const TextLogoButton = (props: TextLogoButtonProps) => {
    const { icon, text, onPress } = props
    return (
        <Pressable
            onPress={onPress}
            style={styles.container}
        >
            <Image
                source={icon}
                style={styles.logoStyle}
                resizeMode="contain"
            />
            <BoldText style={{ color: colors.primary }}>{text}</BoldText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginLeft: 10,
        marginVertical: 5
    },
    logoStyle: {
        height: 22,
        width: 22,
        marginRight: 12
    }
})

export default TextLogoButton