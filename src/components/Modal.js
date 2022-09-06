import React from "react"
import "./Modal.css"
import { Outlet } from "react-router-dom"
import propTypes from "prop-types"

function Modal({ children }) {
  return (
    <div
      className="rounded rounded-modal d-flex flex-column justify-content-start align-items-center"
      style={{ overflowY: "scroll", overflowX: "hidden" }}
    >
      {!children && <Outlet />}
      {children && children}
    </div>
  )
}

export default Modal

Modal.propTypes = {
  children: propTypes.any,
}
