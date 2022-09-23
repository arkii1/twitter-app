import React, { useRef } from 'react'
import { Link, Navigate } from 'react-router-dom'

import googleLogo from '../../assets/google-logo.svg'
import twitterAnim from '../../assets/twitter-anim.gif'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../common/Button'
import LabelAndInput from '../input/LabelAndInput'
import './styles.css'

function SignIn() {
    const { googleSignIn, signInWithEmail, currentUser } = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handelGoogleSignIn = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            console.log(error)
        }
    }

    const handleEmailSignIn = async () => {
        try {
            await signInWithEmail(
                emailRef.current.value,
                passwordRef.current.value,
            )
        } catch (error) {
            console.log(error)
        }
    }

    if (currentUser) return <Navigate to="/app/home" />
    return (
        <div className="sign-in p-3 rounded w-75 h-100 d-flex flex-column align-items-center justify-content-around">
            <img
                src={twitterAnim}
                alt=""
                style={{ height: '3rem', top: '1rem' }}
            />
            <h1 className="sign-in__h1">Sign in to Twitter</h1>
            <Button
                logo={googleLogo}
                text="Continue with Google"
                colours="light"
                onClick={handelGoogleSignIn}
                width="100%"
            />
            or
            <form className="w-100 d-flex flex-column gap-2">
                <LabelAndInput
                    labelText="Email"
                    type="email"
                    forName="email"
                    inputRef={emailRef}
                />
                <LabelAndInput
                    labelText="Password"
                    type="password"
                    forName="password"
                    inputRef={passwordRef}
                />
                <Button
                    text="Sign In"
                    colours="dark"
                    onClick={handleEmailSignIn}
                    width="100%"
                />
            </form>
            <Button text="Forgotten password?" colours="light" width="100%" />
            <span className="small my-3">
                Don&apos;t have an account?{' '}
                <Link className="react-link--blue" to="/modal/sign-up">
                    Sign up
                </Link>
            </span>
        </div>
    )
}

export default SignIn
