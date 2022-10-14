import React from 'react'
import { Link } from 'react-router-dom'

import propTypes from 'prop-types'

import './styles.css'

function FollowingFollowersLinks({ details }) {
    return (
        <span className="d-flex gap-3 justify-content-start align-items-center small">
            <Link
                className="react-link"
                to={`/app/${details.username}/community/following`}
            >
                <span className="small">
                    <span className="small--bold" style={{ color: 'black' }}>
                        {details.following.length}
                    </span>{' '}
                    Following
                </span>
            </Link>
            <Link
                className="react-link"
                to={`/app/${details.username}/community/followers`}
            >
                <span className="small">
                    <span className="small--bold" style={{ color: 'black' }}>
                        {details.followers.length}
                    </span>{' '}
                    Followers
                </span>
            </Link>
        </span>
    )
}

export default FollowingFollowersLinks

FollowingFollowersLinks.propTypes = {
    details: propTypes.object.isRequired,
}
