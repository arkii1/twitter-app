import React, { useContext, useEffect, useState } from 'react'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import propTypes from 'prop-types'

import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function signInWithEmail(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        setLoading(true)
        setCurrentUser(null)
        return auth.signOut()
    }

    function googleSignIn() {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const value = {
        currentUser,
        signInWithEmail,
        signup,
        logout,
        googleSignIn,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: propTypes.node,
}
