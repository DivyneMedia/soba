import React from "react";
import { Image, ImageRequireSource, StyleSheet } from "react-native";

type MembershipSymbolProps = {
    icon: ImageRequireSource
}

const MembershipSymbol = (props: MembershipSymbolProps) => {
    const { icon } = props
    return (
        <Image
            source={icon}
            style={styles.container}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        height: 18,
        width: 18,
        marginHorizontal: 2
    }
})

export default MembershipSymbol;