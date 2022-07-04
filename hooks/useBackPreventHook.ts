import { useCallback, useEffect } from "react"
import { BackHandler } from "react-native"

const useBackPreventHook = (shouldPrevent: () => any, action: () => any) => {
    const backHandler = useCallback(() => {
        if (shouldPrevent()) {
            action()
        }
        return shouldPrevent()
    }, [shouldPrevent, action])

    useEffect(() => {
        const unsubscribe = BackHandler.addEventListener("hardwareBackPress", backHandler)
        return unsubscribe.remove
    }, [backHandler])
}

export default useBackPreventHook
