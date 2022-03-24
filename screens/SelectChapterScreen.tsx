import React, { useCallback, useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import BackgroundImageComp from "../components/BackgroundImageComp";

import BoldText from "../components/BoldText";
import ChapterButton from "../components/ChapterButton";
import RegularText from "../components/RegularText";
import RoundedButton from "../components/RoundedButton";
import ScreenHeader from "../components/ScreenHeader";

import colors from "../constants/colors";
import { getChapters, setChapter } from "../store/actions/AuthActions";
import { getRegionIcon } from "../utils/GetConditionalIconHelper";
import { ErrorToast } from "../utils/ToastUtils";

const SelectChapterScreen = (props: any) => {
    const { navigation } = props
    const dispatch = useDispatch()

    const [isLoading, setLoading] = useState(true)

    const { regionId, chapters } = useSelector((state: any) => state.auth)

    const [selectedOption, setSelectedOption] = useState(-1)

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
            await dispatch(getChapters())
            setLoading(false)
        } catch (err: any) {
            console.log('initHandler : ', err?.message)
        }
    }, [])

    useEffect(() => {
        initHandler()
    }, [])

    const keyExtractorHandler = (_item: any, index: number) => index.toString()

    const renderChapterHandler = (chapterObj: any) => {
        try {
            // const {item, index}: { item: any, index: any } = chapterObj
            const { id, name, code } = chapterObj
            return (
                <ChapterButton
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
        <BackgroundImageComp>
            <View style={styles.root}>
                <ScreenHeader
                    containerStyle={styles.headerContainer}
                    logo={getRegionIcon(regionId)}
                    logoStyle={styles.logoStyle}
                    onBackPress={navigation.goBack}
                />
                <View style={styles.detailsContainer}>
                    <View style={{ flex: 1 }}>
                        <BoldText style={{ fontSize: 22, alignSelf: 'center', textAlign: 'center' }}>
                            {"Select Your Chapter"}
                        </BoldText>
                        <RegularText style={{ textAlign: 'center', marginTop: 10 }}>
                            {"Please choose one out of four chapter to continue."}
                        </RegularText>
                        <ScrollView
                            style={{
                                // maxHeight: 200,
                                flexShrink: 1,
                                // alignItems: 'center',
                                // maxHeight: "100%",
                                paddingHorizontal: 30,
                                marginTop: 10
                            }}
                        >
                            {
                                chapters && Array.isArray(chapters) && chapters.map(renderChapterHandler)
                            }
                            {/* <ChapterButton
                                text="SOBA Arizona"
                                onPress={setSelectedOption.bind(null, 0)}
                                selected={selectedOption === 0}
                            />
                            <ChapterButton
                                text="SOBA California"
                                onPress={setSelectedOption.bind(null, 1)}
                                selected={selectedOption === 1}
                            />
                            <ChapterButton
                                text="SOBA Carolina"
                                onPress={setSelectedOption.bind(null, 2)}
                                selected={selectedOption === 2}
                            />
                            <ChapterButton
                                text="SOBA Dallas"
                                onPress={setSelectedOption.bind(null, 3)}
                                selected={selectedOption === 3}
                            /> */}
                            {/* <FlatList
                                data={chapters ?? []}
                                style={{ flex: 1 }}
                                keyExtractor={keyExtractorHandler}
                                renderItem={renderChapterHandler}
                                ListEmptyComponent={null}
                            /> */}
                        </ScrollView>
                    </View>
                    <RoundedButton
                        style={{ borderRadius: 0 }}
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
        flex: 0.35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStyle: {
        height: 100,
        width: 100,
    },
    detailsContainer: {
        flex: 0.65,
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
