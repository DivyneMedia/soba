import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal'
import colors from '../constants/colors';

const ROOT: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
}

const LOADER_CONTAINER: ViewStyle = {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 10
}

export type AppLoaderProps = {
    toggleLoader(visibility: boolean): void
}

const AppLoader = forwardRef((_: any, ref: any) => {
    const [isLoading, setLoading] = useState(false)

    const toggleLoader = useCallback((visibility: boolean) => {
        setLoading(visibility)         
    }, [])

    const initHandler = useCallback(() => {
        return {
            toggleLoader
        }
    }, [toggleLoader])

    useImperativeHandle(ref, initHandler)

    return (
        <Modal
            isVisible={isLoading}
            useNativeDriver={true}
            animationIn="fadeIn"
            animationOut={"fadeOut"}
            style={ROOT}
        >
            <View style={LOADER_CONTAINER}>
                <ActivityIndicator color={colors.primary} size="large" />
            </View>
        </Modal>
    )
})

export default React.memo(AppLoader)
