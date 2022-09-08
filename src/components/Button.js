import React from "react"
import "./Button.css"
import propTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Button({
  faLogo,
  logo,
  text,
  colours = "light",
  onClick,
  type = "button",
}) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`button--${colours} d-flex gap-1 align-items-center justify-content-center w-100`}
      onClick={onClick}
    >
      {logo && <img src={logo} alt="" style={{ height: "1rem" }} />}
      {faLogo && <FontAwesomeIcon icon={faLogo} />}
      {text}
    </button>
  )
}

export default Button

Button.propTypes = {
  logo: propTypes.node,
  text: propTypes.string,
  colours: propTypes.string,
  onClick: propTypes.func,
  type: propTypes.string,
  faLogo: propTypes.string,
}
