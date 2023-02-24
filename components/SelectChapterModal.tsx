import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'
import Modal from 'react-native-modal'
import colors from '../constants/colors'

import { OPTION_VALUES } from '../types/UserResponse'
import { height, keyExtractHandler } from '../utils/MiscUtils'
import BoldText from './BoldText'

type SelectChapterModalProps = {
    chapters: OPTION_VALUES[],
    onSelect(selectedOption: OPTION_VALUES): any
}

const SelectChapterModal = React.forwardRef((props: SelectChapterModalProps, ref: any) => {
    const {
        chapters,
        onSelect
    } = props

    // ** States
    const [isVisible, setVisible] = useState(false)

    // ** Refs
    const mountedRef = useRef(false)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    const toggleVisibility = useCallback((visibility: boolean) => {
        if (mountedRef.current) {
            setVisible(visibility)
        }
    }, [])

    const initRefHandler = useCallback(() => {
        return {
            show: toggleVisibility.bind(null, true),
            hide: toggleVisibility.bind(null, false)
        }
    }, [])

    useImperativeHandle(ref, initRefHandler)

    const renderChapterHandler = useCallback((itemData: any) => {
        try {
            const { item, index }: { item: OPTION_VALUES, index: number } = itemData
            return (
                <Pressable
                    key={index.toString()}
                    onPress={onSelect.bind(null, item)}
                    style={{
                        paddingHorizontal: 10,
                        margin: 10
                    }}
                >
                    <BoldText>{item.name}</BoldText>
                </Pressable>
            )
        } catch (err: any) {
            console.log('[renderChapterHandler] Error : ', err?.message)
            return null
        }
    }, [onSelect])

    return (
        <Modal
            isVisible={isVisible}
            animationIn={"fadeIn"}
            animationOut={"fadeOut"}
            onBackButtonPress={toggleVisibility.bind(null, false)}
            onBackdropPress={toggleVisibility.bind(null, false)}
            useNativeDriver
        >
            <View
                style={{
                    flex: 1,
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    backgroundColor: colors.white,
                    maxHeight: height / 2
                }}
            >
                <FlatList
                    data={chapters}
                    style={{
                        flex: 1,
                    }}
                    // contentContainerStyle={{
                    //     padding: 10,
                    //     margin: 10,
                    // }}
                    renderItem={renderChapterHandler}
                    keyExtractor={keyExtractHandler}
                />
            </View>
        </Modal>
    )
})

export default SelectChapterModal
