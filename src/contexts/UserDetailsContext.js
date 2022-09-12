import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react"
import propTypes from "prop-types"
import {
  getUserDetailsFromAuthID,
  createOrUpdateUserDetails,
} from "../utility/firestoreUtils"
import { useAuth } from "./AuthContext"

const UserDetailsContext = React.createContext()

export function useDetails() {
  return useContext(UserDetailsContext)
}

export function UserDetailsProvider({ children }) {
  const [userDetails, setUserDetails] = useState()
  const [loading, setLoading] = useState(true)
  const { currentUser } = useAuth()

  const updateUserDetails = useCallback(
    async (details) => {
      await createOrUpdateUserDetails(currentUser.email, details)
      const updatedDetails = await getUserDetailsFromAuthID(currentUser.uid)
      setUserDetails(updatedDetails)
    },
    [currentUser]
  )

  const value = useMemo(
    () => ({ userDetails, updateUserDetails }),
    [userDetails, updateUserDetails]
  )

  useEffect(() => {
    const initCurDetails = async () => {
      if (currentUser) {
        setLoading(true)
        const details = await getUserDetailsFromAuthID(currentUser.uid)
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
