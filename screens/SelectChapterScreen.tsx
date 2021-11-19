import React, { useCallback, useState } from "react";
import { StyleSheet, View } from 'react-native';

import images from "../assets/images";

import BoldText from "../components/BoldText";
import ChapterButton from "../components/ChapterButton";
import RegionButton from "../components/RegionButton";
import RegularText from "../components/RegularText";
import RoundedButton from "../components/RoundedButton";
import ScreenHeader from "../components/ScreenHeader";

import colors from "../constants/colors";

const SelectChapterScreen = (props: any) => {
    const { navigation } = props
    const [selectedOption, setSelectedOption] = useState(-1)

    const nextPressHandler = useCallback(() => {
        navigation.navigate('fetchMatriculationDetails', {
            chapterId: selectedOption
        })
    }, [navigation, selectedOption])

    return (
        <View style={styles.root}>
            <ScreenHeader
                containerStyle={styles.headerContainer}
                logo={images.ic_logo}
                logoStyle={styles.logoStyle}
            />
            <View style={styles.detailsContainer}>
                <View style={{ flex: 1 }}>
                    <BoldText style={{ fontSize: 22, alignSelf: 'center', textAlign: 'center' }}>
                        {"Select Your Chapter"}
                    </BoldText>
                    <RegularText style={{ textAlign: 'center', marginTop: 10 }}>
                        {"Please choose one out of four chapter to continue."}
                    </RegularText>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            paddingHorizontal: 30,
                            marginTop: 10
                        }}
                    >
                        <ChapterButton
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
                        />
                    </View>
                </View>
                <RoundedButton
                    style={{ borderRadius: 0 }}
                    onPress={nextPressHandler}
                    text={"Next"}
                />
            </View>
        </View>
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
