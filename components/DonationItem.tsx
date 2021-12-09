import React from 'react';
import { Image, ImageRequireSource, Pressable, StyleSheet, View } from 'react-native'
import colors from '../constants/colors';
import BoldText from './BoldText';
import RegularText from './RegularText';

type DonationItemProps = {
    onOpen: () => any
    logo: ImageRequireSource
    title: string
    origin: string
    description: string
}

const DonationItem = (props: DonationItemProps) => {
    const { description, logo, onOpen, origin, title } = props
    return (
        <Pressable
            onPress={onOpen}
            style={styles.root}
        >
            <Image
                style={{ height: 34, width: 34, borderRadius: 30, overflow: 'hidden' }}
                source={logo}
                resizeMode="contain" />
            <View style={{ flex: 1, marginLeft: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
                <BoldText style={{ fontSize: 12 }}>{title}</BoldText>
                <RegularText style={{ fontSize: 10 }}>{origin}</RegularText>
                <RegularText style={{ fontSize: 10, marginTop: 3 }}>{description}</RegularText>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.grey,
        paddingVertical: 10
    }
})

export default DonationItem
