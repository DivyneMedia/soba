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
        borderWidth: 2,
        borderRadius: 40,
        // overflow: 'hidden'
    },
    imageStyle: {
        height: 62,
        width: 62,
        opacity: 0.5,
        borderRadius: 40,
        overflow: 'hidden'
    },
    editButtonContainer: {
        // position: 'absolute',
        padding: 7,
        // marginRight: 0,
        // height: 35,
        // width: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -12,
        marginRight: -10,
        // borderWidth: 1
    },
    editLogoStyle: {
        height: 30,
        width: 30,
    }
})

export default ProfileButton
