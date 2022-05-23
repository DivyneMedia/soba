import { useRef, useCallback, useState, useEffect, useMemo } from 'react'
import firestore from '@react-native-firebase/firestore'
import appConstants from '../constants/appConstants'

export type ExecutiveItemType = {
    chapterId: string,
    email: string,
    id: string,
    name: string,
    phoneNo: string,
    role: string
}

type useExecutivesReturnType = {
    isLoading: boolean
    endReached: boolean
    executives: ExecutiveItemType[]
    getExecutives(): void
    fetchMore(): void 
    toggleLoaderVisibility(visibility: boolean): void 
}

type useExecutivesType = {
    fetchOnMount: boolean
}

const useExecutives = (props?: useExecutivesType): useExecutivesReturnType => {
    const fetchOnMount = useMemo(() => props?.fetchOnMount, [props?.fetchOnMount])

    // ** State
    const [isLoading, setLoading] = useState(false)
    const [endReached, setEndReached] = useState(true)
    const [executives, setExecutives] = useState<ExecutiveItemType[]>([])

    // ** Refs
    const mountedRef = useRef(false)
    const lastRecordRef = useRef<any>(null)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    const toggleLoaderVisibility = useCallback((visibility) => {
        if (mountedRef.current) {
            setLoading(visibility)
        }
    }, [])

    const getExecutives = useCallback(async () => {
        try {
            const getExecutivesRes = await firestore()
                .collectionGroup(appConstants.executives)
                .limit(15)
                .get()

            const executiveData: ExecutiveItemType[] = getExecutivesRes.docs.map((doc: any) => doc.data())
            lastRecordRef.current = getExecutivesRes.docs[getExecutivesRes.docs.length - 1]
            setExecutives(executiveData)

            if (executiveData.length < 15) {
                setEndReached(true)
            } else {
                setEndReached(false)
            }

        } catch (err: any) {
            console.log('Error : ', err.message)
        }
    }, [])

    const fetchMore = useCallback(async () => {
        try {
            if (endReached || !lastRecordRef.current) {
                return
            }

            const getExecutivesRes = await firestore()
                .collectionGroup(appConstants.executives)
                .startAfter(lastRecordRef.current)
                .limit(15)
                .get()

            const dataRes = getExecutivesRes.docs.map(doc => doc.data())
            setExecutives((prevState: any) => [...prevState, ...dataRes])

            lastRecordRef.current = getExecutivesRes.docs[getExecutivesRes.docs.length - 1]

            if (dataRes.length < 15) {
                setEndReached(true)
            } else {
                setEndReached(false)
            }
        } catch (err: any) {
            console.log('Error : ', err.message)
        }
    }, [])

    useEffect(() => {
        if (fetchOnMount) {
            getExecutives()
        }
    }, [fetchOnMount, getExecutives])

    return {
        isLoading,
        endReached,
        executives,
        getExecutives,
        fetchMore,
        toggleLoaderVisibility,
    }
}

export default useExecutives
