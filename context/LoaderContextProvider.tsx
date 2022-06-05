import React, { createContext, useCallback, useMemo, useRef } from 'react'
import { View } from 'react-native'

import AppLoader, { AppLoaderProps } from '../components/AppLoader'

export const LoaderContext = createContext<AppLoaderProps>({
    toggleLoader: (visibility: boolean) => {}
})

const styles = {
    container: {
        flex: 1
    }
}

export default (props: any) => {
    const { style, children } = props

    const loaderRef = useRef<AppLoaderProps>(null)

    const toggleLoader = useCallback((visibility: boolean) => {
        try {
            loaderRef.current.toggleLoader(visibility)
        } catch (err: any) {
            console.log('[LoaderProvider] toggleLoader : ', err.message)
        }
    }, [])

    const contextVal = useMemo(() => ({ toggleLoader }), [toggleLoader])

    return (
        <LoaderContext.Provider value={contextVal}>
            <View style={styles.container}>
                <AppLoader ref={loaderRef} />
                {children}
            </View>
        </LoaderContext.Provider>
    )
}