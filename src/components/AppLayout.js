import React from "react"
import "./AppLayout.css"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Protected from "./Protected"

function AppLayout() {
  return (
    <Protected>
      <div className="layout">
        <Navbar />
        <main className="w-100 h-100">
          <Outlet />
        </main>
      </div>
    </Protected>
  )
}

export default AppLayout
