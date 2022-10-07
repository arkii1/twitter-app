import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

import propTypes from 'prop-types'

import {
    createUserDetails,
    getUserDetails,
    updateUserDetails,
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

    const updateUserDetailsContext = useCallback(
        async (details) => {
            setLoading(true)
            if (userDetails) {
                await updateUserDetails(currentUser.uid, details)
            } else await createUserDetails(currentUser.uid, details)
            const updatedDetails = await getUserDetails(currentUser.uid)
            setUserDetails(updatedDetails)
            setLoading(false)
        },
        [currentUser, userDetails],
    )

    useEffect(() => {
        const initDetails = async () => {
            setLoading(true)
            const details = await getUserDetails(currentUser.uid)
            setUserDetails(details)
            setLoading(false)
        }
        if (currentUser) initDetails()
    }, [currentUser])

    const value = useMemo(
        () => ({ userDetails, updateUserDetailsContext }),
        [userDetails, updateUserDetailsContext],
    )
    return (
        currentUser && (
            <UserDetailsContext.Provider value={value}>
                {!loading && children}
            </UserDetailsContext.Provider>
        )
    )
}

UserDetailsProvider.propTypes = {
    children: propTypes.node,
}
