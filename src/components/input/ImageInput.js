import React, { useState, useRef } from "react"
import "./styles.css"
import propTypes from "prop-types"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ImageInput({ startSrc, alt, inputRef, type }) {
  const [src, setSrc] = useState(startSrc)
  const fileRef = useRef()

  const onChange = () => {
    const newSrc = URL.createObjectURL(fileRef.current.files[0])
    setSrc(newSrc)
  }

  return (
    <div
      className={`image-input--${type} ${
        type === "avatar" ? "rounded-circle" : ""
      }`}
    >
      <img
        ref={inputRef}
        className={`image-input__img--${type} w-100 h-100 ${
          type === "avatar" ? "rounded-circle" : ""
        }`}
        alt={alt}
        src={src}
      />
      <FontAwesomeIcon
        icon={faCamera}
        className="image-input__camera p-3 rounded-circle"
        onClick={() => fileRef.current.click()}
      />
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .svg"
        style={{
          position: "absolute",
          top: "0",
          transform: "translateY(-3000px)",
        }}
        ref={fileRef}
        onChange={onChange}
      />
    </div>
  )
}

export default ImageInput

ImageInput.propTypes = {
  alt: propTypes.string.isRequired,
  inputRef: propTypes.object.isRequired,
  type: propTypes.string.isRequired,
  startSrc: propTypes.string.isRequired,
}
