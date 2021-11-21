import React, { useCallback, useRef, useState } from "react";
import { Image, Keyboard, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useSelector } from "react-redux";

import images from "../assets/images";
import BackgroundImageComp from "../components/BackgroundImageComp";

import BoldText from "../components/BoldText";
import HeaderComponent from "../components/HeaderComponent";
import RegionButton from "../components/RegionButton";
import RegularText from "../components/RegularText";
import RoundedButton from "../components/RoundedButton";
import RoundedInput from "../components/RoundedInput";
import ScreenHeader from "../components/ScreenHeader";
import appConstants from "../constants/appConstants";

import colors from "../constants/colors";
import { getRegionIcon } from "../utils/GetConditionalIconHelper";
import { ErrorToast } from "../utils/ToastUtils";

const FetchMatriculationDetailsScreen = (props: any) => {
    const { navigation } = props
    const { regionId } = useSelector((state: any) => state.auth)

    const [matriculationNumber, setMatriculationNumber] = useState('')

    const matriculationInputRef = useRef<TextInput>(null)

    const onChangeTextHandler = useCallback((key: any, value: string) => {
        switch (key) {
            case appConstants.MATRICULATION_INPUT:
                setMatriculationNumber(value);
                break
        }
    }, [])

    const onSubmitEditingHandler = useCallback((key: any) => {
        switch (key) {
            case appConstants.MATRICULATION_INPUT:
                Keyboard.dismiss()
                break
        }
    }, [])

    const nextPressHandler = useCallback(() => {
        if (!matriculationNumber || !matriculationNumber.trim()) {
            ErrorToast("Enter your Matriculation Number to continue.")
            return
        }

        navigation.navigate('enterContactInformation')
    }, [navigation, matriculationNumber])

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
                    <View style={{ flex: 1, paddingHorizontal: 30 }}>
                        <BoldText style={{ fontSize: 22, alignSelf: 'center', textAlign: 'center' }}>
                            {"Enter Your Matriculation Number"}
                        </BoldText>
                        <View
                            style={{
                                flex: 1,
                                marginTop: 10,
                            }}
                        >
                            <RoundedInput
                                ref={matriculationInputRef}
                                placeholder="Matriculation Number"
                                value={matriculationNumber}
                                maxLength={15}
                                blurOnSubmit={true}
                                returnKeyType="done"
                                onChangeText={onChangeTextHandler.bind(null, appConstants.MATRICULATION_INPUT)}
                                onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.MATRICULATION_INPUT)}
                            />
                            <Pressable
                                style={{
                                    position: 'absolute',
                                    top: 36,
                                    right: 20
                                }}
                            >
                                <Image
                                    source={images.ic_send}
                                    style={{
                                        height: 20,
                                        width: 20,
                                    }}
                                    resizeMode="contain"
                                />
                            </Pressable>
                        </View>
                    </View>
                    <RoundedButton
                        style={{ borderRadius: 0 }}
                        onPress={nextPressHandler}
                        text={"Next"}
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

export default FetchMatriculationDetailsScreen
