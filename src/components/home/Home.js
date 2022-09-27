import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'
import { useDetails } from '../../contexts/UserDetailsContext'
import { getTweetsFromUserArray } from '../../utility/firestore/tweetFirestore'
import TweetList from '../common/TweetList'
import ConfigureProfile from '../profile/ConfigureProfile'
import CreateTweet from './CreateTweet'
import './styles.css'

function Home() {
    const { logout } = useAuth()
    const { userDetails } = useDetails()
    const [configureProfile, setConfigureProfile] = useState(false)
    const [tweets, setTweets] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [tweetsLength, setTweetsLength] = useState(10)

    useEffect(() => {
        const config = !userDetails
        setConfigureProfile(config)
        ;(async () => {
            if (!config) {
                const arr = [...userDetails.following, userDetails.id]
                const t = await getTweetsFromUserArray(arr, 0, tweetsLength)
                setTweets(t)
            }
        })()
    }, [userDetails, tweetsLength, configureProfile])

    return (
        <>
            <Link to="/modal/sign-in">
                <button type="button" onClick={logout}>
                    Log Out
                </button>
            </Link>
            <button type="button" onClick={() => setConfigureProfile(true)}>
                Configure Profile
            </button>
            <Link to={!userDetails ? '/' : `/app/${userDetails.username}`}>
                <button type="button">My Profile </button>
            </Link>
            {configureProfile && (
                <ConfigureProfile exit={() => setConfigureProfile(false)} />
            )}{' '}
            {userDetails && (
                <div className="Account">
                    {' '}
                    <CreateTweet />
                    {tweets.length > 0 && <TweetList tweetArr={tweets} />}
                </div>
            )}
        </>
    )
}

export default Home
