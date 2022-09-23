import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import propTypes from 'prop-types'

import './styles.css'

function DynamicTextArea({
    placeholder,
    inputRef,
    maxRows = 999,
    maxLength,
    onChange,
}) {
    return (
        <div className="dynamic-text-area w-100 border-0 outline-0 d-inline-flex justify-content-start align-items-start">
            <TextareaAutosize
                placeholder={placeholder}
                ref={inputRef}
                className="dynamic-text-area__text-area border-0 outline-0 w-100 h-100 p-0"
                maxLength={maxLength}
                maxRows={maxRows}
                onChange={onChange}
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
    onChange: propTypes.func,
}
