import React from "react";
import { ImageBackground } from 'react-native'
import images from "../assets/images";
import Root from "./RootComponent";

const BackgroundImageComp = (props: any) => {
    const { dismissKeyboardAvoiding, children } = props
    return (
        <Root dismissKeyboardAvoiding={dismissKeyboardAvoiding} >
            <ImageBackground
                source={images.bg_soba}
                style={{
                    height: "100%",
                    width: "100%"
                }}
                imageStyle={{
                    opacity: 0.1
                }}
                resizeMode="cover"
            >
                {children}
            </ImageBackground>
        </Root>
    )
}

export default BackgroundImageComp;
