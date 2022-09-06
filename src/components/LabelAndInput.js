/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react"
import "./LabelAndInput.css"
import propTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import useToggle from "../hooks/useToggle"

function LabelAndInput({
  labelText,
  forName,
  inputType,
  inputRef,
  startValue,
  textLimit,
}) {
  const [active, toggleActive] = useToggle()
  const [divClass, setDivClass] = useState("label-and-input--inactive")
  const [labelClass, setLabelClass] = useState(
    "label-and-input__label--inactive"
  )
  const [inputValue, setInputValue] = useState(startValue || "")
  const startChar = startValue ? startValue.length : 0
  const [charCount, setCharCount] = useState(startChar)

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
    const newCount = e.target.value.length
    setCharCount(newCount)
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
      {textLimit ? (
        <span className="d-flex justify-content-between">
          <label className={labelClass} htmlFor={forName}>
            {labelText}
          </label>
          <span
            className={`small label-and-input__char-count--${
              active ? "active" : "inactive"
            }`}
          >
            {charCount} / {textLimit}
          </span>
        </span>
      ) : (
        <label className={labelClass} htmlFor={forName}>
          {labelText}
        </label>
      )}

      {inputType === "textArea" && (
        <textarea
          name={forName}
          rows={5}
          className="label-and-input__input border-0 w-100"
          onChange={handleInputChange}
          value={inputValue}
          maxLength={textLimit}
        />
      )}

      {inputType === "password" && (
        <div className="d-flex justify-content-between">
          {" "}
          <input
            ref={inputRef}
            className="label-and-input__input border-0 w-100"
            type={curInputType}
            name={forName}
            onChange={handleInputChange}
            value={inputValue}
            maxLength={textLimit}
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

      {inputType !== "password" && inputType !== "textArea" && (
        <input
          ref={inputRef}
          className="label-and-input__input border-0 w-100"
          type={inputType}
          name={forName}
          onChange={handleInputChange}
          value={inputValue}
          maxLength={textLimit}
        />
      )}
    </div>
  )
}

export default LabelAndInput

LabelAndInput.propTypes = {
  labelText: propTypes.string,
  forName: propTypes.string,
  inputType: propTypes.string,
  inputRef: propTypes.object,
  startValue: propTypes.string,
  textLimit: propTypes.number,
}
