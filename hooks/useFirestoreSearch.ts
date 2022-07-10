import { useCallback, useEffect, useRef, useState } from "react"
import firestore from '@react-native-firebase/firestore'
import { FIRESTORE_USER, POSSIBLE_FIRESTORE_USER_SEARCH } from "../types"
import appConstants from "../constants/appConstants"

type RETURN_TYPE = [any, FIRESTORE_USER[]]

const searchUsers = async (
    searchVal: string,
    filterOption: POSSIBLE_FIRESTORE_USER_SEARCH,
    lastDocRef: any = null
) => {
    return new Promise<RETURN_TYPE>(async (resolve, _reject) => {
        try {
            let queryRef: any = firestore()
                            .collection('users')

            switch (filterOption) {
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
            .endAt(searchVal + '\uf8ff')
            .limit(appConstants.FIRESTORE_USERS_SEARCH_LIMIT)
            .startAfter(lastDocRef)
            .get()
            .then((res: any) => {
                if (res.docs.length) {
                    const searchResults: FIRESTORE_USER[] = []
                    res.docs.forEach((doc: any) => {
                        searchResults.push(doc.data())
                    })
                    resolve([res.docs[res.docs.length - 1], searchResults])
                } else {
                    resolve([null, []])
                }
            })
            .catch((err: any) => {
                console.log('queryRef - Error : ', err.message)
                throw new Error(err.message)
            })
        } catch (err: any) {
            console.log('[searchUsers] Error : ', err.message)
            resolve([null, []])
        }
    })
}

const useFirestoreSearch = () => {
    // ** States
    const [loading, setLoading] = useState(false)
    const [endReached, setEndReached] = useState(true)
    const [users, setUsers] = useState<FIRESTORE_USER[]>([])

    // ** Refs
    const lastDocRef = useRef(null)

    const getUsers = useCallback(async (searchVal: string, filterOption: POSSIBLE_FIRESTORE_USER_SEARCH) => {
        try {
            setLoading(true)
            setUsers([])
            const [lastDoc, usersRes] = await searchUsers(searchVal, filterOption)
            lastDocRef.current = lastDoc
            if (usersRes.length < appConstants.FIRESTORE_USERS_SEARCH_LIMIT) {
                setEndReached(true)
            } else {
                setEndReached(false)
            }
            setUsers(usersRes)
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            setEndReached(true)
            console.log('[getUsers] Error : ', err.message)
        }
    }, [])

    const fetchMore = useCallback(async (searchVal: string, filterOption: POSSIBLE_FIRESTORE_USER_SEARCH) => {
        try {
            setLoading(true)
            const [lastDoc, usersRes] = await searchUsers(searchVal, filterOption, lastDocRef.current)
            if (usersRes.length < appConstants.FIRESTORE_USERS_SEARCH_LIMIT) {
                setEndReached(true)
            } else {
                setEndReached(false)
            }
            lastDocRef.current = lastDoc
            setUsers((prevState: FIRESTORE_USER[]) => [...prevState, ...usersRes])
            setLoading(false)
        } catch (err: any) {
            setEndReached(true)
            setLoading(false)
            console.log('[fetchMore] Error : ', err.message)
        }
    }, [])

    return {
        loading,
        users,
        endReached,
        getUsers,
        fetchMore
    }
}

export default useFirestoreSearch
