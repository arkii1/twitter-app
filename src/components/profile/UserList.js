import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import {
    getUserDetailsFromIDArray,
    getUserDetailsFromUsername,
} from '../../utility/firestore/userDetailsFirestore'
import LinkTabs from '../common/LinkTabs'
import UserCard from './UserCard'
import './styles.css'

function UserList() {
    const { id: username, userList } = useParams()
    const [loading, setLoading] = useState(true)

    const [followingJSX, setFollowingJSX] = useState()
    const [followersJSX, setFollowersJSX] = useState()

    useEffect(() => {
        const init = async () => {
            const details = await getUserDetailsFromUsername(username)
            const followingData = await getUserDetailsFromIDArray(
                details.following,
            )
            const followersData = await getUserDetailsFromIDArray(
                details.followers,
            )
            const newFollowingJSX = followingData.map((f) => (
                <UserCard details={f} />
            ))
            const newFollowersJSX = followersData.map((f) => (
                <UserCard details={f} />
            ))
            setFollowingJSX(newFollowingJSX)
            setFollowersJSX(newFollowersJSX)
            setLoading(false)
        }
        init()
    }, [username])

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
