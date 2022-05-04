import React, { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, View }  from 'react-native';

import images from "../assets/images";
import colors from "../constants/colors";
import { SuccessToast } from "../utils/ToastUtils";
import dummyData, { EventProps, NewsFeed } from "../data/dummyData";

import SearchBar from "../components/SearchBar";
import BoldText from "../components/BoldText";
import TextButton from "../components/TextButton";
import NewsFeedItem from "../components/NewsFeedItem";
import { SafeAreaView } from "react-native-safe-area-context";

type HomeScreenProps = {
    navigation: any
    route: any
}

const HomeScreen = (props: HomeScreenProps) => {
    const { navigation, route } = props

    const [searchText, setSearchText] = useState('')
    const [newsFeedSelected, setNewsFeedSelected] = useState(true)
    const [upcomingEventSelected, setUpcomingEventSelected] = useState(false)

    const filterButtonPressHandler = useCallback(() => {
        SuccessToast('Coming Soon')
    }, [])

    const morePressHandler = useCallback((type: 'NEWS' | 'EVENT') => {
        SuccessToast('Coming Soon')
    }, [])

    const registerEventHandler = useCallback(() => {
        SuccessToast('Coming Soon')
    }, [])

    const showDetailsHandler = useCallback((item: any) => {
        navigation.navigate('detailsScreen', {
            data: item
        })
    }, [navigation])

    const renderNewsFeedHandler = useCallback((item: any) => {
        try {
            const { item: newsFeed, index }: { item: NewsFeed, index: number } = item
           return (
               <NewsFeedItem
                    key={newsFeed.id}
                    title={newsFeed.title}
                    createdAt={newsFeed.createdAt}
                    comments={newsFeed.comments}
                    imageUri={images.bg_soba}
                    likes={newsFeed.likes}
                    description={newsFeed.description}
                    onMore={morePressHandler.bind(null, 'NEWS')}
                    onPress={showDetailsHandler.bind(null, newsFeed)}
               />
           )
        } catch (err: any) {
            console.log('[renderNewsFeedHandler] Error : ', err?.message)
            return null
        }
    }, [morePressHandler, showDetailsHandler])

    const renderEventsHandler = useCallback((item: any) => {
        try {
            const { item: event, index }: { item: EventProps, index: number } = item
           return (
               <NewsFeedItem
                    key={event.id}
                    title={event.title}
                    createdAt={event.duration}
                    imageUri={images.bg_soba}
                    description={event.description}
                    duration={event.duration}
                    onRegister={registerEventHandler}
                    onMore={morePressHandler.bind(null, 'EVENT')}
                    onPress={showDetailsHandler.bind(null, event)}
               />
           )
        } catch (err: any) {
            console.log('[renderEventsHandler] Error : ', err?.message)
            return null
        }
    }, [registerEventHandler, morePressHandler, showDetailsHandler])

    const NewsFeed = useMemo(() => {
        return (
            <FlatList
                data={dummyData.newsFeed}
                renderItem={renderNewsFeedHandler}
                keyExtractor={(item, index) => index.toString()}
            />
        )
    }, [renderNewsFeedHandler])

    const Event = useMemo(() => {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.eventTypesContainer}>
                    <TextButton
                        isSelected={upcomingEventSelected}
                        text="Upcoming"
                        onPress={setUpcomingEventSelected.bind(null, true)}
                        textStyle={{ fontSize: 12 }}
                        style={{ paddingVertical: 5 }}
                    />
                    <TextButton
                        isSelected={!upcomingEventSelected}
                        text="Past"
                        onPress={setUpcomingEventSelected.bind(null, false)}
                        textStyle={{ fontSize: 12 }}
                        style={{ paddingVertical: 5 }}
                    />
                </View>
                <FlatList
                    data={dummyData.events}
                    renderItem={renderEventsHandler}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }, [upcomingEventSelected])

    return (
        <SafeAreaView style={styles.root}>
            <SearchBar
                value={searchText}
                onChangeText={setSearchText}
                onFilterButtonPress={filterButtonPressHandler}
            />
            <View style={styles.newsFeedEventButtonContainer}>
                <TextButton
                    isSelected={newsFeedSelected}
                    text="News Feed"
                    onPress={setNewsFeedSelected.bind(null, true)}
                />
                <TextButton
                    isSelected={!newsFeedSelected}
                    text="Event"
                    onPress={setNewsFeedSelected.bind(null, false)}
                />
            </View>
            <BoldText style={styles.contentText}>{"SOBBA Dallas related content"}</BoldText>
            {newsFeedSelected ? NewsFeed : Event}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.white
    },
    newsFeedEventButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.grey,
        height: 50,
        marginHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden'
    },
    contentText: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 10,
        marginVertical: 10,
        color: colors.black,
    },
    eventTypesContainer: {
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

export default HomeScreen
