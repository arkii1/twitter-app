import React from "react"
import propTypes from "prop-types"

import "./DynamicTextArea.css"

import TextareaAutosize from "react-textarea-autosize"

function DynamicTextArea({ placeholder, inputRef, maxRows = 999, maxLength }) {
  return (
    <div className="dynamic-text-area w-100 border-0 outline-0 d-inline-flex justify-content-start align-items-start">
      <TextareaAutosize
        placeholder={placeholder}
        ref={inputRef}
        className="dynamic-text-area__text-area border-0 outline-0 w-100 h-100 p-0"
        maxLength={maxLength}
        maxRows={maxRows}
      />
    </div>
  )
}

export default DynamicTextArea

DynamicTextArea.propTypes = {
  placeholder: propTypes.string,
  inputRef: propTypes.object.isRequired,
  maxLength: propTypes.number,
  maxRows: propTypes.number,
}