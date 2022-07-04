import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, TextStyle, ViewStyle } from "react-native";
import images from "../assets/images";
import BoldText from "./BoldText";

type CheckboxButtonTypes = {
    text: string
    defaultChecked?: boolean
    containerStyle?: ViewStyle
    textStyle?: TextStyle
}

export type CheckboxButtonRef = {
    getChecked(): boolean,
    setChecked(newState: boolean): void
}

const CheckboxButton = forwardRef((props: CheckboxButtonTypes, ref: any) => {
    const {
        text,
        defaultChecked,
        containerStyle,
        textStyle
    } = props

    const [checked, setChecked] = useState(defaultChecked)

    const onChangeHandler = useCallback(() => {
        setChecked(prevState => !prevState)
    }, [])

    const initHandler = useCallback(() => {
        return {
            getChecked: () => checked,
            setChecked: (newState: boolean) => setChecked(newState)
        }
    }, [checked])

    useImperativeHandle(ref, initHandler)
    
    const chkImage = useMemo(() => checked ? images.ic_checked : images.ic_unchecked, [checked])

    return (
        <Pressable
            onPress={onChangeHandler}
            style={[styles.container, containerStyle]}
        >
            <Image
                style={styles.image}
                resizeMode="contain"
                source={chkImage}
            />
            <BoldText style={textStyle}>{text}</BoldText>
        </Pressable>
    )
})

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: 24,
        width: 24,
        marginRight: 10,
        marginVertical: 10
    }
})

export default CheckboxButton
