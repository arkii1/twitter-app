import React from 'react'
import { Link } from 'react-router-dom'

import { faHome } from '@fortawesome/free-solid-svg-icons'

import twitterLogo from '../../assets/twitter-anim.gif'
import { useDetails } from '../../contexts/UserDetailsContext'
import Button from '../common/Button'
import './styles.css'

function Navbar() {
    const { userDetails } = useDetails()

    return (
        <nav className="navbar w-100 h-100 d-flex flex-column justify-content-start align-items-start">
            <Link to="/app/home">
                <Button logo={twitterLogo} />
            </Link>
            <Link to={!userDetails ? '/' : `/app/${userDetails.username}`}>
                <Button faLogo={faHome} text="Profile" />
            </Link>
        </nav>
    )
}

export default Navbar
