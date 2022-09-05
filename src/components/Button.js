import React from "react"
import "./Button.css"
import propTypes from "prop-types"

function Button({ logo, text, colours, onClick, type }) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`button--${colours} d-flex gap-1 align-items-center justify-content-center w-100`}
      onClick={onClick}
    >
      {logo && <img src={logo} alt="" style={{ height: "1rem" }} />}
      {text}
    </button>
  )
}

export default Button

Button.propTypes = {
  logo: propTypes.node,
  text: propTypes.string.isRequired,
  colours: propTypes.string.isRequired,
  onClick: propTypes.func, // make this required later,
  type: propTypes.string.isRequired,
}
