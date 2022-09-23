import React from 'react'
import { Outlet } from 'react-router-dom'

import Protected from '../utility/Protected'
import Navbar from './Navbar'
import './styles.css'

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
