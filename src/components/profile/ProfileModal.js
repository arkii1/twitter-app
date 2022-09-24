import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import propTypes from 'prop-types'

import { useDetails } from '../../contexts/UserDetailsContext'
import { follow, isFollowing, unfollow } from '../../utility/firestore/firestoreUtils'
import Button from '../common/Button'
import ImageContainer from '../common/ImageContainer'
import FollowingFollowersLinks from './FollowingFollowersLinks'
import './styles.css'

function ProfileModal({ details, pos }) {
    const { userDetails } = useDetails()
    const [following, setFollowing] = useState(null)
    const style = {
        position: 'absolute',
        left: `calc(${pos[0]}px)`,
        top: `calc(${pos[1]}px + 3rem)`,
    }

    const handleFollow = async () => {
        await follow(userDetails.userID, details.userID)
        setFollowing(true)
    }

    const handleUnfollow = async () => {
        await unfollow(userDetails.userID)
    }

    const init = async () => {
        const newFol = await isFollowing(userDetails.userID, details.userID)
        setFollowing(newFol)
    }
    init()

    return (
        following !== null && (
            <div
                className="profile-modal rounded d-flex justify-content-between gap-2 shadow p-2"
                style={style}
            >
                <span className="d-flex flex-column justfy-content-start align-items-start gap-2">
                    <Link
                        to={`/app/${details.username}`}
                        className="react-link--none d-flex flex-column justify-content-start align-items-start gap-3"
                    >
                        <ImageContainer
                            src={details.avatarURL}
                            alt=""
                            type="avatar--small"
                        />
                        <span className="d-flex flex-column justify-content-start align-items-start gap-1">
                            <h4 className="profile-modal__h4">
                                {details.name}
                            </h4>
                            <small className="small">@{details.username}</small>
                        </span>
                    </Link>
                    <p>{details.bio}</p>
                    <FollowingFollowersLinks details={details} />
                </span>

                <span style={{ width: '6rem' }}>
                    <Button
                        text={following ? 'Unfollow' : 'Follow'}
                        colours={following ? 'light' : 'dark'}
                        onClick={following ? handleUnfollow : handleFollow}
                    />
                </span>
            </div>
        )
    )
}

export default ProfileModal

ProfileModal.propTypes = {
    details: propTypes.object.isRequired,
    pos: propTypes.arrayOf(propTypes.string).isRequired,
}
