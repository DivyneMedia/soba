import React, { useCallback, useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import AppLoader from "../components/AppLoader";

import BackgroundImageComp from "../components/BackgroundImageComp";

import BoldText from "../components/BoldText";
import ChapterButton from "../components/ChapterButton";
import RegularText from "../components/RegularText";
import RoundedButton from "../components/RoundedButton";
import ScreenHeader from "../components/ScreenHeader";

import colors from "../constants/colors";
import useAccount from "../hooks/useAccount";
import { setChapter } from "../store/actions/AuthActions";
import { OPTION_VALUES } from "../types/UserResponse";
import { getRegionIcon } from "../utils/GetConditionalIconHelper";
import { ErrorToast } from "../utils/ToastUtils";
import { height, isIos, width } from "../utils/MiscUtils";

const SelectChapterScreen = (props: any) => {
    const { navigation } = props
    const dispatch = useDispatch()

    const { isLoading, getAvailableChapters } = useAccount()
    const [selectedOption, setSelectedOption] = useState(-1)
    const [availableChapters, setAvailableChapters] = useState<OPTION_VALUES[]>([])

    const nextPressHandler = useCallback(() => {
        if (selectedOption === -1) {
            ErrorToast("Choose chapter to continue.")
            return
        }
        dispatch(setChapter(selectedOption))
        navigation.navigate('fetchMatriculationDetails', {
            chapterId: selectedOption
        })
    }, [dispatch, navigation, selectedOption])

    const initHandler = useCallback(async () => {
        try {
            const res = await getAvailableChapters()
            if (res && res.length) {
                setAvailableChapters(res)
            }
        } catch (err: any) {
            console.log('initHandler : ', err?.message)
        }
    }, [])

    useEffect(() => {
        initHandler()
    }, [])

    const renderChapterHandler = (chapterObj: any) => {
        try {
            const { id, name, code } = chapterObj
            return (
                <ChapterButton
                    key={id}
                    text={name}
                    onPress={setSelectedOption.bind(null, +id)}
                    selected={selectedOption === +id}
                />
            )
        } catch (err: any) {
            console.log('[renderChapterHandler] Error : ', err.message)
            return null
        }
    }

    return (
        <BackgroundImageComp dismissKeyboardAvoiding={true} >
            <AppLoader isVisible={isLoading} />
            <View style={styles.root}>
                <ScreenHeader
                    containerStyle={styles.headerContainer}
                    logo={getRegionIcon()}
                    logoStyle={styles.logoStyle}
                    onBackPress={navigation.goBack}
                />
                <View style={styles.detailsContainer}>
                    <BoldText style={{ fontSize: 22, alignSelf: 'center', textAlign: 'center' }}>
                        {"Select Your Chapter"}
                    </BoldText>
                    <RegularText style={{ textAlign: 'center', marginTop: 10 }}>
                        {"Please choose one out of four chapter to continue."}
                    </RegularText>
                    <ScrollView
                        style={{
                            flex: 1,
                            paddingHorizontal: 30,
                            marginTop: 10
                        }}
                    >                            
                        {availableChapters.map(renderChapterHandler)}
                    </ScrollView>
                    <RoundedButton
                        style={{ borderRadius: 0, marginTop: 0 }}
                        onPress={nextPressHandler}
                        text={"Next"}
                        disabled={selectedOption === -1}
                    />
                </View>
            </View>
        </BackgroundImageComp>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    headerContainer: {
        height: height * 0.30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStyle: {
        height: 100,
        width: 100,
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20,
    }
})

export default SelectChapterScreen
