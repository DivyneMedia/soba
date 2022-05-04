import React from 'react'
import { Image, Pressable, View } from 'react-native'
import images from '../assets/images'

type HeaderComponentProps = {
    onBack: () => any
}

const HeaderComponent = (props: HeaderComponentProps) => {
    const { onBack } = props
    return (
        <View
            style={{
                position: 'absolute',
                height: 56,
                paddingHorizontal: 10,
                justifyContent: 'center'
            }}
        >
            <Pressable
                onPress={onBack}
                style={{
                    borderRadius: 30,
                    padding: 5
                }}
            >
            <Image
                source={images.ic_back}
                style={{
                    height: 18,
                    width: 18
                }}
                resizeMode="contain"
            />
            </Pressable>
        </View>
    )
}

export default HeaderComponent