import React, { forwardRef, Ref, useCallback, useImperativeHandle, useMemo, useRef } from "react";
import { StyleSheet }  from 'react-native';
import {
    BottomSheetBackdropProps,
    BottomSheetModal,
} from '@gorhom/bottom-sheet';

import Root from "./RootComponent";
import RoundedButton from "./RoundedButton";
import BoldText from "../components/BoldText";
import CustomBackdrop from "../components/CustomBackdrop";
import CheckboxButton, { CheckboxButtonRef } from "./CheckboxButton";

import { height } from "../utils/MiscUtils";

type ChatFilterModalProps = {
    onSubmit(filterOption: string): void
}

export type ChatFilterModalRefTypes = {
    show(): void,
    hide(): void,
    isVisible: Ref<any>
}

const ChatFilterModal = forwardRef((props: ChatFilterModalProps, ref: any) => {
    const { onSubmit } = props

    // hooks
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const bottomSheetOpenStatusRef = useRef(false)

    // variables
    const snapPoints = useMemo(() => [height / 2], []);

    // callbacks
    const handlePresentModalPress = useCallback((newVisibility) => {
        if (newVisibility) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.close()
        }
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
        bottomSheetOpenStatusRef.current = index !== -1
    }, []);

    const imperativeHandler = useCallback(() => {
        return {
            show: handlePresentModalPress.bind(null, true),
            hide: handlePresentModalPress.bind(null, false),
            isVisible: bottomSheetOpenStatusRef
        }
    }, [handlePresentModalPress])

    useImperativeHandle(ref, imperativeHandler)

    const backDropComponent = useCallback((props: BottomSheetBackdropProps) => {
        return (
            <CustomBackdrop
                {...props}
                onPress={handlePresentModalPress.bind(null, false)}
            />
        )
    }, [handlePresentModalPress])

    const savePasswordHandler = useCallback(async () => {
        try {
            onSubmit(filterAllRef.current?.getChecked() ? 'all' : filterApprovedRef.current?.getChecked() ? 'approved' : filterUnapprovedRef.current?.getChecked() ? 'unapproved' : '')
        } catch (err: any) {
            console.log('[savePasswordHandler] Error : ', err.message)
        }
    }, [onSubmit])

    const filterAllRef = useRef<CheckboxButtonRef>(null)
    const filterApprovedRef = useRef<CheckboxButtonRef>(null)
    const filterUnapprovedRef = useRef<CheckboxButtonRef>(null)

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={backDropComponent}
            enableDismissOnClose={true}
        >
            <Root style={styles.root}>
                <BoldText style={styles.chooseOptionStyle}>{'Choose Option'}</BoldText>
                <CheckboxButton
                    ref={filterAllRef}
                    text="All"
                />
                <CheckboxButton
                    ref={filterApprovedRef}
                    text="Approved"
                />
                <CheckboxButton
                    ref={filterUnapprovedRef}
                    text="Unapproved"
                />
            </Root>
            <RoundedButton
                text={"SAVE"}
                onPress={savePasswordHandler}
                style={styles.saveButton}
                disabled={false}
            />
        </BottomSheetModal>
    )
})

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    plansContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    saveButton: {
        borderRadius: 0,
        height: 50
    },
    chooseOptionStyle: {
        marginBottom: 10
    }
})

export default ChatFilterModal
