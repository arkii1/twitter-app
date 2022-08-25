import React from "react"
import "./SignUp.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import googleLogo from "../assets/google-logo.svg"
import twitterAnim from "../assets/twitter-anim.gif"
import Button from "./Button"

function SignUp() {
  return (
    <div className="sign-up d-flex flex-column justify-content-start align-items-center bg-white gap-4 p-5">
      <FontAwesomeIcon icon={faXmark} className="sign-up__x p-2" />
      <img src={twitterAnim} alt="" style={{ height: "3rem", top: "1rem" }} />
      <h1 style={{ height: "1.8rem" }} className="mb-5">
        {" "}
        Join Twitter today
      </h1>
      <Button text="Sign Up with Google" logo={googleLogo} colours="light" />
      or
      <Button text="Sign up with email" colours="dark" />
      <span className="sign-up__has-account my-3">
        Have an account already? <a href="/sign-in">Log in</a>
      </span>
    </div>
  )
}

export default SignUp
