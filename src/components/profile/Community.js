import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import {
    getUserDetails,
    getUserDetailsFromUsername,
} from '../../utility/firestore/userDetailsFirestore'
import LinkTabs from '../common/LinkTabs'
import UserList from '../common/UserList'
import './styles.css'

function Community() {
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

    const [userArray, setUserArray] = useState()
    const [profileDetails, setProfileDetails] = useState()

    ;(async () => {
        const details = await getUserDetailsFromUsername(username)
        setProfileDetails(details)
    })()

    useEffect(() => {
        if (!profileDetails) return
        ;(async () => {
            if (userList === 'following') {
                const data = await Promise.all(
                    profileDetails.following.map((f) => getUserDetails(f)),
                )
                setUserArray(data)
            } else if (userList === 'followers') {
                const data = await Promise.all(
                    profileDetails.followers.map((f) => getUserDetails(f)),
                )
                setUserArray(data)
            }
        })()
    }, [profileDetails, userList])

    if (userList === 'following' || userList === 'followers') {
        return (
            <>
                <LinkTabs links={linkTabsData} />
                <UserList users={userArray} />
            </>
        )
    }

    return <Navigate to={`/app/${username}`} />
}

export default Community
