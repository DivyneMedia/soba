import React, { useCallback, useMemo, useState } from "react";
import { FlatList, Image, ImageRequireSource, Pressable, StyleSheet, View }  from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../assets/images";
import BoldText from "../components/BoldText";
import DonationItem from "../components/DonationItem";
import RegularText from "../components/RegularText";
import TextButton from "../components/TextButton";
import colors from "../constants/colors";
import { keyExtractHandler } from "../utils/MiscUtils";

const data = [
    {
        id: 0,
        logo: images.ic_logo,
        title: 'Annual Dues 2021',
        origin: 'SOBA America',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique vel tortor suscipit venenatis. Cras consequat interdum sollicitudin. Nunc eu sem nec velit accumsan blandit eget id magna. Vestibulum faucibus augue sit amet porta sodales. `,
    },
    {
        id: 1,
        logo: images.ic_soba_america,
        title: 'Annual Dues 2020',
        origin: 'SOBA America',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique vel tortor suscipit venenatis. Cras consequat interdum sollicitudin. Nunc eu sem nec velit accumsan blandit eget id magna. Vestibulum faucibus augue sit amet porta sodales. `,
    },
    {
        id: 2,
        logo: images.ic_soba_uk,
        title: 'Mandatory Condolence Drive',
        origin: 'SOBA America',
        description: `This is a mandatory condolence drive for Soban 4901, William Etta (aka Ben Mabrouk), of SOBA ’85 and SOBA Dallas, who lost his mother on Wednesday, September 22, 2021, in the UK…`,
    },
]

type GiftCardScreenProps = {
    navigation: any
    route: any
}

type EventProps = {
    id: number
    logo: ImageRequireSource
    title: string
    origin: string
    description: string
}

const GiftCardScreen = (props: GiftCardScreenProps) => {
    const { navigation } = props
    
    const [mandatory, setMandatory] = useState(true)

    const showDetailsHandler = useCallback((eventPayload: any) => {
        const { description, id, logo, origin, title } = eventPayload
        navigation.navigate('donationDetails', {
            id,
            title,
            description,
            logo,
            origin,
        })
    }, [navigation])

    const renderItemHandler = useCallback((item: any) => {
        try {
            const {item: event, index}: {item: EventProps, index: number} = item
            const { description, id, logo, origin, title } = event

            return (
                <DonationItem
                    description={description}
                    logo={logo}
                    origin={origin}
                    title={title}
                    onOpen={showDetailsHandler.bind(null, event)}
                />
            )
        } catch (err: any) {
            console.log('Error : ', err?.message)
            return null
        }
    }, [])

    return (
        <SafeAreaView style={styles.rootContainer}>
            <View style={styles.root}>
                <View style={styles.titleContainer}>
                    <BoldText style={styles.title}>{"Financial & Drives"}</BoldText>
                </View>
                <RegularText style={styles.sobaText}>{"SOBA Dallas related content"}</RegularText>
                <View style={styles.donationTypeContainer}>
                    <TextButton
                        isSelected={mandatory}
                        text="Mandatory"
                        onPress={setMandatory.bind(null, true)}
                        textStyle={styles.btnText}
                        style={styles.btnStyle}
                    />
                    <TextButton
                        isSelected={!mandatory}
                        text="Voluntary"
                        onPress={setMandatory.bind(null, false)}
                        textStyle={styles.btnText}
                        style={styles.btnStyle}
                    />
                </View>
                <FlatList
                    data={data}
                    renderItem={renderItemHandler}
                    keyExtractor={keyExtractHandler}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    root: {
        flex: 1,
        backgroundColor: colors.white
    },
    titleContainer: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.grey
    },
    title: { marginLeft: 10 },
    sobaText: {color: 'grey', alignSelf: 'center', fontSize: 10, marginVertical: 5},
    btnText: { fontSize: 12 },
    btnStyle: { paddingVertical: 5 },
    donationTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.grey,
        height: 30,
        marginHorizontal: '15%',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 5,
    }
})

export default GiftCardScreen
