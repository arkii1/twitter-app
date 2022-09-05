import React, { useState, useEffect } from "react"
import "./LabelAndInput.css"
import propTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import useToggle from "../hooks/useToggle"

function LabelAndInput({ labelText, forName, inputType, inputRef }) {
  const [active, toggleActive] = useToggle()
  const [divClass, setDivClass] = useState("label-and-input--inactive")
  const [labelClass, setLabelClass] = useState(
    "label-and-input__label--inactive"
  )
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    const newDivClass = active
      ? "label-and-input--active"
      : "label-and-input--inactive"
    let newLabelClass = ""
    if (inputValue !== "" && !active) {
      newLabelClass = "label-and-input__label--has-input"
    } else {
      newLabelClass = active
        ? "label-and-input__label--active"
        : "label-and-input__label--inactive"
    }
    setDivClass(newDivClass)
    setLabelClass(newLabelClass)
  }, [active, inputValue])

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const [curInputType, setCurInputType] = useState(inputType)
  const changeCurInputType = () => {
    if (curInputType === "password") setCurInputType("text")
    else setCurInputType("password")
  }

  return (
    <div
      className={`${divClass} d-flex flex-column p-1 rounded w-100`}
      onFocus={toggleActive}
      onBlur={toggleActive}
    >
      <label className={labelClass} htmlFor={forName}>
        {labelText}
      </label>
      {inputType !== "password" ? (
        <input
          ref={inputRef}
          className="label-and-input__input border-0 w-100"
          type={inputType}
          name={forName}
          onChange={handleInputChange}
        />
      ) : (
        <div className="d-flex justify-content-between">
          {" "}
          <input
            ref={inputRef}
            className="label-and-input__input border-0 w-100"
            type={curInputType}
            name={forName}
            onChange={handleInputChange}
          />
          {curInputType === "password" ? (
            <FontAwesomeIcon
              icon={faEye}
              className="p-2"
              onClick={changeCurInputType}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEyeSlash}
              className="p-2"
              onClick={changeCurInputType}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default LabelAndInput

LabelAndInput.propTypes = {
  labelText: propTypes.string,
  forName: propTypes.string,
  inputType: propTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  inputRef: propTypes.object,
}
