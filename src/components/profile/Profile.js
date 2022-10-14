import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
    faCalendar,
    faLink,
    faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useDetails } from '../../contexts/UserDetailsContext'
import { getTweetsFromUserArray } from '../../utility/firestore/tweetFirestore'
import {
    follow,
    getUserDetailsFromUsername,
    unfollow,
} from '../../utility/firestore/userDetailsFirestore'
import Button from '../common/Button'
import FollowingFollowersLinks from '../common/FollowingFollowersLinks'
import ImageContainer from '../common/ImageContainer'
import LinkTabs from '../common/LinkTabs'
import TweetList from '../common/TweetList'
import ConfigureProfile from './ConfigureProfile'
import './styles.css'

function Profile() {
    const { userDetails } = useDetails()
    const { id } = useParams()

    const isUsersPage = id === userDetails.username

    const [configureProfile, setConfigureProfile] = useState(!userDetails)
    const [details, setDetails] = useState(userDetails)
    const [loading, setLoading] = useState(true)
    const [following, setFollowing] = useState(false)
    const [tweetData, setTweetData] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [tweetLength, setTweetLength] = useState(10)

    useEffect(() => {
        const handleDetails = async () => {
            if (!isUsersPage) {
                const newDetails = await getUserDetailsFromUsername(id)
                setDetails(newDetails)
                const data = await getTweetsFromUserArray(
                    [newDetails.id],
                    0,
                    tweetLength,
                )
                setTweetData(data)
                const fol = userDetails.following.indexOf(newDetails.id) !== -1
                setFollowing(fol)
            } else {
                setDetails(userDetails)
                const data = await getTweetsFromUserArray(
                    [userDetails.id],
                    0,
                    tweetLength,
                )
                console.log(data)
                setTweetData(data)
            }
            setLoading(false)
        }
        if (!configureProfile) handleDetails()
    }, [configureProfile, id, userDetails, isUsersPage, tweetLength])

    const handleFollow = async () => {
        await follow(userDetails.id, details.id)
        setFollowing(true)
    }

    const handleUnfollow = async () => {
        unfollow(userDetails.id, details.id)
        setFollowing(false)
    }

    const linkTabsData = [
        {
            link: `/app/${id}/tweets/tweets`,
            text: 'Tweets',
        },
        {
            link: `/app/${id}/tweets/tweets&replies`,
            text: 'Tweets & replies',
        },
        {
            link: `/app/${id}/tweets/media`,
            text: 'Media',
        },
        {
            link: `/app/${id}/tweets/likes`,
            text: 'Likes',
        },
    ]

    return (
        !loading && (
            <>
                {configureProfile && isUsersPage && (
                    <ConfigureProfile exit={() => setConfigureProfile(false)} />
                )}
                <div className="w-100">
                    <ImageContainer src={details.bgURL} alt="" type="bg" />
                    <span
                        className="d-flex justify-content-between align-items-start w-100 p-2 pb-0"
                        style={{ maxHeight: '5rem' }}
                    >
                        <span style={{ transform: 'translateY(-55%)' }}>
                            <ImageContainer
                                src={details.avatarURL}
                                alt=""
                                type="avatar"
                            />
                        </span>
                        <span>
                            {isUsersPage && (
                                <Button
                                    text="Edit profile"
                                    onClick={() => setConfigureProfile(true)}
                                />
                            )}
                            {!isUsersPage &&
                                (following ? (
                                    <Button
                                        text="Unfollow"
                                        onClick={handleUnfollow}
                                    />
                                ) : (
                                    <Button
                                        text="Follow"
                                        colours="dark"
                                        onClick={handleFollow}
                                    />
                                ))}
                        </span>
                    </span>
                    <span className="d-flex flex-column gap-3 w-50 px-2 pb-2">
                        <span className="d-flex flex-column gap-1">
                            <h3 className="profile__h3">{details.name}</h3>
                            <h4 className="small">@{details.username}</h4>
                        </span>
                        {details.bio !== '' && (
                            <p className="profile__p">{details.bio}</p>
                        )}
                        <span className="d-flex gap-4 justify-content-start align-items-center small">
                            {details.location !== '' && (
                                <span>
                                    <FontAwesomeIcon icon={faLocationDot} />{' '}
                                    {details.location}
                                </span>
                            )}
                            {details.website !== '' && (
                                <span>
                                    <Link
                                        className="react-link small"
                                        to={details.website}
                                    >
                                        <FontAwesomeIcon icon={faLink} />{' '}
                                        {details.website}
                                    </Link>
                                </span>
                            )}
                            <span>
                                <FontAwesomeIcon icon={faCalendar} /> Joined{' '}
                                {details.createdAt.month}{' '}
                                {details.createdAt.year}
                            </span>
                        </span>
                        <FollowingFollowersLinks details={details} />
                    </span>
                    <LinkTabs links={linkTabsData} />
                    {tweetData.length > 0 && <TweetList tweetArr={tweetData} />}
                </div>
            </>
        )
    )
}

export default Profile
