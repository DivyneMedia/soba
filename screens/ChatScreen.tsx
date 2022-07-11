// // import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
// // import { FlatList, Pressable, StyleSheet, View }  from 'react-native';
// // import { SafeAreaView } from "react-native-safe-area-context";

// // import useChat from "../hooks/useChat";

// // import SearchBar from "../components/SearchBar";
// // import TextButton from "../components/TextButton";
// // import ChatTile, { ChatTileProps } from "../components/ChatTile";

// // import colors from "../constants/colors";
// // import images from "../assets/images";

// // import debounce from 'lodash.debounce'

// // import { height, keyExtractHandler } from "../utils/MiscUtils";
// // import { ErrorToast, SuccessToast } from "../utils/ToastUtils";
// // import BoldText from "../components/BoldText";
// // import { useFocusEffect } from "@react-navigation/native";
// // import { LoaderContext } from "../context/LoaderContextProvider";
// // import ChatFilterModal, { ChatFilterModalRefTypes } from "../components/ChatFilterModal";
// // import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
// // import useBackPreventHook from "../hooks/useBackPreventHook";
// // import firestore from '@react-native-firebase/firestore'
// // import RegularText from "../components/RegularText";
// // import { FIRESTORE_USER } from "../types";
// // import { useSelector } from "react-redux";
// // import { USER } from "../types/UserResponse";
// // import appConstants from "../constants/appConstants";

// // type ChatScreenProps = {
// //     navigation: any
// //     route: any
// // }

// // const ChatScreen = (props: ChatScreenProps) => {
// //     const { navigation, route } = props
// //     // console.log('route : ', route)

// //     // const { userData }: { userData: USER } = useSelector((state: any) => state.auth)
// //     // const isAdmin = useMemo(() => userData?.["Email 1"] === "admin@gmail.com", [userData?.["Email 1"]])

// //     const loaderContext = useContext(LoaderContext)

// //     const {
// //         isLoading,
// //         isAdmin,
// //         // officialChats,
// //         adminChats,
// //         approvedChats,
// //         getAdminOfficialChannelsHandler,
// //         // getAllOfficialChannelsHandler,
// //         userChats,
// //         getUserChatsHandler,
// //         createChannelIdDoesNotExist,
// //         getUsersChatsHandler
// //         // toggleLoaderHandler
// //     } = useChat()

// //     useEffect(() => {
// //         getUsersChatsHandler()
// //     }, [])

// //     const userData: USER = useSelector((state: any) => state?.auth?.userData)
    
// //     const [searchText, setSearchText] = useState('')
// //     const [searchData, setSearchData] = useState<any[]>([])
// //     const [approvals, setApprovals] = useState(false)

// //     const chatFilterModalRef = useRef<ChatFilterModalRefTypes>()
    
// //     const getFlag = useCallback(() => chatFilterModalRef.current?.isVisible?.current, [])
    
// //     const backActionHandler = useCallback(() => {
// //         chatFilterModalRef.current?.hide()
// //     }, [])
    
// //     /**
// //      * Prevent Back press on android
// //      * @param getFlag: () => boolean // true to prevent back press
// //      * @param backActionHandler: () => void // action code to handler on backpress when flag is true.
// //      */
// //     useBackPreventHook(getFlag, backActionHandler)

// //     useFocusEffect(() => {
// //         if (route?.params?.refresh) {
// //             getAdminOfficialChannelsHandler()
// //             delete route?.params?.refresh
// //         }
// //     })

// //     const filterButtonPressHandler = useCallback(() => {
// //         chatFilterModalRef.current?.show()
// //     }, [])

// //     const openChatHandler = useCallback((chatPayload: any, name: string) => {
// //         const {
// //             channelId,
// //             createdAt,
// //             isDeleted,
// //             lastMessage,
// //             lastMessageType,
// //             memberIds,
// //             senderId,
// //             updatedAt,
// //             crmAccId,
// //             isAdmin
// //         } = chatPayload
// //         const msgSenderId = isAdmin ? channelId.split('_').filter((id: string) => id !== senderId)[0] : senderId
// //         navigation.navigate('chattingScreen', {
// //             showApproveBtn: approvals,
// //             chatName: name || 'Messages',
// //             chatChannelId: channelId,
// //             chatSenderId: msgSenderId,
// //             crmAccId
// //         })
// //     }, [navigation, approvals])

// //     const favoriteChatHander = useCallback((chatPayload: any) => {
// //        SuccessToast('Coming Soon')
// //     }, [])

// //     const renderChatListHandler = useCallback((item: any) => {
// //         try {
// //             const {item: chat, index}: { item: ChatTileProps, index: number } = item
// //             const { id, lastMessage, name, profile, isGroup } = chat
// //             return (
// //                 <ChatTile
// //                     id={id}
// //                     lastSeen={lastMessage}
// //                     name={name || 'No Name'}
// //                     profile={profile || images.ic_soba_america}
// //                     onOpen={openChatHandler.bind(null, chat, name)}
// //                     onFavPress={isGroup ? favoriteChatHander.bind(null, chat) : null}
// //                 />
// //             )
// //         } catch (err: any) {
// //             console.log('Error : ', err.message)
// //             return null
// //         }
// //     }, [openChatHandler, favoriteChatHander])

// //     useEffect(() => {
// //         getAdminOfficialChannelsHandler()
// //         getUserChatsHandler()
// //     }, [getAdminOfficialChannelsHandler, getUserChatsHandler])

// //     const renderListFoorter = useMemo(() => {
// //         if (isLoading) {
// //             return null
// //         }
// //         return (
// //             <View style={{ height: height - 100, alignItems: 'center', justifyContent: 'center' }}>
// //                 <BoldText>No Data Available</BoldText>
// //             </View>
// //         )
// //     }, [])

// //     const renderAdminChats = useMemo(() => {
// //         if (!approvals) {
// //             return null
// //         }
// //         return (
// //             <FlatList
// //                 data={adminChats}
// //                 // contentContainerStyle={{ height: approvals ? "100%" : 0 }}
// //                 keyExtractor={keyExtractHandler}
// //                 renderItem={renderChatListHandler}
// //                 ListEmptyComponent={renderListFoorter}
// //             />
// //         )
// //     }, [approvals, adminChats])

// //     const renderUserChats = useMemo(() => {
// //         if (approvals) {
// //             return null
// //         }
// //         return (
// //             <FlatList
// //                 data={[...userChats, ...approvedChats]}
// //                 // style={{ flex: approvals ? -1 : 1 }}
// //                 // contentContainerStyle={{ height: approvals ? 0 : "100%" }}
// //                 keyExtractor={keyExtractHandler}
// //                 renderItem={renderChatListHandler}
// //                 ListEmptyComponent={renderListFoorter}
// //             />
// //         )
// //     }, [approvals, userChats, approvedChats])

// //     const renderHeaderHandler = useMemo(() => {
// //         return isAdmin
// //         ? (
// //             <View style={styles.newsFeedEventButtonContainer}>
// //                 <TextButton
// //                     isSelected={!approvals}
// //                     text="Chats"
// //                     onPress={setApprovals.bind(null, false)}
// //                 />
// //                 <TextButton
// //                     isSelected={approvals}
// //                     text="Approvals"
// //                     onPress={setApprovals.bind(null, true)}
// //                 />
// //             </View>
// //         )
// //         : null
// //     }, [approvals, isAdmin])

// //     useEffect(() => {
// //         loaderContext.toggleLoader(isLoading)
// //     }, [isLoading, loaderContext])

// //     const onChatFilterSubmitHandler = useCallback((selectedFilterOption) => {
// //         console.log(selectedFilterOption)
// //     }, [])

// //     const searchUsers = useCallback(async (searchVal) => {
// //         try {
// //             setSearchData([])
// //             let queryRef: any = firestore()
// //                             .collection('users')

// //             switch (chatFilterModalRef.current?.getSelectedFilterOption()) {
// //                 case 'all':
// //                     break
// //                 case 'approved':
// //                     queryRef = queryRef.where("isAccountApproved", "==", true)
// //                     break
// //                 case 'unapproved':
// //                     queryRef = queryRef.where("isAccountApproved", "==", false)
// //                     break
// //             }

// //             queryRef
// //             .orderBy('fullname', 'asc')
// //             .startAt(searchVal)
// //             .endAt(searchVal + '\uf8ff').get()
// //             .then((res: any) => {
// //                 const searchResults: any[] = []
// //                 if (res.docs?.length) {
// //                     res.docs.forEach((doc: any) => {
// //                         searchResults.push(doc.data())
// //                     })
// //                     setSearchData(searchResults)
// //                 } else {
// //                     setSearchData([])
// //                 }
// //             })
// //             .catch((err: any) => {
// //                 console.log('Error : ', err.message)
// //             })
// //         } catch (err: any) {
// //             console.log('Error : ', err.message)
// //         }
// //     }, [])

// //     // const debounceSave = useRef((nextVal: string) => debounce(searchUsers,800)).current

// //     const debouncedSave = useRef(debounce((nextValue: string) => searchUsers(nextValue), 800)).current;

// //     useEffect(() => {
// //         if (searchText) {
// //             debouncedSave(searchText.toLowerCase().trim())
// //         } else {
// //             setSearchData([])
// //         }
// //     }, [searchText])

// //     const onSearchItemPressHandler = useCallback(async (userPayload: FIRESTORE_USER) => {
// //         try {
// //             const {
// //                 uid,
// //                 firstName,
// //                 lastName
// //             } = userPayload

// //             if (!userData["Mobile App Firebase UID"]) {
// //                 ErrorToast(`Something went wrong please try again.`)
// //                 return
// //             }

// //             if (uid === userData["Mobile App Firebase UID"]) {
// //                 ErrorToast(`Can't open self account conversation.`)
// //                 return
// //             }

// //             const firebaseUid: string = userData["Mobile App Firebase UID"]
// //             console.log(firebaseUid, uid)
// //             const channelData = await createChannelIdDoesNotExist(firebaseUid, uid)
// //             if (channelData) {
// //                 const {
// //                     channelId,
// //                     createdAt,
// //                     isDeleted,
// //                     updatedAt
// //                 } = channelData

// //                 // navigation.navigate('chattingScreen', {
// //                 //     name,
// //                 //     channelId,
// //                 //     firebaseUid
// //                 // })
// //                 navigation.navigate('chattingScreen', {
// //                     showApproveBtn: false,
// //                     chatName: firstName + " " + lastName || 'User',
// //                     chatChannelId: channelId,
// //                     chatSenderId: userData['Mobile App Firebase UID']
// //                 })
// //             } else {
// //                 ErrorToast(appConstants.SOMETHING_WENT_WRONG)
// //             }
// //         } catch (err: any) {
// //             console.log('[onSearchItemPressHandler] Error : ', err.message)
// //         }
// //     }, [userData])

// //     const renderSearchDataHandler = useMemo(() => {
// //         return (
// //             <FlatList
// //                 data={searchData}
// //                 keyExtractor={keyExtractHandler}
// //                 extraData={searchData}
// //                 ListHeaderComponent={
// //                     <View style={{ marginVertical: 10 }}>
// //                         <BoldText>{"Search Results"}</BoldText>
// //                     </View>
// //                 }
// //                 contentContainerStyle={{
// //                     paddingHorizontal: 20
// //                 }}
// //                 renderItem={({item, index}) => {
// //                     const {
// //                         createdAt,
// //                         crmAccId,
// //                         fcmToken,
// //                         firstName,
// //                         fullname,
// //                         isAccountApproved,
// //                         isDeleted,
// //                         lastName,
// //                         phoneNumber,
// //                         uid,
// //                         updatedAt,
// //                         username
// //                     } = item
// //                     return (
// //                         <Pressable
// //                             onPress={onSearchItemPressHandler.bind(null, item)}
// //                             style={{
// //                                 paddingVertical: 10,
// //                                 borderBottomWidth: (searchData.length - 1) === index ? 0 : 1,
// //                                 borderBottomColor: 'black'
// //                             }}
// //                         >
// //                             <RegularText>{firstName + " " + lastName}</RegularText>
// //                         </Pressable>
// //                     )
// //                 }}
// //                 ListEmptyComponent={renderListFoorter}
// //             />
// //         )
// //     }, [searchData, onSearchItemPressHandler])

// //     return (
// //         <SafeAreaView style={styles.root}>
// //             <BottomSheetModalProvider>
// //                 <SearchBar
// //                     value={searchText}
// //                     onChangeText={setSearchText}
// //                     onFilterButtonPress={filterButtonPressHandler}
// //                 />
// //                 <ChatFilterModal
// //                     ref={chatFilterModalRef}
// //                     onSubmit={onChatFilterSubmitHandler}
// //                 />
// //                 {searchText.length ? renderSearchDataHandler : null}
// //                 {searchText.length ? null : renderHeaderHandler}
// //                 {searchText.length ? null : renderAdminChats}
// //                 {searchText.length ? null : renderUserChats}
// //             </BottomSheetModalProvider>
// //         </SafeAreaView>
// //     )
// // }

// // const styles = StyleSheet.create({
// //     root: {
// //         flex: 1,
// //         backgroundColor: colors.white
// //     },
// //     newsFeedEventButtonContainer: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         backgroundColor: colors.grey,
// //         height: 50,
// //         marginHorizontal: 10,
// //         borderRadius: 10,
// //         overflow: 'hidden'
// //     },
// // })

// // export default ChatScreen

// import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
// import { FlatList, Pressable, StyleSheet, View }  from 'react-native';
// import { SafeAreaView } from "react-native-safe-area-context";

// import useChat from "../hooks/useChat";

// import SearchBar from "../components/SearchBar";
// import TextButton from "../components/TextButton";
// import ChatTile, { ChatTileProps } from "../components/ChatTile";

// import colors from "../constants/colors";
// import images from "../assets/images";

// import debounce from 'lodash.debounce'

// import { height, keyExtractHandler } from "../utils/MiscUtils";
// import { ErrorToast, SuccessToast } from "../utils/ToastUtils";
// import BoldText from "../components/BoldText";
// import { useFocusEffect } from "@react-navigation/native";
// import { LoaderContext } from "../context/LoaderContextProvider";
// import ChatFilterModal, { ChatFilterModalRefTypes } from "../components/ChatFilterModal";
// import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
// import useBackPreventHook from "../hooks/useBackPreventHook";
// import firestore from '@react-native-firebase/firestore'
// import RegularText from "../components/RegularText";
// import { FIRESTORE_USER } from "../types";
// import { useSelector } from "react-redux";
// import { USER } from "../types/UserResponse";
// import appConstants from "../constants/appConstants";

// type ChatScreenProps = {
//     navigation: any
//     route: any
// }

// const ChatScreen = (props: ChatScreenProps) => {
//     const { navigation, route } = props
//     // console.log('route : ', route)

//     // const { userData }: { userData: USER } = useSelector((state: any) => state.auth)
//     // const isAdmin = useMemo(() => userData?.["Email 1"] === "admin@gmail.com", [userData?.["Email 1"]])

//     const loaderContext = useContext(LoaderContext)

//     // const {
//     //     isLoading,
//     //     isAdmin,
//     //     // officialChats,
//     //     adminChats,
//     //     approvedChats,
//     //     getAdminOfficialChannelsHandler,
//     //     // getAllOfficialChannelsHandler,
//     //     userChats,
//     //     getUserChatsHandler,
//     //     createChannelIdDoesNotExist,
//     //     getUsersChatsHandler
//     //     // toggleLoaderHandler
//     // } = useChat()

//     const {
//         isLoading,
//         isAdmin,
//         approvals: test,
//         chats,
//         getUserApprovalsHandler,
//         getUsersChatsHandler
//     } = useChat()

//     useEffect(() => {
//         getUsersChatsHandler()
//     }, [])

//     useEffect(() => {
//         console.log('chats : ', chats)
//     }, [chats])

//     const userData: USER = useSelector((state: any) => state?.auth?.userData)
    
//     const [searchText, setSearchText] = useState('')
//     const [searchData, setSearchData] = useState<any[]>([])
//     const [approvals, setApprovals] = useState(false)

//     const chatFilterModalRef = useRef<ChatFilterModalRefTypes>()
    
//     const getFlag = useCallback(() => chatFilterModalRef.current?.isVisible?.current, [])
    
//     const backActionHandler = useCallback(() => {
//         chatFilterModalRef.current?.hide()
//     }, [])
    
//     /**
//      * Prevent Back press on android
//      * @param getFlag: () => boolean // true to prevent back press
//      * @param backActionHandler: () => void // action code to handler on backpress when flag is true.
//      */
//     useBackPreventHook(getFlag, backActionHandler)

//     useFocusEffect(() => {
//         if (route?.params?.refresh) {
//             getAdminOfficialChannelsHandler()
//             delete route?.params?.refresh
//         }
//     })

//     const filterButtonPressHandler = useCallback(() => {
//         chatFilterModalRef.current?.show()
//     }, [])

//     const openChatHandler = useCallback((chatPayload: any, name: string) => {
//         const {
//             channelId,
//             createdAt,
//             isDeleted,
//             lastMessage,
//             lastMessageType,
//             memberIds,
//             senderId,
//             updatedAt,
//             crmAccId,
//             isAdmin
//         } = chatPayload
//         const msgSenderId = isAdmin ? channelId.split('_').filter((id: string) => id !== senderId)[0] : senderId
//         navigation.navigate('chattingScreen', {
//             showApproveBtn: approvals,
//             chatName: name || 'Messages',
//             chatChannelId: channelId,
//             chatSenderId: msgSenderId,
//             crmAccId
//         })
//     }, [navigation, approvals])

//     const favoriteChatHander = useCallback((chatPayload: any) => {
//        SuccessToast('Coming Soon')
//     }, [])

//     const renderChatListHandler = useCallback((item: any) => {
//         try {
//             const {item: chat, index}: { item: ChatTileProps, index: number } = item
//             const { id, lastMessage, name, profile, isGroup } = chat
//             return (
//                 <ChatTile
//                     id={id}
//                     lastSeen={lastMessage}
//                     name={name || 'No Name'}
//                     profile={profile || images.ic_soba_america}
//                     onOpen={openChatHandler.bind(null, chat, name)}
//                     onFavPress={isGroup ? favoriteChatHander.bind(null, chat) : null}
//                 />
//             )
//         } catch (err: any) {
//             console.log('Error : ', err.message)
//             return null
//         }
//     }, [openChatHandler, favoriteChatHander])

//     useEffect(() => {
//         getAdminOfficialChannelsHandler()
//         getUserChatsHandler()
//     }, [getAdminOfficialChannelsHandler, getUserChatsHandler])

//     const renderListFoorter = useMemo(() => {
//         if (isLoading) {
//             return null
//         }
//         return (
//             <View style={{ height: height - 100, alignItems: 'center', justifyContent: 'center' }}>
//                 <BoldText>No Data Available</BoldText>
//             </View>
//         )
//     }, [])

//     const renderAdminChats = useMemo(() => {
//         if (!approvals) {
//             return null
//         }
//         return (
//             <FlatList
//                 data={adminChats}
//                 // contentContainerStyle={{ height: approvals ? "100%" : 0 }}
//                 keyExtractor={keyExtractHandler}
//                 renderItem={renderChatListHandler}
//                 ListEmptyComponent={renderListFoorter}
//             />
//         )
//     }, [approvals, adminChats])

//     const renderUserChats = useMemo(() => {
//         if (approvals) {
//             return null
//         }
//         return (
//             <FlatList
//                 data={[...userChats, ...approvedChats]}
//                 // style={{ flex: approvals ? -1 : 1 }}
//                 // contentContainerStyle={{ height: approvals ? 0 : "100%" }}
//                 keyExtractor={keyExtractHandler}
//                 renderItem={renderChatListHandler}
//                 ListEmptyComponent={renderListFoorter}
//             />
//         )
//     }, [approvals, userChats, approvedChats])

//     const renderHeaderHandler = useMemo(() => {
//         return isAdmin
//         ? (
//             <View style={styles.newsFeedEventButtonContainer}>
//                 <TextButton
//                     isSelected={!approvals}
//                     text="Chats"
//                     onPress={setApprovals.bind(null, false)}
//                 />
//                 <TextButton
//                     isSelected={approvals}
//                     text="Approvals"
//                     onPress={setApprovals.bind(null, true)}
//                 />
//             </View>
//         )
//         : null
//     }, [approvals, isAdmin])

//     useEffect(() => {
//         loaderContext.toggleLoader(isLoading)
//     }, [isLoading, loaderContext])

//     const onChatFilterSubmitHandler = useCallback((selectedFilterOption) => {
//         console.log(selectedFilterOption)
//     }, [])

//     const searchUsers = useCallback(async (searchVal) => {
//         try {
//             setSearchData([])
//             let queryRef: any = firestore()
//                             .collection('users')

//             switch (chatFilterModalRef.current?.getSelectedFilterOption()) {
//                 case 'all':
//                     break
//                 case 'approved':
//                     queryRef = queryRef.where("isAccountApproved", "==", true)
//                     break
//                 case 'unapproved':
//                     queryRef = queryRef.where("isAccountApproved", "==", false)
//                     break
//             }

//             queryRef
//             .orderBy('fullname', 'asc')
//             .startAt(searchVal)
//             .endAt(searchVal + '\uf8ff').get()
//             .then((res: any) => {
//                 const searchResults: any[] = []
//                 if (res.docs?.length) {
//                     res.docs.forEach((doc: any) => {
//                         searchResults.push(doc.data())
//                     })
//                     setSearchData(searchResults)
//                 } else {
//                     setSearchData([])
//                 }
//             })
//             .catch((err: any) => {
//                 console.log('Error : ', err.message)
//             })
//         } catch (err: any) {
//             console.log('Error : ', err.message)
//         }
//     }, [])

//     // const debounceSave = useRef((nextVal: string) => debounce(searchUsers,800)).current

//     const debouncedSave = useRef(debounce((nextValue: string) => searchUsers(nextValue), 800)).current;

//     useEffect(() => {
//         if (searchText) {
//             debouncedSave(searchText.toLowerCase().trim())
//         } else {
//             setSearchData([])
//         }
//     }, [searchText])

//     const onSearchItemPressHandler = useCallback(async (userPayload: FIRESTORE_USER) => {
//         try {
//             const {
//                 uid,
//                 firstName,
//                 lastName
//             } = userPayload

//             if (!userData["Mobile App Firebase UID"]) {
//                 ErrorToast(`Something went wrong please try again.`)
//                 return
//             }

//             if (uid === userData["Mobile App Firebase UID"]) {
//                 ErrorToast(`Can't open self account conversation.`)
//                 return
//             }

//             const firebaseUid: string = userData["Mobile App Firebase UID"]
//             console.log(firebaseUid, uid)
//             const channelData = await createChannelIdDoesNotExist(firebaseUid, uid)
//             if (channelData) {
//                 const {
//                     channelId,
//                     createdAt,
//                     isDeleted,
//                     updatedAt
//                 } = channelData

//                 // navigation.navigate('chattingScreen', {
//                 //     name,
//                 //     channelId,
//                 //     firebaseUid
//                 // })
//                 navigation.navigate('chattingScreen', {
//                     showApproveBtn: false,
//                     chatName: firstName + " " + lastName || 'User',
//                     chatChannelId: channelId,
//                     chatSenderId: userData['Mobile App Firebase UID']
//                 })
//             } else {
//                 ErrorToast(appConstants.SOMETHING_WENT_WRONG)
//             }
//         } catch (err: any) {
//             console.log('[onSearchItemPressHandler] Error : ', err.message)
//         }
//     }, [userData])

//     const renderSearchDataHandler = useMemo(() => {
//         return (
//             <FlatList
//                 data={searchData}
//                 keyExtractor={keyExtractHandler}
//                 extraData={searchData}
//                 ListHeaderComponent={
//                     <View style={{ marginVertical: 10 }}>
//                         <BoldText>{"Search Results"}</BoldText>
//                     </View>
//                 }
//                 contentContainerStyle={{
//                     paddingHorizontal: 20
//                 }}
//                 renderItem={({item, index}) => {
//                     const {
//                         createdAt,
//                         crmAccId,
//                         fcmToken,
//                         firstName,
//                         fullname,
//                         isAccountApproved,
//                         isDeleted,
//                         lastName,
//                         phoneNumber,
//                         uid,
//                         updatedAt,
//                         username
//                     } = item
//                     return (
//                         <Pressable
//                             onPress={onSearchItemPressHandler.bind(null, item)}
//                             style={{
//                                 paddingVertical: 10,
//                                 borderBottomWidth: (searchData.length - 1) === index ? 0 : 1,
//                                 borderBottomColor: 'black'
//                             }}
//                         >
//                             <RegularText>{firstName + " " + lastName}</RegularText>
//                         </Pressable>
//                     )
//                 }}
//                 ListEmptyComponent={renderListFoorter}
//             />
//         )
//     }, [searchData, onSearchItemPressHandler])

//     return (
//         <SafeAreaView style={styles.root}>
//             <BottomSheetModalProvider>
//                 <SearchBar
//                     value={searchText}
//                     onChangeText={setSearchText}
//                     onFilterButtonPress={filterButtonPressHandler}
//                 />
//                 <ChatFilterModal
//                     ref={chatFilterModalRef}
//                     onSubmit={onChatFilterSubmitHandler}
//                 />
//                 {searchText.length ? renderSearchDataHandler : null}
//                 {searchText.length ? null : renderHeaderHandler}
//                 {searchText.length ? null : renderAdminChats}
//                 {searchText.length ? null : renderUserChats}
//             </BottomSheetModalProvider>
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     root: {
//         flex: 1,
//         backgroundColor: colors.white
//     },
//     newsFeedEventButtonContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: colors.grey,
//         height: 50,
//         marginHorizontal: 10,
//         borderRadius: 10,
//         overflow: 'hidden'
//     },
// })

// export default ChatScreen


// import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
// import { FlatList, Pressable, StyleSheet, View }  from 'react-native';
// import { SafeAreaView } from "react-native-safe-area-context";

// import useChat from "../hooks/useChat";

// import SearchBar from "../components/SearchBar";
// import TextButton from "../components/TextButton";
// import ChatTile, { ChatTileProps } from "../components/ChatTile";

// import colors from "../constants/colors";
// import images from "../assets/images";

// import debounce from 'lodash.debounce'

// import { height, keyExtractHandler } from "../utils/MiscUtils";
// import { ErrorToast, SuccessToast } from "../utils/ToastUtils";
// import BoldText from "../components/BoldText";
// import { useFocusEffect } from "@react-navigation/native";
// import { LoaderContext } from "../context/LoaderContextProvider";
// import ChatFilterModal, { ChatFilterModalRefTypes } from "../components/ChatFilterModal";
// import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
// import useBackPreventHook from "../hooks/useBackPreventHook";
// import firestore from '@react-native-firebase/firestore'
// import RegularText from "../components/RegularText";
// import { FIRESTORE_USER } from "../types";
// import { useSelector } from "react-redux";
// import { USER } from "../types/UserResponse";
// import appConstants from "../constants/appConstants";

// type ChatScreenProps = {
//     navigation: any
//     route: any
// }

// const ChatScreen = (props: ChatScreenProps) => {
//     const { navigation, route } = props
//     // console.log('route : ', route)

//     // const { userData }: { userData: USER } = useSelector((state: any) => state.auth)
//     // const isAdmin = useMemo(() => userData?.["Email 1"] === "admin@gmail.com", [userData?.["Email 1"]])

//     const loaderContext = useContext(LoaderContext)

//     const {
//         isLoading,
//         isAdmin,
//         // officialChats,
//         adminChats,
//         approvedChats,
//         getAdminOfficialChannelsHandler,
//         // getAllOfficialChannelsHandler,
//         userChats,
//         getUserChatsHandler,
//         createChannelIdDoesNotExist,
//         getUsersChatsHandler
//         // toggleLoaderHandler
//     } = useChat()

//     useEffect(() => {
//         getUsersChatsHandler()
//     }, [])

//     const userData: USER = useSelector((state: any) => state?.auth?.userData)
    
//     const [searchText, setSearchText] = useState('')
//     const [searchData, setSearchData] = useState<any[]>([])
//     const [approvals, setApprovals] = useState(false)

//     const chatFilterModalRef = useRef<ChatFilterModalRefTypes>()
    
//     const getFlag = useCallback(() => chatFilterModalRef.current?.isVisible?.current, [])
    
//     const backActionHandler = useCallback(() => {
//         chatFilterModalRef.current?.hide()
//     }, [])
    
//     /**
//      * Prevent Back press on android
//      * @param getFlag: () => boolean // true to prevent back press
//      * @param backActionHandler: () => void // action code to handler on backpress when flag is true.
//      */
//     useBackPreventHook(getFlag, backActionHandler)

//     useFocusEffect(() => {
//         if (route?.params?.refresh) {
//             getAdminOfficialChannelsHandler()
//             delete route?.params?.refresh
//         }
//     })

//     const filterButtonPressHandler = useCallback(() => {
//         chatFilterModalRef.current?.show()
//     }, [])

//     const openChatHandler = useCallback((chatPayload: any, name: string) => {
//         const {
//             channelId,
//             createdAt,
//             isDeleted,
//             lastMessage,
//             lastMessageType,
//             memberIds,
//             senderId,
//             updatedAt,
//             crmAccId,
//             isAdmin
//         } = chatPayload
//         const msgSenderId = isAdmin ? channelId.split('_').filter((id: string) => id !== senderId)[0] : senderId
//         navigation.navigate('chattingScreen', {
//             showApproveBtn: approvals,
//             chatName: name || 'Messages',
//             chatChannelId: channelId,
//             chatSenderId: msgSenderId,
//             crmAccId
//         })
//     }, [navigation, approvals])

//     const favoriteChatHander = useCallback((chatPayload: any) => {
//        SuccessToast('Coming Soon')
//     }, [])

//     const renderChatListHandler = useCallback((item: any) => {
//         try {
//             const {item: chat, index}: { item: ChatTileProps, index: number } = item
//             const { id, lastMessage, name, profile, isGroup } = chat
//             return (
//                 <ChatTile
//                     id={id}
//                     lastSeen={lastMessage}
//                     name={name || 'No Name'}
//                     profile={profile || images.ic_soba_america}
//                     onOpen={openChatHandler.bind(null, chat, name)}
//                     onFavPress={isGroup ? favoriteChatHander.bind(null, chat) : null}
//                 />
//             )
//         } catch (err: any) {
//             console.log('Error : ', err.message)
//             return null
//         }
//     }, [openChatHandler, favoriteChatHander])

//     useEffect(() => {
//         getAdminOfficialChannelsHandler()
//         getUserChatsHandler()
//     }, [getAdminOfficialChannelsHandler, getUserChatsHandler])

//     const renderListFoorter = useMemo(() => {
//         if (isLoading) {
//             return null
//         }
//         return (
//             <View style={{ height: height - 100, alignItems: 'center', justifyContent: 'center' }}>
//                 <BoldText>No Data Available</BoldText>
//             </View>
//         )
//     }, [])

//     const renderAdminChats = useMemo(() => {
//         if (!approvals) {
//             return null
//         }
//         return (
//             <FlatList
//                 data={adminChats}
//                 // contentContainerStyle={{ height: approvals ? "100%" : 0 }}
//                 keyExtractor={keyExtractHandler}
//                 renderItem={renderChatListHandler}
//                 ListEmptyComponent={renderListFoorter}
//             />
//         )
//     }, [approvals, adminChats])

//     const renderUserChats = useMemo(() => {
//         if (approvals) {
//             return null
//         }
//         return (
//             <FlatList
//                 data={[...userChats, ...approvedChats]}
//                 // style={{ flex: approvals ? -1 : 1 }}
//                 // contentContainerStyle={{ height: approvals ? 0 : "100%" }}
//                 keyExtractor={keyExtractHandler}
//                 renderItem={renderChatListHandler}
//                 ListEmptyComponent={renderListFoorter}
//             />
//         )
//     }, [approvals, userChats, approvedChats])

//     const renderHeaderHandler = useMemo(() => {
//         return isAdmin
//         ? (
//             <View style={styles.newsFeedEventButtonContainer}>
//                 <TextButton
//                     isSelected={!approvals}
//                     text="Chats"
//                     onPress={setApprovals.bind(null, false)}
//                 />
//                 <TextButton
//                     isSelected={approvals}
//                     text="Approvals"
//                     onPress={setApprovals.bind(null, true)}
//                 />
//             </View>
//         )
//         : null
//     }, [approvals, isAdmin])

//     useEffect(() => {
//         loaderContext.toggleLoader(isLoading)
//     }, [isLoading, loaderContext])

//     const onChatFilterSubmitHandler = useCallback((selectedFilterOption) => {
//         console.log(selectedFilterOption)
//     }, [])

//     const searchUsers = useCallback(async (searchVal) => {
//         try {
//             setSearchData([])
//             let queryRef: any = firestore()
//                             .collection('users')

//             switch (chatFilterModalRef.current?.getSelectedFilterOption()) {
//                 case 'all':
//                     break
//                 case 'approved':
//                     queryRef = queryRef.where("isAccountApproved", "==", true)
//                     break
//                 case 'unapproved':
//                     queryRef = queryRef.where("isAccountApproved", "==", false)
//                     break
//             }

//             queryRef
//             .orderBy('fullname', 'asc')
//             .startAt(searchVal)
//             .endAt(searchVal + '\uf8ff').get()
//             .then((res: any) => {
//                 const searchResults: any[] = []
//                 if (res.docs?.length) {
//                     res.docs.forEach((doc: any) => {
//                         searchResults.push(doc.data())
//                     })
//                     setSearchData(searchResults)
//                 } else {
//                     setSearchData([])
//                 }
//             })
//             .catch((err: any) => {
//                 console.log('Error : ', err.message)
//             })
//         } catch (err: any) {
//             console.log('Error : ', err.message)
//         }
//     }, [])

//     // const debounceSave = useRef((nextVal: string) => debounce(searchUsers,800)).current

//     const debouncedSave = useRef(debounce((nextValue: string) => searchUsers(nextValue), 800)).current;

//     useEffect(() => {
//         if (searchText) {
//             debouncedSave(searchText.toLowerCase().trim())
//         } else {
//             setSearchData([])
//         }
//     }, [searchText])

//     const onSearchItemPressHandler = useCallback(async (userPayload: FIRESTORE_USER) => {
//         try {
//             const {
//                 uid,
//                 firstName,
//                 lastName
//             } = userPayload

//             if (!userData["Mobile App Firebase UID"]) {
//                 ErrorToast(`Something went wrong please try again.`)
//                 return
//             }

//             if (uid === userData["Mobile App Firebase UID"]) {
//                 ErrorToast(`Can't open self account conversation.`)
//                 return
//             }

//             const firebaseUid: string = userData["Mobile App Firebase UID"]
//             console.log(firebaseUid, uid)
//             const channelData = await createChannelIdDoesNotExist(firebaseUid, uid)
//             if (channelData) {
//                 const {
//                     channelId,
//                     createdAt,
//                     isDeleted,
//                     updatedAt
//                 } = channelData

//                 // navigation.navigate('chattingScreen', {
//                 //     name,
//                 //     channelId,
//                 //     firebaseUid
//                 // })
//                 navigation.navigate('chattingScreen', {
//                     showApproveBtn: false,
//                     chatName: firstName + " " + lastName || 'User',
//                     chatChannelId: channelId,
//                     chatSenderId: userData['Mobile App Firebase UID']
//                 })
//             } else {
//                 ErrorToast(appConstants.SOMETHING_WENT_WRONG)
//             }
//         } catch (err: any) {
//             console.log('[onSearchItemPressHandler] Error : ', err.message)
//         }
//     }, [userData])

//     const renderSearchDataHandler = useMemo(() => {
//         return (
//             <FlatList
//                 data={searchData}
//                 keyExtractor={keyExtractHandler}
//                 extraData={searchData}
//                 ListHeaderComponent={
//                     <View style={{ marginVertical: 10 }}>
//                         <BoldText>{"Search Results"}</BoldText>
//                     </View>
//                 }
//                 contentContainerStyle={{
//                     paddingHorizontal: 20
//                 }}
//                 renderItem={({item, index}) => {
//                     const {
//                         createdAt,
//                         crmAccId,
//                         fcmToken,
//                         firstName,
//                         fullname,
//                         isAccountApproved,
//                         isDeleted,
//                         lastName,
//                         phoneNumber,
//                         uid,
//                         updatedAt,
//                         username
//                     } = item
//                     return (
//                         <Pressable
//                             onPress={onSearchItemPressHandler.bind(null, item)}
//                             style={{
//                                 paddingVertical: 10,
//                                 borderBottomWidth: (searchData.length - 1) === index ? 0 : 1,
//                                 borderBottomColor: 'black'
//                             }}
//                         >
//                             <RegularText>{firstName + " " + lastName}</RegularText>
//                         </Pressable>
//                     )
//                 }}
//                 ListEmptyComponent={renderListFoorter}
//             />
//         )
//     }, [searchData, onSearchItemPressHandler])

//     return (
//         <SafeAreaView style={styles.root}>
//             <BottomSheetModalProvider>
//                 <SearchBar
//                     value={searchText}
//                     onChangeText={setSearchText}
//                     onFilterButtonPress={filterButtonPressHandler}
//                 />
//                 <ChatFilterModal
//                     ref={chatFilterModalRef}
//                     onSubmit={onChatFilterSubmitHandler}
//                 />
//                 {searchText.length ? renderSearchDataHandler : null}
//                 {searchText.length ? null : renderHeaderHandler}
//                 {searchText.length ? null : renderAdminChats}
//                 {searchText.length ? null : renderUserChats}
//             </BottomSheetModalProvider>
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     root: {
//         flex: 1,
//         backgroundColor: colors.white
//     },
//     newsFeedEventButtonContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: colors.grey,
//         height: 50,
//         marginHorizontal: 10,
//         borderRadius: 10,
//         overflow: 'hidden'
//     },
// })

// export default ChatScreen

import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, View }  from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import useChat from "../hooks/useChat";

import SearchBar from "../components/SearchBar";
import TextButton from "../components/TextButton";
import ChatTile, { ChatTileProps } from "../components/ChatTile";

import colors from "../constants/colors";
import images from "../assets/images";

import debounce from 'lodash.debounce'

import { height, keyExtractHandler } from "../utils/MiscUtils";
import { ErrorToast, SuccessToast } from "../utils/ToastUtils";
import BoldText from "../components/BoldText";
import { useFocusEffect } from "@react-navigation/native";
import { LoaderContext } from "../context/LoaderContextProvider";
import ChatFilterModal, { ChatFilterModalRefTypes } from "../components/ChatFilterModal";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import useBackPreventHook from "../hooks/useBackPreventHook";
import firestore from '@react-native-firebase/firestore'
import RegularText from "../components/RegularText";
import { FIRESTORE_USER } from "../types";
import { useSelector } from "react-redux";
import { USER } from "../types/UserResponse";
import appConstants from "../constants/appConstants";

type ChatScreenProps = {
    navigation: any
    route: any
}

const ChatScreen = (props: ChatScreenProps) => {
    const { navigation, route } = props
    // console.log('route : ', route)

    // const { userData }: { userData: USER } = useSelector((state: any) => state.auth)
    // const isAdmin = useMemo(() => userData?.["Email 1"] === "admin@gmail.com", [userData?.["Email 1"]])

    const loaderContext = useContext(LoaderContext)

    // const {
    //     isLoading,
    //     isAdmin,
    //     // officialChats,
    //     adminChats,
    //     approvedChats,
    //     getAdminOfficialChannelsHandler,
    //     // getAllOfficialChannelsHandler,
    //     userChats,
    //     getUserChatsHandler,
    //     createChannelIdDoesNotExist,
    //     getUsersChatsHandler
    //     // toggleLoaderHandler
    // } = useChat()

    const {
        isLoading,
        isAdmin,
        approvals: test,
        chats,
        getUserApprovalsHandler,
        // getUsersChatsHandler,
        getUserChats,
        fetchMoreUserChats,
        createChannelIdDoesNotExist
    } = useChat()

    useEffect(() => {
        getUserChats()
        .then(() => {
            console.log('getUserChats done')
        })
        .catch(err => {
            console.log('getUserChats err')
        })
        // getUserApprovalsHandler()
        // .then(() => {
        //     console.log('getUserApprovalsHandlergetUserChats done')
        // })
        // .catch(err => {
        //     console.log('getUserApprovalsHandler err')
        // })
    }, [])

    const userData: USER = useSelector((state: any) => state?.auth?.userData)
    
    const [searchText, setSearchText] = useState('')
    const [searchData, setSearchData] = useState<any[]>([])
    const [approvals, setApprovals] = useState(false)

    const chatFilterModalRef = useRef<ChatFilterModalRefTypes>()
    
    const getFlag = useCallback(() => chatFilterModalRef.current?.isVisible?.current, [])
    
    const backActionHandler = useCallback(() => {
        chatFilterModalRef.current?.hide()
    }, [])
    
    /**
     * Prevent Back press on android
     * @param getFlag: () => boolean // true to prevent back press
     * @param backActionHandler: () => void // action code to handler on backpress when flag is true.
     */
    useBackPreventHook(getFlag, backActionHandler)

    useFocusEffect(
        React.useCallback(() => {
            setSearchText('')
            setSearchData([])
        }, [])
    );

    const filterButtonPressHandler = useCallback(() => {
        chatFilterModalRef.current?.show()
    }, [])

    const openChatHandler = useCallback((chatPayload: any, name: string) => {
        const {
            channelId,
            createdAt,
            isDeleted,
            lastMessage,
            lastMessageType,
            memberIds,
            senderId,
            updatedAt,
            crmAccId,
            isAdmin,
            isApproved
        } = chatPayload

        const msgSenderId = isAdmin ? channelId.split('_').filter((id: string) => id !== senderId)[0] : senderId
        navigation.navigate('chattingScreen', {
            showApproveBtn: !isApproved,
            chatName: name || 'Messages',
            chatChannelId: channelId,
            chatSenderId: msgSenderId,
            crmAccId
        })
    }, [navigation, approvals])

    const favoriteChatHander = useCallback((chatPayload: any) => {
       SuccessToast('Coming Soon')
    }, [])

    const renderChatListHandler = useCallback((item: any) => {
        try {
            const {item: chat, index}: { item: ChatTileProps, index: number } = item
            const { id, lastMessage, name, profile, isGroup } = chat
            return (
                <ChatTile
                    id={id}
                    lastSeen={lastMessage}
                    name={name || 'No Name'}
                    profile={profile || images.ic_soba_america}
                    onOpen={openChatHandler.bind(null, chat, name)}
                    onFavPress={isGroup ? favoriteChatHander.bind(null, chat) : null}
                />
            )
        } catch (err: any) {
            console.log('Error : ', err.message)
            return null
        }
    }, [openChatHandler, favoriteChatHander])

    // useEffect(() => {
    //     getAdminOfficialChannelsHandler()
    //     getUserChatsHandler()
    // }, [getAdminOfficialChannelsHandler, getUserChatsHandler])

    const renderListFoorter = useMemo(() => {
        if (isLoading) {
            return null
        }
        return (
            <View style={{ height: height - 100, alignItems: 'center', justifyContent: 'center' }}>
                <BoldText>No Data Available</BoldText>
            </View>
        )
    }, [])

    const renderAdminChats = useMemo(() => {
        if (!approvals) {
            return null
        }
        return (
            <FlatList
                data={test}
                // contentContainerStyle={{ height: approvals ? "100%" : 0 }}
                keyExtractor={keyExtractHandler}
                renderItem={renderChatListHandler}
                ListEmptyComponent={renderListFoorter}
            />
        )
    }, [approvals, test])

    const renderUserChats = useMemo(() => {
        if (approvals) {
            return null
        }
        return (
            <FlatList
                data={chats}
                // style={{ flex: approvals ? -1 : 1 }}
                // contentContainerStyle={{ height: approvals ? 0 : "100%" }}
                keyExtractor={keyExtractHandler}
                renderItem={renderChatListHandler}
                ListEmptyComponent={renderListFoorter}
                onEndReached={fetchMoreUserChats}
                onEndReachedThreshold={0.01}
            />
        )
    }, [approvals, chats, fetchMoreUserChats])

    const renderHeaderHandler = useMemo(() => {
        return isAdmin
        ? (
            <View style={styles.newsFeedEventButtonContainer}>
                <TextButton
                    isSelected={!approvals}
                    text="Chats"
                    onPress={setApprovals.bind(null, false)}
                />
                <TextButton
                    isSelected={approvals}
                    text="Approvals"
                    onPress={setApprovals.bind(null, true)}
                />
            </View>
        )
        : null
    }, [approvals, isAdmin])

    useEffect(() => {
        loaderContext.toggleLoader(isLoading)
    }, [isLoading, loaderContext])

    const onChatFilterSubmitHandler = useCallback((selectedFilterOption) => {
        console.log(selectedFilterOption)
    }, [])

    const searchUsers = useCallback(async (searchVal) => {
        try {
            setSearchData([])
            let queryRef: any = firestore()
                            .collection('users')

            switch (chatFilterModalRef.current?.getSelectedFilterOption()) {
                case 'all':
                    break
                case 'approved':
                    queryRef = queryRef.where("isAccountApproved", "==", true)
                    break
                case 'unapproved':
                    queryRef = queryRef.where("isAccountApproved", "==", false)
                    break
            }

            queryRef
            .orderBy('fullname', 'asc')
            .startAt(searchVal)
            .endAt(searchVal + '\uf8ff').get()
            .then((res: any) => {
                const searchResults: any[] = []
                if (res.docs?.length) {
                    res.docs.forEach((doc: any) => {
                        searchResults.push(doc.data())
                    })
                    setSearchData(searchResults)
                } else {
                    setSearchData([])
                }
            })
            .catch((err: any) => {
                console.log('Error : ', err.message)
            })
        } catch (err: any) {
            console.log('Error : ', err.message)
        }
    }, [])

    // const debounceSave = useRef((nextVal: string) => debounce(searchUsers,800)).current

    const debouncedSave = useRef(debounce((nextValue: string) => searchUsers(nextValue), 800)).current;

    useEffect(() => {
        if (searchText) {
            debouncedSave(searchText.toLowerCase().trim())
        } else {
            setSearchData([])
        }
    }, [searchText])

    const onSearchItemPressHandler = useCallback(async (userPayload: FIRESTORE_USER) => {
        try {
            const {
                uid,
                firstName,
                lastName
            } = userPayload

            if (!userData["Mobile App Firebase UID"]) {
                ErrorToast(`Something went wrong please try again.`)
                return
            }

            if (uid === userData["Mobile App Firebase UID"]) {
                ErrorToast(`Can't open self account conversation.`)
                return
            }

            const firebaseUid: string = userData["Mobile App Firebase UID"]
            console.log(firebaseUid, uid)
            const channelData = await createChannelIdDoesNotExist(firebaseUid, uid)
            if (channelData) {
                const {
                    channelId,
                    createdAt,
                    isDeleted,
                    updatedAt
                } = channelData

                // navigation.navigate('chattingScreen', {
                //     name,
                //     channelId,
                //     firebaseUid
                // })
                navigation.navigate('chattingScreen', {
                    showApproveBtn: false,
                    chatName: firstName + " " + lastName || 'User',
                    chatChannelId: channelId,
                    chatSenderId: userData['Mobile App Firebase UID']
                })
            } else {
                ErrorToast(appConstants.SOMETHING_WENT_WRONG)
            }
        } catch (err: any) {
            console.log('[onSearchItemPressHandler] Error : ', err.message)
        }
    }, [userData])

    const renderSearchDataHandler = useMemo(() => {
        return (
            <FlatList
                data={searchData}
                keyExtractor={keyExtractHandler}
                extraData={searchData}
                ListHeaderComponent={
                    <View style={{ marginVertical: 10 }}>
                        <BoldText>{"Search Results"}</BoldText>
                    </View>
                }
                contentContainerStyle={{
                    paddingHorizontal: 20
                }}
                renderItem={({item, index}) => {
                    const {
                        createdAt,
                        crmAccId,
                        fcmToken,
                        firstName,
                        fullname,
                        isAccountApproved,
                        isDeleted,
                        lastName,
                        phoneNumber,
                        uid,
                        updatedAt,
                        username
                    } = item
                    return (
                        <Pressable
                            onPress={onSearchItemPressHandler.bind(null, item)}
                            style={{
                                paddingVertical: 10,
                                borderBottomWidth: (searchData.length - 1) === index ? 0 : 1,
                                borderBottomColor: 'black'
                            }}
                        >
                            <RegularText>{firstName + " " + lastName}</RegularText>
                        </Pressable>
                    )
                }}
                ListEmptyComponent={renderListFoorter}
            />
        )
    }, [searchData, onSearchItemPressHandler])

    return (
        <SafeAreaView style={styles.root}>
            <BottomSheetModalProvider>
                <SearchBar
                    value={searchText}
                    onChangeText={setSearchText}
                    onFilterButtonPress={filterButtonPressHandler}
                />
                <ChatFilterModal
                    ref={chatFilterModalRef}
                    onSubmit={onChatFilterSubmitHandler}
                />
                {searchText.length ? renderSearchDataHandler : null}
                {searchText.length ? null : renderHeaderHandler}
                {searchText.length ? null : renderAdminChats}
                {searchText.length ? null : renderUserChats}
            </BottomSheetModalProvider>
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
})

export default ChatScreen
