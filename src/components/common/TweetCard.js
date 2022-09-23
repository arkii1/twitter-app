import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import {
    faArrowUpFromBracket,
    faComment,
    faEllipsis,
    faHeart,
    faRetweet,
} from '@fortawesome/free-solid-svg-icons'
import propTypes from 'prop-types'

import { useDetails } from '../../contexts/UserDetailsContext'
import {
    getUserDetailsFromID,
    likeTweet,
    likesTweet,
    unlikeTweet,
} from '../../utility/firestoreUtils'
import ProfileModal from '../profile/ProfileModal'
import Button from './Button'
import ImageContainer from './ImageContainer'
import './styles.css'

function TweetCard({ tweet }) {
    const [tweetDetails, setTweetDetails] = useState(tweet)
    const { userDetails } = useDetails()
    const [tweetUserDetails, setTweetUserDetails] = useState(null)
    const [profileModal, setProfileModal] = useState(false)
    const [modalPos, setModalPos] = useState([0, 0])
    const imageRef = useRef()
    const nameRef = useRef()
    const [liked, setLiked] = useState(null)

    const handleModalOn = (ref) => {
        setProfileModal(true)
        const { x, y } = ref.current.getBoundingClientRect()
        setModalPos([x, y])
    }

    const handleModalOff = () => {
        setProfileModal(false)
    }

    useEffect(() => {
        const handleDetails = async () => {
            const details = await getUserDetailsFromID(tweet.userID)
            setTweetUserDetails(details)
            const like = await likesTweet(userDetails.userID, tweet.id)
            setLiked(like)
            if (imageRef.current) {
                const { x, y } = imageRef.current.getBoundingClientRect()
                setModalPos([x, y])
            }
        }
        handleDetails()
    }, [tweet, tweetUserDetails, liked, userDetails])

    const handleLikeTweet = async () => {
        const like = !liked
        if (like) {
            likeTweet(userDetails.userID, tweet.id)
            const newTweetDetails = tweetDetails
            newTweetDetails.likes.push(userDetails.userID)
            setTweetDetails(newTweetDetails)
        } else {
            unlikeTweet(userDetails.id, tweet.id)
            const newTweetDetails = tweetDetails
            const index = newTweetDetails.likes.indexOf(userDetails.userID)
            newTweetDetails.likes.splice(index, 1)
            setTweetDetails(newTweetDetails)
        }
        setLiked(like)
    }

    return (
        tweetUserDetails !== null && (
            <>
                {profileModal && (
                    <span
                        onMouseLeave={handleModalOff}
                        onMouseEnter={() => handleModalOn(imageRef)}
                    >
                        <ProfileModal
                            details={tweetUserDetails}
                            pos={modalPos}
                        />
                    </span>
                )}
                <div
                    className="tweet-card d-flex justify-content-start align-items-start w-100 gap-2 p-2"
                    onMouseLeave={handleModalOff}
                >
                    <Link
                        to={`/app/${tweetUserDetails.username}`}
                        className="react-link--none"
                        onMouseEnter={() => handleModalOn(imageRef)}
                        ref={imageRef}
                    >
                        <ImageContainer
                            src={tweetUserDetails.avatarURL}
                            alt=""
                            type="avatar--small"
                            hover
                        />
                    </Link>
                    <div className="d-flex flex-column justify-content-start align-items-start w-100 gap-1">
                        <div className="d-flex w-100 justify-content-between align-items-center">
                            <Link
                                className="react-link--none d-flex gap-1 align-items-end justify-content-start"
                                to={`/app/${tweetUserDetails.username}`}
                                ref={nameRef}
                                onMouseEnter={() => handleModalOn(nameRef)}
                            >
                                <span className="name underline-on-hover">
                                    {tweetUserDetails.name}
                                </span>
                                <span className="username">
                                    @{tweetUserDetails.username}
                                </span>
                            </Link>
                            <span className="tweet-card__ellipsis">
                                <Button
                                    faLogo={faEllipsis}
                                    colours="inherit"
                                    size="0.75rem"
                                />
                            </span>
                        </div>
                        <span className="text mb-1">{tweet.text}</span>
                        <div className="d-flex justify-content-between w-75">
                            <span className="tweet-card__comment d-flex justify-content-start align-items-center gap-1">
                                <Button
                                    faLogo={faComment}
                                    size="1.1rem"
                                    padding="2"
                                    colours="inherit"
                                />
                                <span
                                    style={{
                                        color: 'inherit',
                                        backgroundColor: 'transparent',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    {tweet.repliesArr.length}
                                </span>
                            </span>
                            <span className="tweet-card__retweet d-flex justify-content-start align-items-center gap-1">
                                <Button
                                    faLogo={faRetweet}
                                    size="1.1rem"
                                    padding="2"
                                    colours="inherit"
                                />
                                <span
                                    style={{
                                        color: 'inherit',
                                        backgroundColor: 'transparent',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    {tweet.retweets.length}{' '}
                                </span>
                            </span>
                            <span className="tweet-card__like d-flex justify-content-start align-items-center gap-1">
                                <Button
                                    faLogo={faHeart}
                                    size="1.1rem"
                                    padding="2"
                                    colours="inherit"
                                    onClick={handleLikeTweet}
                                />
                                <span
                                    style={{
                                        color: 'inherit',
                                        backgroundColor: 'transparent',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    {tweet.likes.length}
                                </span>
                            </span>
                            <span className="tweet-card__share">
                                <Button
                                    faLogo={faArrowUpFromBracket}
                                    size="1.1rem"
                                    padding="2"
                                    colours="inherit"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </>
        )
    )
}

export default TweetCard

TweetCard.propTypes = {
    tweet: propTypes.object.isRequired,
}