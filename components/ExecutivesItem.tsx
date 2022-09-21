import React from "react";
import { StyleSheet, View } from "react-native";

import TextLogoButton from '../components/TextLogoButton'
import RoundedButton from '../components/RoundedButton'
import images from "../assets/images";
import TitleText from "./TitleText";
import colors from "../constants/colors";

type ExecutivesItemProps = {
    id: string
    name: string
    role: string
    email: string
    phoneNumber: string
    onChat(obj: any): void
}

const ExecutivesItem = (props: ExecutivesItemProps) => {
    const {
        id,
        email,
        name,
        role,
        phoneNumber,
        onChat
    } = props

    return (
        <View
            key={id}
            style={styles.container}
        >
            {/* <TextLogoButton
                icon={images.ic_chapter}
                text={name}
            /> */}
            <TitleText
                logo={images.ic_chapter}
                title={name}
                text={role}
            />
            <TextLogoButton
                icon={images.ic_email}
                text={email}
                noBold
            />
            <TextLogoButton
                icon={images.ic_phone}
                text={phoneNumber}
                noBold
            />
            {/* <RoundedButton
                text='Chat'
                onPress={onChat}
                style={styles.chatBtn}
                textStyle={styles.chatBtnText}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderWidth: 2,
        borderColor: colors.grey,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    chatBtn: {
        borderRadius: 0,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    chatBtnText: {
        fontSize: 14,
        fontWeight: 'normal'
    }
})

export default ExecutivesItem
