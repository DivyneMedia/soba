import React from "react";
import { Image, ImageRequireSource, Pressable, StyleSheet, View } from 'react-native'
import images from "../assets/images";
import BoldText from "./BoldText";
import RegularText from "./RegularText";

export type ChatTileProps = {
    id: number
    profile: ImageRequireSource
    name: string
    lastSeen: string
    onOpen: () => any
    onFavPress: (() => void) | null
    isGroup?: boolean
}

const ChatTile = (props: ChatTileProps) => {
    const { id, lastSeen, name, profile, onOpen, onFavPress } = props
    return (
        <Pressable
            onPress={onOpen}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 15,
                paddingHorizontal: 15,
            }}
        >
            <Image
                style={{ height: 34, width: 34, borderRadius: 30, overflow: 'hidden' }}
                source={profile}
                resizeMode="contain" />
            <View style={{ flex: 1, marginLeft: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
                <BoldText style={{ fontSize: 12 }}>{name}</BoldText>
                <RegularText style={{ fontSize: 10 }}>{lastSeen}</RegularText>
            </View>
            {
                typeof onFavPress === "function"
                ? <Pressable
                        onPress={onFavPress}
                    >
                        <Image
                            style={{
                                height: 20,
                                width: 20
                            }}
                            source={images.ic_pin}
                            resizeMode="contain" />
                    </Pressable>
                : null
            }
        </Pressable>
    )
}

export default ChatTile
