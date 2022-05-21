import React, { useMemo } from 'react';
import { Image, ImageRequireSource, Pressable, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import BoldText from './BoldText';
import RegularText from './RegularText';

type TextLogoButtonProps = {
    icon: ImageRequireSource
    text: string
    onPress?: () => any
    noBold?: boolean
}

const TextLogoButton = (props: TextLogoButtonProps) => {
    const { icon, text, onPress, noBold } = props

    const onPressHandler = useMemo(() => onPress ?? (() => {}), [onPress])

    return (
        <Pressable
            onPress={onPressHandler}
            style={styles.container}
            disabled={!!!onPress}
        >
            <Image
                source={icon}
                style={styles.logoStyle}
                resizeMode="contain"
            />
            {
                noBold
                ? <RegularText style={{ color: colors.primary }}>{text}</RegularText>
                : <BoldText style={{ color: colors.primary }}>{text}</BoldText>
            }
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