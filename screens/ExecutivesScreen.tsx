import React, { useCallback, useLayoutEffect, useMemo } from 'react'
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppLoader from '../components/AppLoader'

import ExecutivesItem from '../components/ExecutivesItem'

import colors from '../constants/colors'
import useExecutives, { ExecutiveItemType } from '../hooks/useExecutives'
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

    const {
        isLoading,
        endReached,
        executives,
        getExecutives,
        fetchMore
    } = useExecutives({
        fetchOnMount: true
    })

    // console.log('params : ', params?.chapter)
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "SOBA Dallas Executives"
        })
    }, [navigation])

    const renderExecutivesHandler = useCallback((itemObj) => {
        const { item, index }: { item: ExecutiveItemType, index: number } = itemObj
        const {
            id,
            name,
            role,
            email,
            phoneNo
        } = item
        try {
            return (
                <ExecutivesItem
                    key={id}
                    id={id}
                    name={name}
                    role={role}
                    email={email}
                    phoneNumber={phoneNo}
                    onChat={() => {}}
                />
            )
        } catch (err: any) {
            console.log('Error : ', err.message)
            return null
        }
    }, [])

    const listFooterComponent = useMemo(() => {
        return !endReached
        ? <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={"large"} color={colors.primary} />
        </View>
        : null
    }, [endReached])

    return (
        <SafeAreaView style={styles.root}>
            <AppLoader isVisible={isLoading} />
            <FlatList
                data={executives}
                renderItem={renderExecutivesHandler}
                keyExtractor={keyExtractHandler}
                style={styles.listStyle}
                contentContainerStyle={styles.listContainerStyle}
                ListFooterComponent={listFooterComponent}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.white
    },
    listStyle: {
        flex: 1,
    },
    listContainerStyle: {
        marginTop: 10,
        paddingBottom: 10
    }
})

export default ExecutivesScreen
