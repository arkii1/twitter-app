import React, { useEffect, useState } from "react"
import "./UserList.css"
import { useParams, Navigate } from "react-router-dom"
import {
  getUserDetailsFromIDArray,
  getUserDetailsFromUsername,
} from "../utility/firestoreUtils"
import UserCard from "./UserCard"

function UserList() {
  const { id: username } = useParams()
  const hrefParts = window.location.pathname.split("/")
  const last = hrefParts[hrefParts.length - 1]
  const [detailsArr, setDetailsArr] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const details = await getUserDetailsFromUsername(username)
      const array = await getUserDetailsFromIDArray(
        last === "following" ? details.following : details.followers
      )
      setDetailsArr(array)
      setLoading(false)
    }
    init()
  }, [])

  if (last === "following" || last === "followers") {
    return (
      <div>
        {!loading && detailsArr.length > 0 ? (
          detailsArr.map((d) => <UserCard details={d} />)
        ) : (
          <h3>No {last === "following" ? "accounts followed" : "followers"}</h3>
        )}
      </div>
    )
  }

  return <Navigate to={`/app/${username}`} />
}

export default UserList
