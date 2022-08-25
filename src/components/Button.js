import React from "react"
import "./Button.css"
import propTypes from "prop-types"

function Button({ logo, text, colours, onClick }) {
  return (
    <button
      type="button"
      className={`button--${colours} d-flex gap-1 align-items-center justify-content-center w-75`}
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
  onClick: propTypes.func, // make this required later
}
