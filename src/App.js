import React from "react"
import "./App.css"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
