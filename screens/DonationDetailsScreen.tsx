import React from "react";
import { StyleSheet, View } from 'react-native'
import BoldText from "../components/BoldText";
import colors from "../constants/colors";

const DonationDetailsScreen = () => {
    return (
        <View style={styles.root}>
            <BoldText>Donation Detail Screen</BoldText>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.white
    }
})

export default DonationDetailsScreen
