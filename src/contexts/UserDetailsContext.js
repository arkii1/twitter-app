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
    const [loading, setLoading] = useState(true)
    const [userDetails, setUserDetails] = useState()

    const updateUserDetailsContext = useCallback(
        async (details) => {
            if (userDetails) {
                await updateUserDetails(currentUser.uid, details)
            } else await createUserDetails(currentUser.uid, details)
            const updatedDetails = await getUserDetails(currentUser.uid)
            setUserDetails(updatedDetails)
        },
        [currentUser, userDetails],
    )

    const value = useMemo(
        () => ({ userDetails, updateUserDetailsContext }),
        [userDetails, updateUserDetailsContext],
    )

    useEffect(() => {
        const init = async () => {
            if (currentUser) {
                const details = await getUserDetails(currentUser.uid)
                console.log(details)
                setUserDetails(details)
            }
            setLoading(false)
        }
        init()
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
