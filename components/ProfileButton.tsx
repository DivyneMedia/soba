import React from "react";
import { Image, ImageBackground, ImageRequireSource, Pressable, StyleSheet } from "react-native";
import images from "../assets/images";
import colors from "../constants/colors";

type ProfileButtonType = {
    profileImageUri?: ImageRequireSource
    onPress: () => any
}

const ProfileButton = (props: ProfileButtonType) => {
    const { onPress, profileImageUri } = props
    return (
        <ImageBackground
            source={profileImageUri || images.ic_user}
            style={styles.imageBackgoundStyle}
            imageStyle={styles.imageStyle}
            resizeMode="contain"
        >
            <Pressable onPress={onPress} style={styles.editButtonContainer}>
                <Image
                    source={images.ic_edit}
                    style={styles.editLogoStyle}
                    resizeMode="contain"
                />
            </Pressable>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imageBackgoundStyle: {
        height: 65,
        width: 65,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    imageStyle: {
        height: 65,
        width: 65,
        opacity: 0.5
    },
    editButtonContainer: {
        padding: 7,
        backgroundColor: colors.white,
        borderRadius: 30,
        marginRight: -2,
        marginBottom: -12,
        borderWidth: 1
    },
    editLogoStyle: {
        height: 12,
        width: 12,
    }
})

export default ProfileButton
