import React from "react";
import { Image, StyleSheet, TextInput, useWindowDimensions, View }  from 'react-native';
import images from "../assets/images";
import BoldText from "../components/BoldText";
import colors from "../constants/colors";

type HomeScreenProps = {

}

const HomeScreen = (props: HomeScreenProps) => {
    return (
        <View style={styles.root}>
            <View style={styles.searchBarContainer}>
                <Image
                    source={images.ic_search}
                    style={{
                        height: 17,
                        width: 17,
                        marginRight: 5,
                    }}
                />
                <TextInput
                    placeholder="search your friends or chapter"
                    style={{
                        flex: 1,
                        lineHeight: 18,
                        fontSize: 15
                    }}
                />
                <Image
                    source={images.ic_filter}
                    style={{
                        height: 17,
                        width: 17,
                        marginLeft: 10,
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.white
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: colors.grey,
        borderRadius: 10,
        margin: 10,
        paddingHorizontal: 15,
    }
})

export default HomeScreen
