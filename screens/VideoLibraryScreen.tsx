import React, { useCallback } from "react";
import { FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, View, VirtualizedList }  from 'react-native';
import imageFiles from "../assets/imageFiles";
import images from "../assets/images";
import BoldText from "../components/BoldText";
import LiveBroadcast from "../components/LiveBroadcast";
import RegularText from "../components/RegularText";
import Root from "../components/RootComponent";
import colors from "../constants/colors";
import { SuccessToast } from "../utils/ToastUtils";

const videoData = [
    {
        id: 0,
        videoUri: images.bg_soba,
        title: 'SOBA Arizona at canyon',
        source: 'SOBA America TV'
    },
    {
        id: 1,
        videoUri: images.bg_soba,
        title: 'BRAND Project',
        source: 'SOBA America TV'
    },
    {
        id: 2,
        videoUri: images.bg_soba,
        title: 'SOBA Arizona at canyon',
        source: 'SOBA America TV'
    },
]

type VideoLibraryScreenProps = {

}

const VideoLibraryScreen = (props: VideoLibraryScreenProps) => {
    const onLiveBroadcast = useCallback(() => {
        SuccessToast("Coming Soon.")
    }, [])

    const renderItemHandler = useCallback((item: any) => {
        try {
            const { item: videoPayload, index } = item
            return (
                <Pressable
                    style={{ marginVertical: 5 }}
                >
                    <ImageBackground
                        style={{
                            height: 180,
                            width: 250,
                            marginLeft: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center'
                        }}
                        imageStyle={{
                            height: 180,
                            width: 250,
                            borderRadius: 10,
                            opacity: 0.75,
                        }}
                        resizeMode="cover"
                        source={videoPayload.videoUri}
                    >
                        <Image
                            source={images.ic_play_button}
                            style={{
                                height: 48,
                                width: 48
                            }}
                        />
                    </ImageBackground>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                            paddingHorizontal: 10,
                        }}
                    >
                        <View style={{ flex: 1, marginLeft: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
                            <BoldText style={{ fontSize: 12 }}>{'Man. United 0 - 5 Liverpool'}</BoldText>
                            <RegularText style={{ fontSize: 10 }}>{'SOBA America TV - SPORTS'}</RegularText>
                        </View>
                        <Image
                            style={{
                                height: 24,
                                width: 22
                            }}
                            source={images.ic_forward}
                            resizeMode="contain"
                        />
                    </View>
                </Pressable>
            )
        } catch (err: any) {
            console.log('Error : ', err.message)
            return null
        }
    }, [])
    
    return (
        <Root style={styles.root}>
            <View
                style={{
                    paddingHorizontal: 20,
                }}
            >
                <LiveBroadcast onPress={onLiveBroadcast} />
                <ImageBackground
                    style={{
                        height: 200,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center'
                    }}
                    imageStyle={{
                        height: 200,
                        width: '100%',
                        borderRadius: 10,
                        opacity: 0.75,
                    }}
                    resizeMode="cover"
                    source={imageFiles.banner}
                >
                    <Image
                        source={images.ic_play_button}
                        style={{
                            height: 48,
                            width: 48
                        }}
                    />
                </ImageBackground>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 15,
                    }}
                >
                    <Image
                        style={{ height: 38, width: 38 }}
                        source={images.ic_logo}
                        resizeMode="contain" />
                    <View style={{ flex: 1, marginLeft: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <BoldText style={{ fontSize: 12 }}>{'Man. United 0 - 5 Liverpool'}</BoldText>
                        <RegularText style={{ fontSize: 10 }}>{'SOBA America TV - SPORTS'}</RegularText>
                    </View>
                    <Pressable
                        onPress={() => { }}
                    >
                        <Image
                            style={{
                                height: 24,
                                width: 22
                            }}
                            source={images.ic_forward}
                            resizeMode="contain" />
                    </Pressable>
                </View>
                <BoldText style={{ color: 'grey' }}>{"Other Videos"}</BoldText>
            </View>
            <FlatList
                data={videoData}
                horizontal
                renderItem={renderItemHandler}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingRight: 10,
                    marginLeft: 10,
                }}
            />
            <FlatList
                data={videoData}
                horizontal
                renderItem={renderItemHandler}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 10,
                    marginLeft: 10,
                    paddingRight: 10,
                    marginBottom: 20
                }}
            />
        </Root>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.white
    }
})

export default VideoLibraryScreen
