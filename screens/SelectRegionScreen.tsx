import React, { useCallback, useState } from "react";
import { StyleSheet, View } from 'react-native';

import images from "../assets/images";

import BoldText from "../components/BoldText";
import RegionButton from "../components/RegionButton";
import RegularText from "../components/RegularText";
import RoundedButton from "../components/RoundedButton";
import ScreenHeader from "../components/ScreenHeader";

import colors from "../constants/colors";

const SelectRegionScreen = (props: any) => {
    const { navigation } = props
    const [selectedOption, setSelectedOption] = useState(-1)

    const nextPressHandler = useCallback(() => {
        let screenToNavigate: 'selectChapter' | 'fetchMatriculationDetails' = 'selectChapter'
        switch(selectedOption) {
            case 0:
                screenToNavigate = 'fetchMatriculationDetails'
                break
            case 1:
                screenToNavigate = 'selectChapter'
                break
        }
        console.log('navigating to : ', screenToNavigate)
        navigation.navigate(screenToNavigate)
    }, [selectedOption, navigation])

    return (
        <View style={styles.root}>
            <ScreenHeader
                containerStyle={styles.headerContainer}
                logo={images.ic_logo}
                logoStyle={styles.logoStyle}
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
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <RegionButton
                            logo={images.ic_logo}
                            text={"SOBA General"}
                            onPress={setSelectedOption.bind(null, 0)}
                            rootContainerStyle={{
                                marginRight: 20,
                                alignItems: 'center'
                            }}
                            selected={selectedOption === 0}
                        />
                        <RegionButton
                            logo={images.ic_logo}
                            text={"SOBA America"}
                            onPress={setSelectedOption.bind(null, 1)}
                            rootContainerStyle={{
                                marginRight: 20,
                                alignItems: 'center'
                            }}
                            selected={selectedOption === 1}
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
        // backgroundColor: 'pink'
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
