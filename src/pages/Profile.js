import React, { useState, useEffect } from "react"
import "./Profile.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCalendar,
  faLocationDot,
  faLink,
} from "@fortawesome/free-solid-svg-icons"
import { Link, useParams } from "react-router-dom"
import { useDetails } from "../contexts/UserDetailsContext"
import ImageContainer from "../components/ImageContainer"
import Button from "../components/Button"
import ConfigureProfile from "../components/ConfigureProfile"
import {
  getUserDetailsFromUsername,
  follow,
  unfollow,
  isFollowing,
} from "../utility/firestoreUtils"
import FollowingFollowersLinks from "../components/FollowingFollowersLinks"

function Profile() {
  const { userDetails } = useDetails()
  const [configureProfile, setConfigureProfile] = useState(!userDetails)
  const [details, setDetails] = useState(userDetails)
  const [loading, setLoading] = useState(true)
  const [following, setFollowing] = useState(false)
  const { id } = useParams()
  const isUsersPage = id === userDetails.username

  useEffect(() => {
    if (!configureProfile && !isUsersPage) {
      const handleDetails = async () => {
        const newDetails = await getUserDetailsFromUsername(id)
        setDetails(newDetails)
        const fol = await isFollowing(userDetails.userID, newDetails.userID)
        setFollowing(fol)
        setLoading(false)
      }
      handleDetails()
    } else if (!configureProfile) {
      setDetails(userDetails)
      setLoading(false)
    }
  }, [configureProfile, id, userDetails, isUsersPage])

  const handleFollow = async () => {
    const { userID: folID } = await getUserDetailsFromUsername(id)
    await follow(userDetails.userID, folID)
    setFollowing(true)
  }

  const handleUnfollow = async () => {
    const { userID: folID } = await getUserDetailsFromUsername(id)
    unfollow(userDetails.userID, folID)
    setFollowing(false)
  }

  return (
    !loading && (
      <>
        {configureProfile && isUsersPage && (
          <ConfigureProfile exit={() => setConfigureProfile(false)} />
        )}
        <div className="w-100 h-100">
          <ImageContainer src={details.bgURL} alt="" type="bg" />
          <span
            className="p-2"
            style={{
              width: "max-content",
              float: "right",
            }}
          >
            {" "}
            {isUsersPage && (
              <Button
                text="Edit profile"
                onClick={() => setConfigureProfile(true)}
              />
            )}
            {!isUsersPage &&
              (following ? (
                <Button text="Unfollow" onClick={handleUnfollow} />
              ) : (
                <Button text="Follow" colours="dark" onClick={handleFollow} />
              ))}
          </span>
          <span className="d-flex ">
            <span
              style={{
                position: "absolute",
                transform: "translate(0.5rem, -4rem)",
                background: "rgba(0,0,0,0)",
              }}
              className="d-flex flex-column gap-3"
            >
              <ImageContainer src={details.avatarURL} alt="" type="avatar" />
              <span className="d-flex flex-column gap-1">
                <h3 className="profile__h3">{details.name}</h3>
                <h4 className="small">@{details.username}</h4>
              </span>
              {details.bio !== "" && (
                <p className="profile__p">{details.bio}</p>
              )}
              <span className="d-flex gap-4 justify-content-start align-items-center small">
                {details.location !== "" && (
                  <span>
                    <FontAwesomeIcon icon={faLocationDot} /> {details.location}
                  </span>
                )}
                {details.website !== "" && (
                  <span>
                    <Link className="react-link small" to={details.website}>
                      <FontAwesomeIcon icon={faLink} /> {details.website}
                    </Link>
                  </span>
                )}
                <span>
                  <FontAwesomeIcon icon={faCalendar} /> Joined{" "}
                  {details.createdAt.month} {details.createdAt.year}
                </span>
              </span>
              <FollowingFollowersLinks details={details} />
            </span>
          </span>
        </div>
      </>
    )
  )
}

export default Profile
