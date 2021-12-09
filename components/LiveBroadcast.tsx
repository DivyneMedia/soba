import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import images from "../assets/images";
import colors from "../constants/colors";
import BoldText from "./BoldText";

type LiveBroadcastProps = {
    onPress: () => any
}

const LiveBroadcast = (props: LiveBroadcastProps) => {
    const { onPress } = props
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image
                source={images.ic_video_camera}
                style={styles.img}
                resizeMode="contain"
            />
            <BoldText style={{ marginLeft: 10 }}>{"Live Broadcast"}</BoldText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 20,
        paddingVertical: 5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        height: 24,
        width: 24,
    }
})

export default LiveBroadcast;
