import React, { useEffect, useState } from 'react'

import propTypes from 'prop-types'
import uniqid from 'uniqid'

import useToggle from '../../hooks/useToggle'
import './styles.css'

function OptionSelect({
    labelText,
    forName,
    options,
    inputRef,
    startValue = '',
}) {
    const [active, toggleActive] = useToggle()
    const [divClass, setDivClass] = useState('option-select--inactive')
    const [labelClass, setLabelClass] = useState('option-select--inactive')
    const [inputValue, setInputValue] = useState(startValue)

    useEffect(() => {
        const newDivClass = active
            ? 'option-select--active'
            : 'option-select--inactive'
        const newLabelClass = active
            ? 'option-select__label--active'
            : 'option-select__label--inactive'
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
                ref={inputRef}
                onChange={(e) => {
                    setInputValue(e.target.value)
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
    inputRef: propTypes.object,
    options: propTypes.arrayOf(propTypes.string).isRequired,
    startValue: propTypes.string,
}
