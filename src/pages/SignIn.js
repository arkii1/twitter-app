import React from "react"
import "./SignIn.css"
import { Link, Navigate } from "react-router-dom"
import LabelAndInput from "../components/LabelAndInput"
import googleLogo from "../assets/google-logo.svg"
import twitterAnim from "../assets/twitter-anim.gif"
import Button from "../components/Button"
import { useAuth } from "../contexts/AuthContext"

function SignIn() {
  const { googleSignIn, currentUser } = useAuth()

  const handelGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }
  if (currentUser) return <Navigate to="/account" />
  return (
    <div className="sign-in w-75 h-100 d-flex flex-column align-items-center justify-content-between">
      <img src={twitterAnim} alt="" style={{ height: "3rem", top: "1rem" }} />
      <h1>Sign in to Twitter</h1>
      <Button
        logo={googleLogo}
        text="Continue with Google"
        colours="light"
        onClick={handelGoogleSignIn}
      />
      or
      <form className="w-100 d-flex flex-column gap-2">
        <LabelAndInput labelText="Email" type="email" forName="email" />
        <LabelAndInput
          labelText="Password"
          type="password"
          forName="password"
        />
        <Button text="Sign In" colours="dark" />
      </form>
      <Button text="Forgotten password?" colours="light" />
      <span className="small my-3">
        Don&apos;t have an account?{" "}
        <Link className="react-link" to="/modal/sign-up">
          Sign up
        </Link>
      </span>
    </div>
  )
}

export default SignIn
