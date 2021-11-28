import React from "react";
import { Pressable, StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { Image } from "react-native";
import images from "../assets/images";
import colors from "../constants/colors";

type SearchBarProps = {
    onFilterButtonPress: () => any
}

const SearchBar = (props: SearchBarProps & TextInputProps) => {
    const { onFilterButtonPress, ...otherProps } = props
    return (
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
                placeholder={"search your friends or chapter"}
                style={{
                    flex: 1,
                    lineHeight: 18,
                    fontSize: 15
                }}
                {...otherProps}
            />
            <Pressable
                onPress={onFilterButtonPress}
            >
                <Image
                    source={images.ic_filter}
                    style={{
                        height: 17,
                        width: 17,
                        marginLeft: 10,
                    }}
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
    }
})

export default SearchBar;
