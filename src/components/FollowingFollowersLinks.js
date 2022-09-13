import React from "react"
import propTypes from "prop-types"
import { Link } from "react-router-dom"

function FollowingFollowersLinks({ details }) {
  return (
    <span className="d-flex gap-3 justify-content-start align-items-center small">
      <Link className="react-link" to={`/app/${details.username}/following`}>
        <span className="small">
          <span className="small--bold">{details.following.length}</span>{" "}
          Following
        </span>
      </Link>
      <Link className="react-link" to={`/app/${details.username}/followers`}>
        <span className="small">
          <span className="small--bold">{details.followers.length}</span>{" "}
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
