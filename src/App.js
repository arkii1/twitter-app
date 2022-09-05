import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import "./App.css"
import "./index.css"
import Modal from "./components/Modal"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Protected from "./components/Protected"
import Account from "./pages/Account"

function App() {
  return (
    <div className="App w-100 h-100">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="modal" element={<Modal />}>
              <Route index path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
            </Route>
            <Route
              index
              path="account"
              element={
                <Protected>
                  <Account />
                </Protected>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
