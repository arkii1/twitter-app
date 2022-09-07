import React, { useEffect, useRef, useState, ReactDOM } from "react"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Modal from "./Modal"
import LabelAndInput from "./LabelAndInput"
import { useAuth } from "../contexts/AuthContext"
import OptionSelect from "./OptionSelect"
import { getMonths, getDays, getYears } from "../utility/OptionSelectArrays"
import Button from "./Button"
import ImageInput from "./ImageInput"
import defaultAvatarSrc from "../assets/profile-pic.png"
import defaultBackgroundSrc from "../assets/background.png"
import {
  createOrUpdateUserDetails,
  usernameAlreadyExists,
  getUserDetailsFromAuthID,
} from "../utility/firestoreUtils"

function ConfigureProfile() {
  const { currentUser } = useAuth()
  const curUserDetails = getUserDetailsFromAuthID(currentUser.uid)

  const nameRef = useRef()
  const usernameRef = useRef()
  const bioRef = useRef()
  const locationRef = useRef()
  const websiteRef = useRef()
  const monthRef = useRef()
  const dayRef = useRef()
  const yearRef = useRef()
  const avatarRef = useRef() // type img not file so .src
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

    ReactDOM.unmountComponentAtNode(this)

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

    if (usernameAlreadyExists(usernameRef.current.value, currentUser.uid)) {
      return setError("Username already exists.")
    }

    const details = {
      avatarURL: avatarRef.current.value || defaultAvatarSrc,
      bgURL: bgRef.current.value || defaultBackgroundSrc,
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
      createOrUpdateUserDetails(currentUser.email, details)
    } catch (err) {
      console.log(err)
      return setError("Creating or updating user details failed")
    }

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
          <span>
            <FontAwesomeIcon icon={faXmark} onClick={handleExit} />
          </span>
          <h1 className="w-100 d-inline-flex justify-content-center">
            Configure Profile
          </h1>
        </span>
        <ImageInput
          alt="Background"
          inputRef={bgRef}
          type="background"
          startSrc={curUserDetails.bgURL || defaultBackgroundSrc}
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
              curUserDetails.avatarURL ||
              currentUser.photoURL ||
              defaultAvatarSrc
            }
          />
          <LabelAndInput
            labelText="Name*"
            forName="name"
            inputType="text"
            inputRef={nameRef}
            startValue={curUserDetails.name || currentUser.displayName || ""}
            textLimit={50}
          />
          <LabelAndInput
            labelText="Username*"
            forName="username"
            inputType="text"
            inputRef={usernameRef}
            textLimit={15}
            startValue={curUserDetails.username || ""}
          />
          <LabelAndInput
            labelText="Bio"
            forName="bio"
            inputType="textArea"
            inputRef={bioRef}
            textLimit={160}
            startValue={curUserDetails.bio || ""}
          />
          <span className="small">Birth date*</span>
          <div className="gap-1 w-100 d-flex justify-content-between align-items-center">
            <OptionSelect
              labelText="Month*"
              forName="month"
              options={getMonths()}
              inputRef={monthRef}
              startValue={curUserDetails.birthMonth || ""}
            />
            <OptionSelect
              labelText="Day*"
              forName="day"
              options={getDays()}
              inputRef={dayRef}
              startValue={curUserDetails.birthDay || ""}
            />
            <OptionSelect
              labelText="Year*"
              forName="year"
              options={getYears()}
              inputRef={yearRef}
              startValue={curUserDetails.birthYear || ""}
            />
          </div>
          <LabelAndInput
            labelText="Location"
            forName="location"
            inputType="text"
            inputRef={locationRef}
            textLimit={30}
            startValue={curUserDetails.location || ""}
          />
          <LabelAndInput
            labelText="Website"
            forName="website"
            inputType="url"
            inputRef={websiteRef}
            textLimit={100}
            startValue={curUserDetails.website || ""}
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

// name, username, profilePicture, dateOfBirth, location, website, bio
