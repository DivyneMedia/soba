import React, { useCallback, useLayoutEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import ExecutivesItem from '../components/ExecutivesItem'

import colors from '../constants/colors'
import { keyExtractHandler } from '../utils/MiscUtils'

type ExecutivesScreenProps = {
    navigation: any,
    route: any
}

const tempData = [
    {
        id: 0,
        name: 'Firstname Lastname',
        role: 'president',
        email: 'john@gmail.com',
        phone: '+1 (808) 722-8888',
    },
    {
        id: 1,
        name: 'Firstname Lastname',
        role: 'president',
        email: 'john@gmail.com',
        phone: '+1 (808) 722-8888',
    },
    {
        id: 2,
        name: 'Firstname Lastname',
        role: 'president',
        email: 'john@gmail.com',
        phone: '+1 (808) 722-8888',
    },
    {
        id: 3,
        name: 'Firstname Lastname',
        role: 'president',
        email: 'john@gmail.com',
        phone: '+1 (808) 722-8888',
    },
    {
        id: 4,
        name: 'Firstname Lastname',
        role: 'president',
        email: 'john@gmail.com',
        phone: '+1 (808) 722-8888',
    },
    {
        id: 5,
        name: 'Firstname Lastname',
        role: 'president',
        email: 'john@gmail.com',
        phone: '+1 (808) 722-8888',
    },
]

const ExecutivesScreen = (props: ExecutivesScreenProps) => {
    const { navigation, route } = props
    const params = route?.params

    // console.log('params : ', params?.chapter)
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "SOBA Dallas Executives"
        })
    }, [navigation])

    const renderExecutivesHandler = useCallback((itemObj) => {
        const { item, index } = itemObj
        const {
            id,
            name,
            role,
            email,
            phone
        } = item
        try {
            return (
                <ExecutivesItem
                    key={id}
                    id={id}
                    name={name}
                    role={role}
                    email={email}
                    phoneNumber={phone}
                    onChat={() => {}}
                />
            )
        } catch (err: any) {
            console.log('Error : ', err.message)
            return null
        }
    }, [])

    return (
        <SafeAreaView style={styles.root}>
            <FlatList
                data={tempData}
                renderItem={renderExecutivesHandler}
                keyExtractor={keyExtractHandler}
                style={{
                    flex: 1,
                }}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 10
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.white
    }
})

export default ExecutivesScreen
