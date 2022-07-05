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
import { ErrorToast } from "../utils/ToastUtils";

type ChatFilterModalProps = {
    onSubmit(filterOption: string): void
}

export type ChatFilterModalRefTypes = {
    show(): void,
    hide(): void,
    isVisible: Ref<any>
    getSelectedFilterOption(): string
}

const ChatFilterModal = forwardRef((props: ChatFilterModalProps, ref: any) => {
    const { onSubmit } = props

    // hooks
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const bottomSheetOpenStatusRef = useRef(false)
    const selectedFilterOptionRef = useRef('')

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
            isVisible: bottomSheetOpenStatusRef,
            getSelectedFilterOption: () => selectedFilterOptionRef.current
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

    const filterAllRef = useRef<CheckboxButtonRef>(null)
    const filterApprovedRef = useRef<CheckboxButtonRef>(null)
    const filterUnapprovedRef = useRef<CheckboxButtonRef>(null)

    const savePasswordHandler = useCallback(async () => {
        try {
            const allChatsSelected = filterAllRef.current?.getChecked()
            const approvedChatsSelected = filterApprovedRef.current?.getChecked()
            const unapprovedChatsSelected = filterUnapprovedRef.current?.getChecked()
            
            if (!allChatsSelected && !approvedChatsSelected && !unapprovedChatsSelected) {
                ErrorToast("Please select option to continue.")
            } else {
                handlePresentModalPress(false)
                selectedFilterOptionRef.current = allChatsSelected ? 'all' : approvedChatsSelected ? 'approved' : 'unapproved'
                onSubmit(selectedFilterOptionRef.current)
            }
        } catch (err: any) {
            console.log('[savePasswordHandler] Error : ', err.message)
        }
    }, [onSubmit])

    const onFilterOptionChangeHandler = useCallback((option, checked) => {
        switch (option) {
            case "all":
                {
                    if (checked) {
                        filterApprovedRef.current?.setChecked(false)
                        filterUnapprovedRef.current?.setChecked(false)
                    }
                }
                break
            case "approved":
                {
                    if (checked) {
                        filterAllRef.current?.setChecked(false)
                        filterUnapprovedRef.current?.setChecked(false)
                    }
                }
                break
            case "unapproved":
                {
                    if (checked) {
                        filterAllRef.current?.setChecked(false)
                        filterApprovedRef.current?.setChecked(false)
                    }
                }
                break
        }
    }, [])

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
                    defaultChecked={true}
                    onChange={onFilterOptionChangeHandler.bind(null, "all")}
                />
                <CheckboxButton
                    ref={filterApprovedRef}
                    text="Approved"
                    onChange={onFilterOptionChangeHandler.bind(null, "approved")}
                />
                <CheckboxButton
                    ref={filterUnapprovedRef}
                    text="Unapproved"
                    onChange={onFilterOptionChangeHandler.bind(null, "unapproved")}
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
