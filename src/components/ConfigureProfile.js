import React, { useEffect, useRef, useState } from "react"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import propTypes from "prop-types"
import Modal from "./Modal"
import LabelAndInput from "./LabelAndInput"
import { useAuth } from "../contexts/AuthContext"
import { useDetails } from "../contexts/UserDetailsContext"
import OptionSelect from "./OptionSelect"
import { getMonths, getDays, getYears } from "../utility/OptionSelectArrays"
import Button from "./Button"
import ImageInput from "./ImageInput"
import defaultAvatarSrc from "../assets/profile-pic.png"
import defaultBackgroundSrc from "../assets/background.png"
import { usernameAlreadyExists } from "../utility/firestoreUtils"

function ConfigureProfile({ exit }) {
  const { currentUser } = useAuth()
  const { userDetails, updateUserDetails } = useDetails()

  const nameRef = useRef()
  const usernameRef = useRef()
  const bioRef = useRef()
  const locationRef = useRef()
  const websiteRef = useRef()
  const monthRef = useRef()
  const dayRef = useRef()
  const yearRef = useRef()
  const avatarRef = useRef()
  const bgRef = useRef()
  const [error, setError] = useState("")
  const errorRef = useRef()

  const handleExit = () => {
    if (nameRef.current.value.length <= 0) {
      return setError("Please fill in name.")
    }
    if (usernameRef.current.value.length <= 0) {
      return setError("Please fill in username.")
    }
    if (
      monthRef.current.value.length <= 0 ||
      dayRef.current.value.length <= 0 ||
      yearRef.current.value.length <= 0
    ) {
      return setError("Please fill in birth date.")
    }

    exit()

    return setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (nameRef.current.value.length <= 0) {
      return setError("Please fill in name.")
    }
    if (usernameRef.current.value.length <= 0) {
      return setError("Please fill in username.")
    }
    if (
      monthRef.current.value.length <= 0 ||
      dayRef.current.value.length <= 0 ||
      yearRef.current.value.length <= 0
    ) {
      return setError("Please fill in birth date.")
    }

    if (
      await usernameAlreadyExists(usernameRef.current.value, currentUser.uid)
    ) {
      return setError("Username already exists.")
    }

    const details = {
      avatarURL: avatarRef.current.src,
      bgURL: bgRef.current.src,
      bio: bioRef.current.value || "",
      birthDay: dayRef.current.value,
      birthMonth: monthRef.current.value,
      birthYear: yearRef.current.value,
      location: locationRef.current.value || "",
      name: nameRef.current.value,
      username: usernameRef.current.value,
      website: websiteRef.current.value || "",
      userID: currentUser.uid,
    }
    try {
      updateUserDetails(details)
    } catch (err) {
      console.log(err)
      return setError("Creating or updating user details failed")
    }

    exit()
    return setError("")
  }

  useEffect(() => {
    if (error !== "") errorRef.current.scrollIntoView({ behavior: "smooth" })
  }, [error])

  return (
    <Modal>
      <form
        onSubmit={handleSubmit}
        className="configure-profile p-1 w-100 h-100 d-flex flex-column justify-content-between"
      >
        <span className="configure-profile__top d-flex px-2 py-1">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={handleExit}
            style={{ cursor: "pointer" }}
          />
          <h1 className="w-100 d-inline-flex justify-content-center">
            Configure Profile
          </h1>
        </span>
        <ImageInput
          alt="Background"
          inputRef={bgRef}
          type="background"
          startSrc={
            userDetails && userDetails.bgURL !== ""
              ? userDetails.bgURL
              : defaultBackgroundSrc
          }
        />
        <span
          className="px-2 d-flex flex-column justify-content-between gap-3 "
          style={{ transform: "translateY(-4rem)", position: "relative" }}
        >
          <ImageInput
            alt="Profile avatar"
            inputRef={avatarRef}
            type="avatar"
            startSrc={
              userDetails && userDetails.avatarURL !== ""
                ? userDetails.avatarURL
                : currentUser.photoURL || defaultAvatarSrc
            }
          />
          <LabelAndInput
            labelText="Name*"
            forName="name"
            inputType="text"
            inputRef={nameRef}
            startValue={
              userDetails ? userDetails.name : currentUser.displayName
            }
            textLimit={50}
          />
          <LabelAndInput
            labelText="Username*"
            forName="username"
            inputType="text"
            inputRef={usernameRef}
            textLimit={15}
            startValue={userDetails ? userDetails.username : ""}
          />
          <LabelAndInput
            labelText="Bio"
            forName="bio"
            inputType="textArea"
            inputRef={bioRef}
            textLimit={160}
            startValue={userDetails ? userDetails.bio : ""}
          />
          <span className="small">Birth date*</span>
          <div className="gap-1 w-100 d-flex justify-content-between align-items-center">
            <OptionSelect
              labelText="Month*"
              forName="month"
              options={getMonths()}
              inputRef={monthRef}
              startValue={userDetails ? userDetails.birthMonth : ""}
            />
            <OptionSelect
              labelText="Day*"
              forName="day"
              options={getDays()}
              inputRef={dayRef}
              startValue={userDetails ? userDetails.birthDay : ""}
            />
            <OptionSelect
              labelText="Year*"
              forName="year"
              options={getYears()}
              inputRef={yearRef}
              startValue={userDetails ? userDetails.birthYear : ""}
            />
          </div>
          <LabelAndInput
            labelText="Location"
            forName="location"
            inputType="text"
            inputRef={locationRef}
            textLimit={30}
            startValue={userDetails ? userDetails.location : ""}
          />
          <LabelAndInput
            labelText="Website"
            forName="website"
            inputType="url"
            inputRef={websiteRef}
            textLimit={100}
            startValue={userDetails ? userDetails.website : ""}
          />
          <span ref={errorRef} className="configure-profile__top__span pb-3">
            {error && <p className="form-error">{error}</p>}
            <Button text="Save" type="submit" colours="dark" />
          </span>
        </span>
      </form>
    </Modal>
  )
}

export default ConfigureProfile

ConfigureProfile.propTypes = {
  exit: propTypes.func,
}
