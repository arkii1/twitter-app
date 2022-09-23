import React from "react"
import "./styles.css"
import propTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Button({
  faLogo,
  logo,
  text,
  colours = "light",
  onClick,
  type = "button",
  size = "1rem",
  padding = "2",
  width = "max-content",
}) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`button--${colours} d-flex gap-1 align-items-center justify-content-center p-${padding}`}
      onClick={onClick}
      style={{ width: `${width}` }}
    >
      {logo && <img src={logo} alt="" style={{ height: "1rem" }} />}
      {faLogo && (
        <FontAwesomeIcon icon={faLogo} style={{ height: size, width: size }} />
      )}
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
  faLogo: propTypes.object,
  size: propTypes.string,
  padding: propTypes.string,
  width: propTypes.string,
}
