import React from "react"
import "./SignIn.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import LabelAndInput from "../components/LabelAndInput"
import googleLogo from "../assets/google-logo.svg"
import twitterAnim from "../assets/twitter-anim.gif"
import Button from "../components/Button"
import { useAuth } from "../contexts/AuthContext"

function SignIn() {
  const { googleSignIn } = useAuth()

  const handelGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="sign-in d-flex flex-column justify-content-start align-items-center bg-white gap-4 p-5">
      <FontAwesomeIcon icon={faXmark} className="sign-in__x p-2" />
      <img src={twitterAnim} alt="" style={{ height: "3rem", top: "1rem" }} />
      <h1 style={{ height: "1.8rem" }} className="mb-5">
        Sign in to Twitter
      </h1>
      <div className="d-flex flex-column justify-content-center align-items-center gap-2 w-100">
        <Button
          logo={googleLogo}
          text="Continue with Google"
          colours="light"
          onClick={handelGoogleSignIn}
        />
        or
        <form
          className="sign-in__form d-flex flex-column justify-content-center align-items-center gap-2 w-100"
          method="POST"
          action=""
        >
          <LabelAndInput labelText="Email" type="email" forName="email" />
          <Button text="Next" colours="dark" />
        </form>
        <Button text="Forgotten password?" colours="light" />
      </div>
      <span className="sign-in__no-account my-3">
        Don&apos;t have an account? <a href="/sign-up">Sign up</a>
      </span>
    </div>
  )
}

export default SignIn
