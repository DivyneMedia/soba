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
                <BoldText style={{ fontSize: 24 }} >{"SOBA AMERICA"}</BoldText>
                <Image
                    source={images.ic_soba_america}
                    style={{
                        height: 150,
                        width: 150,
                        marginTop: 8
                    }}
                    resizeMode="contain"
                />
                <RegularText style={{ fontSize: 12, marginTop: 20 }}>{"Few Proud Different"}</RegularText>
            </View>
        </ImageBackground>
    )
}

export default SplashScreen