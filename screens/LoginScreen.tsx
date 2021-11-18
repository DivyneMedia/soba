import React, { useCallback, useRef, useState } from "react";
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native';
import images from "../assets/images";
import AuthFooter from "../components/AuthFooter";
import BoldText from "../components/BoldText";
import RegularText from "../components/RegularText";
import RoundedButton from "../components/RoundedButton";
import RoundedInput from "../components/RoundedInput";
import colors from "../constants/colors";
// import { TextField, FilledTextField, OutlinedTextField } from 'rn-material-ui-textfield'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const onForgotPasswordPress = useCallback(() => {
        console.log('forgot password')
    }, [])

    return (
        <View style={styles.root}>
            <View style={styles.headerContainer}>
                <Image
                    style={styles.logoStyle}
                    source={images.ic_logo}
                />
            </View>
            <View style={styles.detailsContainer}>
                <View style={{ flex: 1 }}>
                
                <BoldText style={{ fontSize: 22, alignSelf: 'center' }}>
                    {"Sign-in Now!"}
                </BoldText>
                <RoundedInput
                    placeholder="email or username"
                    value={email}
                    onChangeText={setEmail.bind(null)}
                    maxLength={50}
                />
                <RoundedInput
                    placeholder="password"
                    value={password}
                    onChangeText={setPassword.bind(null)}
                    secureTextEntry={true}
                    returnKeyType="done"
                    maxLength={15}
                />
                <RegularText onPress={onForgotPasswordPress} style={{ alignSelf: 'flex-end', marginVertical: 10 }}>{"forgot passoword"}</RegularText>
                <RoundedButton
                    text="Sign in"
                    onPress={() => {}}
                />
                </View>
                <AuthFooter
                    baseText={"Don't have an account? "}
                    innerText={"Claim Now"}
                    onPress={() => {}}
                    style={{ marginBottom: 15 }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    headerContainer: {
        flex: 0.35,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'pink'
    },
    logoStyle: {
        height: 100,
        width: 100,
    },
    detailsContainer: {
        flex: 0.65,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20,
        paddingHorizontal: 30
    }
})

export default LoginScreen
