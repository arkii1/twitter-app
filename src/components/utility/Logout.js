import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'

function Logout() {
    const { logout } = useAuth()

    useEffect(() => {
        logout()
    }, [])

    return (
        <>
            <h1>Logged out. Sign in:</h1>{' '}
            <Link to="/modal/sign-in">
                <button type="button">Sign in</button>
            </Link>
        </>
    )
}

export default Logout
