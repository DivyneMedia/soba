import React from "react";
import { Image, ImageRequireSource, Pressable, StyleSheet, View } from 'react-native'
import images from "../assets/images";
import colors from "../constants/colors";
import BoldText from "./BoldText";
import RegularText from "./RegularText";

export type ChatTileProps = {
    id: number | string
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
                shadowColor: colors.black,
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.00,
                elevation: 1,
                backgroundColor: colors.white,
                paddingVertical: 10,
                marginHorizontal: 10,
                borderRadius: 10
            }}
        >
            <Image
                style={{ height: 48, width: 48, borderRadius: 100, overflow: 'hidden' }}
                source={profile}
                resizeMode="cover" />
            <View style={{ flex: 1, marginLeft: 10, alignItems: 'flex-start', justifyContent: 'center', overflow: 'hidden' }}>
                <BoldText style={{ fontSize: 12 }}>{name}</BoldText>
                {lastSeen ? <RegularText style={{ width: '100%', fontSize: 10 }} numberOfLines={1}>{lastSeen}</RegularText> : null}
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
