import React from "react"
import "./Modal.css"
import { Outlet } from "react-router-dom"

function Modal() {
  return (
    <div className="rounded-modal p-3 d-flex flex-column justify-content-start align-items-center">
      <Outlet />
    </div>
  )
}

export default Modal
