import React from "react";
import { Image, ImageBackground, ImageRequireSource, Pressable, StyleSheet, View } from 'react-native'

import images from "../assets/images";
import colors from "../constants/colors";

import BoldText from "./BoldText";
import IconButton from "./IconButton";
import RegularText from "./RegularText";
import RoundedButton from "./RoundedButton";

type NewsFeedItemProps = {
    title: string
    createdAt: string
    duration?: string
    imageUri: ImageRequireSource
    description: string
    likes?: string | number
    comments?: string | number
    onRegister?: () => any
    onMore: () => any
}

const checkPropsEqual = (prevProps: NewsFeedItemProps, newProps: NewsFeedItemProps): boolean => {
    return false
}

const NewsFeedItem = (props: NewsFeedItemProps) => {
    const {
        title,
        createdAt,
        duration,
        imageUri,
        description,
        likes,
        comments,
        onMore,
        onRegister
    } = props

    return (
        <View
            style={{
                borderRadius: 10,
                padding: 10,
                marginHorizontal: 10,
                marginVertical: 5,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Image
                    style={{ height: 38, width: 38 }}
                    source={images.ic_logo}
                />
                <View style={{ flex: 1, marginLeft: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
                    <BoldText style={{ fontSize: 12 }}>{title}</BoldText>
                    <RegularText style={{ fontSize: 10 }}>{createdAt}</RegularText>
                </View>
                <Pressable
                    onPress={onMore}
                >
                    <Image
                        style={{
                            height: 24,
                            width: 22
                        }}
                        source={images.ic_more_options}
                    />
                </Pressable>
            </View>
            {
                likes || comments
                ? <RegularText style={{ fontSize: 14, marginTop: 5 }}>{description}</RegularText>
                :  null
            }
            <ImageBackground
                style={{
                    height: 200,
                    width: '100%',
                    justifyContent: 'flex-end',
                    opacity: 0.92,
                }}
                imageStyle={{
                    height: 200,
                    width: '100%',
                    borderRadius: 10,
                    marginTop: 10
                }}
                resizeMode="cover"
                source={imageUri}
            >
                {
                    onRegister && <RoundedButton
                        text={"Register"}
                        onPress={onRegister}
                        style={{
                            alignSelf: 'flex-start',
                            width: "26%",
                            marginLeft: 10,
                            paddingVertical: 10,
                        }}
                        textStyle={{
                            fontSize: 12
                        }}
                    />
                }
            </ImageBackground>
            {
                likes || comments
                ?
                    <View
                        style={{
                            width: '20%',
                            paddingVertical: 10,
                            paddingHorizontal: 30,
                            borderTopLeftRadius: 30,
                            backgroundColor: colors.white,
                            marginTop: -25,
                            alignSelf: 'flex-end',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {/* <IconButton
                            icon={images.ic_heart_selected}
                            text={likes}
                        />
                        <IconButton
                            icon={images.ic_comment}
                            text={comments}
                        /> */}
                        <IconButton
                            icon={images.ic_forward}
                        />
                    </View>
                :
                    <View
                        style={{
                            width: '70%',
                            paddingVertical: 10,
                            paddingHorizontal: 5,
                            borderTopLeftRadius: 30,
                            backgroundColor: colors.white,
                            marginTop: -25,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                        }}
                    >
                        <RegularText style={{ fontSize: 9, textAlign: 'center' }}>{description}</RegularText>
                        <RegularText style={{ fontSize: 8, textAlign: 'center' }}>{duration}</RegularText>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({

})

export default NewsFeedItem;

// export default React.memo(NewsFeedItem, checkPropsEqual);
