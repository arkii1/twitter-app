import React, { useState, useEffect } from "react"
import "./LabelAndInput.css"
import propTypes from "prop-types"
import useToggle from "../hooks/useToggle"

function LabelAndInput({ labelText, forName, inputType }) {
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

  return (
    <div
      className={`${divClass} d-flex flex-column rounded p-1`}
      onFocus={toggleActive}
      onBlur={toggleActive}
    >
      <label className={labelClass} htmlFor={forName}>
        {labelText}
      </label>
      <input
        className="label-and-input__input border-0"
        type={inputType}
        name={forName}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default LabelAndInput

LabelAndInput.propTypes = {
  labelText: propTypes.string,
  forName: propTypes.string,
  inputType: propTypes.string,
}
