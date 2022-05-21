import { useCallback, useEffect, useRef, useState } from 'react'

type useChapterExecutivesTypes = {
    fetchOnMount: boolean
}

const useChapterExecutives = (props: useChapterExecutivesTypes) => {
    const { fetchOnMount } = props

    // States
    const [isLoading, setLoading] = useState(false)
    const [endReached, setEndReached] = useState(false)

    // Refs
    const pageRef = useRef(null)

    const getExecutivesHandler = useCallback(() => {
        try {

        } catch (err: any) {
            console.log('[getExecutivesHandler] Error : ', err.message)
        }
    }, [])

    const fetchMoreExecutivesHandler = useCallback(() => {
        try {

        } catch (err: any) {
            console.log('[fetchMoreExecutivesHandler] Error : ', err.message)
        }
    }, [])

    useEffect(() => {
        if (fetchOnMount) {
            console.log('to be fetch')        
        }
    }, [fetchOnMount])

    return {
        isLoading,
        endReached,
        getExecutivesHandler,
        fetchMoreExecutivesHandler
    }
}