import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import Home from './components/home/Home'
import AppLayout from './components/layout/AppLayout'
import Modal from './components/layout/Modal'
import SignIn from './components/login/SignIn'
import SignUp from './components/login/SignUp'
import Community from './components/profile/Community'
import Profile from './components/profile/Profile'
import Logout from './components/utility/Logout'
import { AuthProvider } from './contexts/AuthContext'
import { UserDetailsProvider } from './contexts/UserDetailsContext'
import './index.css'

function App() {
    return (
        <div className="App w-100 h-100 d-flex justify-content-center">
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route
                            index
                            element={<Navigate to="modal/sign-in" />}
                        />
                        <Route path="modal" element={<Modal />}>
                            <Route index path="sign-in" element={<SignIn />} />
                            <Route path="sign-up" element={<SignUp />} />
                        </Route>
                        <Route path="logout" element={<Logout />} />
                    </Routes>
                    <UserDetailsProvider>
                        <Routes>
                            <Route path="app" element={<AppLayout />}>
                                <Route index path="home" element={<Home />} />
                                <Route path=":id" element={<Profile />} />
                                <Route
                                    path=":id/community/:userList"
                                    element={<Community />}
                                />
                            </Route>
                        </Routes>
                    </UserDetailsProvider>
                </AuthProvider>
            </BrowserRouter>
        </div>
    )
}

export default App
