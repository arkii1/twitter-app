import React from "react"
import "./styles.css"
import propTypes from "prop-types"

function ImageContainer({ src, alt, type, hover = false }) {
  return (
    <div
      className={`image-container--${type} ${
        type === "avatar" || type === "avatar--small" ? "rounded-circle" : ""
      } ${hover ? "gray-img-on-hover" : ""}`}
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
  hover: propTypes.bool,
}
