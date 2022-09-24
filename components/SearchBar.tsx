import React from "react";
import { Pressable, StyleSheet, TextInput, TextInputProps, View, Image } from "react-native";

import images from "../assets/images";
import colors from "../constants/colors";

type SearchBarProps = {
    onClearButtonPress: () => any
    onFilterButtonPress: () => any
}

const SearchBar = (props: SearchBarProps & TextInputProps) => {
    const { onFilterButtonPress, onClearButtonPress, ...otherProps } = props
    return (
        <View style={styles.searchBarContainer}>
            <Image
                source={images.ic_search}
                style={styles.searchIcon}
            />
            <TextInput
                placeholder={"search your friends or chapter"}
                style={{
                    flex: 1,
                    lineHeight: 18,
                    fontSize: 15
                }}
                {...otherProps}
            />
            <Pressable
                onPress={onClearButtonPress}
            >
                <Image
                    source={images.ic_clear}
                    style={styles.filterIcon}
                />
            </Pressable>
            <Pressable
                onPress={onFilterButtonPress}
            >
                <Image
                    source={images.ic_filter}
                    style={styles.filterIcon}
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: colors.grey,
        borderRadius: 10,
        margin: 10,
        paddingHorizontal: 15,
    },
    searchIcon: {
        height: 17,
        width: 17,
        marginRight: 5,
    },
    filterIcon: {
        height: 17,
        width: 17,
        marginLeft: 10,
    }
})

export default SearchBar;
