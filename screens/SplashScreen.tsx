import React from "react";
import { Image, ImageBackground, View } from "react-native";
import images from "../assets/images";
import BoldText from "../components/BoldText";
import RegularText from "../components/RegularText";

const SplashScreen = (props: any) => {
    return (
        <ImageBackground
            source={images.bg_soba}
            imageStyle={{
                height: '100%',
                width: '100%',
                opacity: 0.09
            }}
            resizeMode="cover"
            style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <View
                style={{
                    alignItems:'center',
                    justifyContent: 'center'
                }}
            >
                <BoldText style={{ fontSize: 26 }} >{"SOBA"}</BoldText>
                <RegularText style={{ fontSize: 12 }}>{"SASSE Old Boys Association"}</RegularText>
                <Image
                    source={images.ic_logo}
                    style={{
                        height: 180,
                        width: 180,
                        marginTop: 8
                    }}
                />
            </View>
        </ImageBackground>
    )
}

export default SplashScreen