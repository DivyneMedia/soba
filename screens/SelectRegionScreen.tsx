import React, { useCallback, useState } from "react";
import { FlatList, ImageRequireSource, StyleSheet, View } from 'react-native';
import { useDispatch } from "react-redux";

import images from "../assets/images";
import BackgroundImageComp from "../components/BackgroundImageComp";

import BoldText from "../components/BoldText";
import HeaderComponent from "../components/HeaderComponent";
import RegionButton from "../components/RegionButton";
import RegularText from "../components/RegularText";
import RoundedButton from "../components/RoundedButton";
import ScreenHeader from "../components/ScreenHeader";

import colors from "../constants/colors";
import appStaticData from "../data/appStaticData";
import { setRegion } from "../store/actions/AuthActions";
import { ErrorToast } from "../utils/ToastUtils";

type RegionType = {
    id: number,
    name: string,
    logo: ImageRequireSource
}

const SelectRegionScreen = (props: any) => {
    const { navigation } = props
    const dispatch = useDispatch()

    const [selectedOption, setSelectedOption] = useState(-1)

    const nextPressHandler = useCallback(() => {
        if (selectedOption === -1) {
            ErrorToast("Choose region to continue.")
            return
        }
        dispatch(setRegion(selectedOption));
        let screenToNavigate: 'selectChapter' | 'fetchMatriculationDetails' = 'selectChapter'
        if (selectedOption === 1) {
            screenToNavigate = 'selectChapter'
        } else {
            screenToNavigate = 'fetchMatriculationDetails'
        }
        navigation.navigate(screenToNavigate)
    }, [dispatch, selectedOption, navigation])

    const renderRegionsHandler = useCallback((item: any) => {
        try {
            const { item: region, index }: { item: RegionType, index: number } = item
            return (
                <RegionButton
                    logo={region.logo}
                    text={region.name}
                    onPress={setSelectedOption.bind(null, region.id)}
                    rootContainerStyle={{
                        marginRight: 20,
                        alignItems: 'center'
                    }}
                    selected={selectedOption === region.id}
                />
            )
        } catch (err: any) {
            console.log('[renderRegionsHandler] Error : ', err.message)
            return null
        }
    }, [selectedOption])

    const keyExtractHandler = useCallback((item: any, index: number) => index.toString(), [])

    return (
        <BackgroundImageComp>
            <View style={styles.root}>
                <ScreenHeader
                    containerStyle={styles.headerContainer}
                    logo={images.ic_logo}
                    logoStyle={styles.logoStyle}
                    onBackPress={navigation.goBack}
                />
                <View style={styles.detailsContainer}>
                    <View style={{ flex: 1, paddingHorizontal: 35 }}>
                        <BoldText style={{ fontSize: 22, alignSelf: 'center', textAlign: 'center' }}>
                            {"Welcome to SOBA\n Member Application"}
                        </BoldText>
                        <RegularText style={{ textAlign: 'center', marginTop: 10 }}>
                            {"Hi there, please select your region\n to continue and claim your account"}
                        </RegularText>
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <FlatList
                                data={appStaticData.regions}
                                renderItem={renderRegionsHandler}
                                keyExtractor={keyExtractHandler}
                                horizontal
                                style={{
                                    flexShrink: 1,
                                    maxHeight: 160,
                                }}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
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
        // marginTop: -56
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

export default SelectRegionScreen
