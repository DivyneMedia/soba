import React from "react";
import { Image, ImageBackground, ImageRequireSource, Pressable, StyleSheet } from "react-native";
import images from "../assets/images";
import colors from "../constants/colors";

type ProfileButtonType = {
    profileImageUri?: ImageRequireSource | any
    onPress: () => any
}

const ProfileButton = React.memo((props: ProfileButtonType) => {
    const { onPress, profileImageUri } = props
    return (
        <ImageBackground
            source={{ uri: profileImageUri }}
            style={styles.imageBackgoundStyle}
            imageStyle={styles.imageStyle}
            resizeMode="cover"
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
})

const styles = StyleSheet.create({
    imageBackgoundStyle: {
        height: 65,
        width: 65,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        // borderWidth: 2,
        borderRadius: 40,
        // overflow: 'hidden'
    },
    imageStyle: {
        height: 65,
        width: 65,
        opacity: 0.5,
        borderRadius: 40,
        overflow: 'hidden'
    },
    editButtonContainer: {
        padding: 7,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -12,
        marginRight: -10,
    },
    editLogoStyle: {
        height: 30,
        width: 30,
    }
})

export default ProfileButton
