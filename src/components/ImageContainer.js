import React from "react"
import "./ImageContainer.css"
import propTypes from "prop-types"

function ImageContainer({ src, alt, type }) {
  return (
    <div
      className={`image-container--${type} ${
        type === "avatar" || type === "avatar--small" ? "rounded-circle" : ""
      }`}
    >
      <img
        className={`h-100 image-container__img--${type} ${
          type === "avatar" || type === "avatar--small" ? "rounded-circle" : ""
        }`}
        src={src}
        alt={alt}
      />
    </div>
  )
}

export default ImageContainer

ImageContainer.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
}
