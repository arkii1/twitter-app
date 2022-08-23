import React from "react"
import "./SignIn.css"

function SignIn() {
  return (
    <div className="sign-in d-flex flex-column justify-content-center align-items-center bg-white p-5 rounded gap-4">
      <h1>Sign in to Twitter</h1>
      <div className="d-flex flex-column justify-content-center align-items-center gap-2">
        <button type="button">Continue with Google</button>
        or
        <form
          className="sign-in__form d-flex flex-column justify-content-center align-items-center gap-2"
          method="POST"
          action=""
        >
          <input type="text" placeholder="Email" />
          <button type="submit">Next</button>
        </form>
        <button type="button">Forget password?</button>
      </div>
      <span>
        Don&apos;t have an account? <a href="/">Sign Up</a>
      </span>
    </div>
  )
}

export default SignIn
