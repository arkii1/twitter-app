import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import {
    getUserDetails,
    getUserDetailsFromUsername,
} from '../../utility/firestore/userDetailsFirestore'
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

    const [jsx, setJsx] = useState()
    const [profileDetails, setProfileDetails] = useState()

    useEffect(() => {
        ;(async () => {
            const details = await getUserDetailsFromUsername(username)
            setProfileDetails(details)
        })()
    }, [username])

    useEffect(() => {
        if (!profileDetails) return
        ;(async () => {
            if (userList === 'following' || userList === 'followers') {
                if (userList === 'following') {
                    console.log(profileDetails)
                    const data = await Promise.all(
                        profileDetails.following.map((f) => getUserDetails(f)),
                    )
                    const newJsx = data.map((f) => (
                        <span key={f.id}>
                            <UserCard details={f} />
                        </span>
                    ))
                    setJsx(newJsx)
                } else if (userList === 'followers') {
                    const data = await Promise.all(
                        profileDetails.followers.map((f) => getUserDetails(f)),
                    )
                    const newJsx = data.map((f) => (
                        <span key={f.id}>
                            <UserCard details={f} />
                        </span>
                    ))
                    setJsx(newJsx)
                }
            }
        })()
    }, [profileDetails, userList])

    if (userList === 'following' || userList === 'followers') {
        return (
            <>
                <LinkTabs links={linkTabsData} />
                <div>{jsx}</div>
            </>
        )
    }

    return <Navigate to={`/app/${username}`} />
}

export default UserList
