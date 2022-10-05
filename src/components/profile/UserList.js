import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { getTweetsFromUserArray } from '../../utility/firestore/tweetFirestore'
import { getUserDetailsFromUsername } from '../../utility/firestore/userDetailsFirestore'
import LinkTabs from '../common/LinkTabs'
import UserCard from './UserCard'
import './styles.css'

function UserList() {
    const { id: username, userList } = useParams()

    const linkTabsData = [
        {
            link: `/app/${username}/community/following`,
            text: 'Following',
        },
        {
            link: `/app/${username}/community/followers`,
            text: 'Followers',
        },
    ]

    const [loading, setLoading] = useState(true)
    const [followingJSX, setFollowingJSX] = useState()
    const [followersJSX, setFollowersJSX] = useState()

    ;(async () => {
        const details = await getUserDetailsFromUsername(username)
        console.log(details)
        const followingData = await getTweetsFromUserArray(details.following)
        const followersData = await getTweetsFromUserArray(details.followers)
        const newFollowingJSX = followingData.map((f) => (
            <UserCard details={f} />
        ))
        const newFollowersJSX = followersData.map((f) => (
            <UserCard details={f} />
        ))
        setFollowingJSX(newFollowingJSX)
        setFollowersJSX(newFollowersJSX)
        setLoading(false)
    })()

    if (userList === 'following' || userList === 'followers') {
        return (
            <>
                <LinkTabs links={linkTabsData} />
                <div>
                    {!loading && userList === 'following'
                        ? followingJSX
                        : followersJSX}
                </div>
            </>
        )
    }

    return <Navigate to={`/app/${username}`} />
}

export default UserList
