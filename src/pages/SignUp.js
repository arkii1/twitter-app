import React, { useRef, useState } from "react"
import "./SignUp.css"
import { Link, Navigate } from "react-router-dom"
import twitterAnim from "../assets/twitter-anim.gif"
import Button from "../components/Button"
import LabelAndInput from "../components/LabelAndInput"
import { useAuth } from "../contexts/AuthContext"

function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch (err) {
      setError(
        "Failed to create an account. Email either already exists or is not formatted correctly."
      )
      console.log(err)
    }

    return setLoading(false)
  }

  if (currentUser) return <Navigate to="/account" />
  return (
    <div className="sign-up p-3 rounded w-75 h-100 d-flex flex-column align-items-center justify-content-between">
      <img src={twitterAnim} alt="" style={{ height: "3rem", top: "1rem" }} />
      <h1 className="w-100"> Join Twitter today</h1>
      {error && <p className="form-error">{error}</p>}
      <form onSubmit={handleSubmit} className="w-100 d-flex flex-column gap-2">
        <LabelAndInput
          labelText="Email"
          forName="email"
          inputType="email"
          inputRef={emailRef}
        />
        <LabelAndInput
          labelText="Password"
          forName="password"
          inputType="password"
          inputRef={passwordRef}
        />
        <LabelAndInput
          labelText="Confirm Password"
          forName="confirm-password"
          inputType="password"
          inputRef={passwordConfirmRef}
        />
        <Button
          type="submit"
          text="Sign Up"
          colours="dark"
          disabled={loading}
        />
      </form>
      <span className="small my-3">
        Have an account already?{" "}
        <Link to="/modal/sign-in" className="react-link">
          Sign in
        </Link>
      </span>
    </div>
  )
}

export default SignUp
