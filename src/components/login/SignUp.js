import React, { useRef, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

import twitterAnim from '../../assets/twitter-anim.gif'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../common/Button'
import LabelAndInput from '../input/LabelAndInput'
import './styles.css'

function SignUp() {
    const { signup, currentUser } = useAuth()

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match.')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch (err) {
            setError(
                'Failed to create an account. Email either already exists or is not formatted correctly.',
            )
            console.log(err)
        }

        return setLoading(false)
    }

    if (currentUser) return <Navigate to="/app/home" />
    return (
        <div className="sign-up p-3 rounded w-75 h-100 d-flex flex-column align-items-center justify-content-around">
            <img
                src={twitterAnim}
                alt=""
                style={{ height: '3rem', top: '1rem' }}
            />
            <h1 className="sign-up__h1"> Join Twitter today</h1>
            {error && <p className="form-error">{error}</p>}
            <form
                onSubmit={handleSubmit}
                className="w-100 d-flex flex-column gap-2"
            >
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
                    width="100%"
                />
            </form>
            <span className="small my-3">
                Have an account already?{' '}
                <Link to="/modal/sign-in" className="react-link--blue">
                    Sign in
                </Link>
            </span>
        </div>
    )
}

export default SignUp
