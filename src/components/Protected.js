import React from "react"
import { Navigate } from "react-router-dom"
import propTypes from "prop-types"
import { useAuth } from "../contexts/AuthContext"

function Protected({ children }) {
  const { currentUser } = useAuth()
  if (!currentUser) {
    return <Navigate to="/modal/sign-in" />
  }

  return children
}

export default Protected

Protected.propTypes = {
  children: propTypes.oneOfType([propTypes.array, propTypes.object]),
}
