import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

import propTypes from 'prop-types'

import {
    createOrUpdateUserDetails,
    getUserDetailsFromID,
} from '../utility/firestore/userDetailsFirestore'
import { useAuth } from './AuthContext'

const UserDetailsContext = React.createContext()

export function useDetails() {
    return useContext(UserDetailsContext)
}

export function UserDetailsProvider({ children }) {
    const { currentUser } = useAuth()

    const [userDetails, setUserDetails] = useState()
    const [loading, setLoading] = useState(true)

    const updateUserDetails = useCallback(
        async (details) => {
            await createOrUpdateUserDetails(currentUser.email, details)
            const updatedDetails = await getUserDetailsFromID(currentUser.uid)
            setUserDetails(updatedDetails)
        },
        [currentUser],
    )

    const value = useMemo(
        () => ({ userDetails, updateUserDetails }),
        [userDetails, updateUserDetails],
    )

    useEffect(() => {
        const initCurDetails = async () => {
            if (currentUser) {
                setLoading(true)
                const details = await getUserDetailsFromID(currentUser.uid)
                if (details) setUserDetails(details)
                setLoading(false)
            }
        }

        initCurDetails()
    }, [currentUser])

    return (
        <UserDetailsContext.Provider value={value}>
            {!loading && children}
        </UserDetailsContext.Provider>
    )
}

UserDetailsProvider.propTypes = {
    children: propTypes.node,
}
