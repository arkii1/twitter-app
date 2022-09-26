import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import propTypes from 'prop-types'
import uniqid from 'uniqid'

import { useDetails } from '../../contexts/UserDetailsContext'
import { follow, unfollow } from '../../utility/firestore/userDetailsFirestore'
import Button from '../common/Button'
import ImageContainer from '../common/ImageContainer'
import ProfileModal from './ProfileModal'
import './styles.css'

// Note details is a promise
function UserCard({ details }) {
    const { userDetails } = useDetails()

    const imageRef = useRef()
    const nameRef = useRef()

    const [profileDetails, setProfileDetails] = useState(null)
    const [following, setFollowing] = useState(null)
    const [profileModal, setProfileModal] = useState(false)
    const [modalPos, setModalPos] = useState([0, 0])

    const handleFollow = async () => {
        await follow(userDetails.id, profileDetails.id)
        setFollowing(true)
    }

    const handleUnfollow = async () => {
        await unfollow(userDetails.id, profileDetails.id)
        setFollowing(false)
    }

    const handleModalOn = (ref) => {
        setProfileModal(true)
        const { x, y } = ref.current.getBoundingClientRect()
        setModalPos([x, y])
    }

    const handleModalOff = () => {
        setProfileModal(false)
    }

    useEffect(() => {
        const init = async () => {
            const newDetails = await details
            setProfileDetails(newDetails)
            const newFollowing =
                userDetails.following.indexOf(newDetails.id) !== -1
            setFollowing(newFollowing)
        }
        init()
    }, [details, userDetails, profileDetails])

    return (
        profileDetails &&
        profileDetails.id !== userDetails.id &&
        following !== null && (
            <>
                {profileModal && (
                    <span
                        onMouseLeave={handleModalOff}
                        onMouseEnter={() => handleModalOn(imageRef)}
                    >
                        <ProfileModal details={profileDetails} pos={modalPos} />
                    </span>
                )}
                <li
                    className="user-card d-flex justify-content-between align-items-start w-100 px-2 py-3"
                    key={uniqid()}
                    onMouseLeave={handleModalOff}
                >
                    <div className="d-flex justify-content-start align-items-start gap-2">
                        <Link
                            to={`/app/${profileDetails.username}`}
                            className="react-link--none"
                            ref={imageRef}
                            onMouseEnter={() => handleModalOn(imageRef)}
                        >
                            <ImageContainer
                                src={profileDetails.avatarURL}
                                alt=""
                                type="avatar--small"
                            />
                        </Link>
                        <span className="d-flex flex-column justify-content-start align-items-start gap-2">
                            <Link
                                to={`/app/${profileDetails.username}`}
                                className="react-link--none d-flex flex-column gap-1"
                                ref={nameRef}
                                onMouseEnter={() => handleModalOn(nameRef)}
                            >
                                <h3
                                    className="user-card__h3"
                                    style={{ color: 'black' }}
                                >
                                    {profileDetails.name}
                                </h3>
                                <p className="user-card__username">
                                    @{profileDetails.username}
                                </p>
                            </Link>
                            <p>{profileDetails.bio}</p>
                        </span>
                    </div>
                    <span style={{ width: '6rem' }}>
                        <Button
                            text={following ? 'Unfollow' : 'Follow'}
                            colours={following ? 'light' : 'dark'}
                            onClick={following ? handleUnfollow : handleFollow}
                        />
                    </span>
                </li>
            </>
        )
    )
}

export default UserCard

UserCard.propTypes = {
    details: propTypes.object,
}
