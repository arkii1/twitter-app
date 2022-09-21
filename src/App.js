import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import "./App.css"
import "./index.css"
import Modal from "./components/Modal"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Account from "./pages/Account"
import Profile from "./pages/Profile"
import AppLayout from "./components/AppLayout"
import { UserDetailsProvider } from "./contexts/UserDetailsContext"
import Logout from "./components/Logout"
import UserList from "./components/UserList"
import TweetList from "./components/TweetList"

function App() {
  return (
    <div className="App w-100 h-100 d-flex justify-content-center">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="modal" element={<Modal />}>
              <Route index path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
            </Route>
            <Route path="logout" element={<Logout />} />
          </Routes>
          <UserDetailsProvider>
            <Routes>
              <Route path="app" element={<AppLayout />}>
                <Route index path="home" element={<Account />} />
                <Route path=":id" element={<Profile />}>
                  <Route path="tweets/:tweetList" element={<TweetList />} />
                </Route>
                <Route path=":id/community/:userList" element={<UserList />} />
              </Route>
            </Routes>
          </UserDetailsProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
