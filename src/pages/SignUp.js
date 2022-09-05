/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react"
import "./SignUp.css"
import twitterAnim from "../assets/twitter-anim.gif"
import Button from "../components/Button"
import LabelAndInput from "../components/LabelAndInput"
import { useAuth } from "../contexts/AuthContext"

function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // eslint-disable-next-line consistent-return
  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch (err) {
      setError("Failed to create an account")
      console.log(err)
    }

    setLoading(false)
  }

  return (
    <div>
      <img src={twitterAnim} alt="" style={{ height: "3rem", top: "1rem" }} />
      <h1> Join Twitter today</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <Button type="submit" text="Submit" colours="dark" disabled={loading} />
      </form>
      <span className="sign-up__has-account my-3">
        Have an account already? <a href="/sign-in">Log in</a>
      </span>
    </div>
  )
}

export default SignUp
