import React, { forwardRef, useCallback, useState } from "react"
import { Image, View, TextInput, TextInputProps, TextStyle, Pressable, ViewStyle } from 'react-native'
import images from "../assets/images"
import colors from "../constants/colors"
import RegularText from "./RegularText"

type RoundedInputProps = {
    inputStyle?: TextStyle
    password?: boolean
    style?: ViewStyle
}

const RoundedInput = forwardRef((props: RoundedInputProps & TextInputProps, ref: any) => {
    const { password, style }  = props
    const [showPassword, setShowPassword] = useState(true)

    const manageTextVisibilityHandler = useCallback(() => {
        setShowPassword(prevState => !prevState)
    }, [])

    return (
        <View
            style={{
                borderRadius: 30,
                borderWidth: 1,
                marginTop: 20,
                ...style
            }}
        >
            <RegularText
                style={{
                    position: 'absolute',
                    top: -12,
                    left: 22,
                    backgroundColor: colors.white,
                    paddingHorizontal: 5,
                }}
            >
                {props.placeholder}
            </RegularText>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    {...props}
                    secureTextEntry={password ? showPassword : false}
                    placeholder=""
                    ref={ref}
                    style={{ flex: 1, paddingHorizontal: 20, ...props.inputStyle }}
                />
                {
                    password
                    ?
                        <Pressable
                            style={{
                                padding: 5,
                                marginRight: 15
                            }}
                            onPress={manageTextVisibilityHandler}
                        >
                            <Image
                                source={images.ic_visibility}
                                style={{
                                    height: 20,
                                    width: 20
                                }}
                                resizeMode="contain"
                            />
                        </Pressable>
                    :
                        null
                }
            </View>
        </View>
    )
})
 
export default RoundedInput;
