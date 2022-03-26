import React from 'react';
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

type AppLoaderProps = {
    isVisible: boolean
}

const AppLoader = (props: AppLoaderProps) => {
    const {isVisible} = props

    return (
        <Modal
            isVisible={isVisible}
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
}

export default AppLoader
