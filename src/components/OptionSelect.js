import React, { useState, useEffect } from "react"
import "./LabelAndInput.css"
import propTypes from "prop-types"
import uniqid from "uniqid"
import "./OptionSelect.css"
import useToggle from "../hooks/useToggle"

function OptionSelect({ labelText, forName, selectId, options, onChange }) {
  const [active, toggleActive] = useToggle()
  const [divClass, setDivClass] = useState("option-select--inactive")
  const [labelClass, setLabelClass] = useState("option-select--inactive")
  // Work around as select value clears on blue
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    const newDivClass = active
      ? "option-select--active"
      : "option-select--inactive"
    const newLabelClass = active
      ? "option-select__label--active"
      : "option-select__label--inactive"
    setDivClass(newDivClass)
    setLabelClass(newLabelClass)
  }, [active])

  const optionsJSX = options.map((option) => (
    <option value={option} key={uniqid()}>
      {option}
    </option>
  ))

  return (
    <div
      className={`${divClass} d-flex flex-column align-items-left p-1 rounded w-100`}
      onFocus={toggleActive}
      onBlur={toggleActive}
    >
      <label className={`${labelClass} px-1`} htmlFor={forName}>
        {labelText}
      </label>
      <select
        name={forName}
        value={inputValue}
        className="option-select__select "
        id={selectId}
        onChange={(e) => {
          setInputValue(e.target.value)
          onChange(e)
        }}
      >
        {optionsJSX}
      </select>
    </div>
  )
}

export default OptionSelect

OptionSelect.propTypes = {
  labelText: propTypes.string.isRequired,
  forName: propTypes.string.isRequired,
  selectId: propTypes.string.isRequired,
  options: propTypes.arrayOf(propTypes.string).isRequired,
  onChange: propTypes.func.isRequired,
}
