import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native'
import images from '../assets/images';
import BoldText from '../components/BoldText'
import RegularText from '../components/RegularText';
import colors from '../constants/colors'

type DetailsScreenProps = {
    navigation: any
    route: any
}

const DetailsScreen = (props: DetailsScreenProps) => {
    const { navigation, route } = props
    const { params } = route
    const data = params?.data
    const { comments, createdAt, description, id, imageUri, likes, title} = data

    return (
        <View style={styles.container}>
            <Image
                style={{ 
                    height: 200,
                    width: '95%',
                    borderRadius: 10,
                    marginTop: 10,
                    alignSelf: 'center',
                    // marginHorizontal: 10,
                }}
                source={imageUri}
            />
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
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
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <RegularText style={{ marginTop: 10 }}>{description}</RegularText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
})

export default DetailsScreen
