/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'

import { faXmark } from '@fortawesome/free-solid-svg-icons'
import propTypes from 'prop-types'

import Modal from '../layout/Modal'
import Button from './Button'
import './styles.css'

function ImageContainer({ src, alt, type, hover = false }) {
    const [focus, setFocus] = useState(false)

    return focus ? (
        <Modal>
            <>
                <img
                    className={`h-100 d-inline-flex justify-content-center align-items-center w-100 image-container__img*--${type} ${
                        type === 'avatar' || type === 'avatar--small'
                            ? 'rounded-circle'
                            : ''
                    }`}
                    src={src}
                    alt={alt}
                />
                <span
                    className="position-absolute w-100 h-100 p-1"
                    style={{ top: '0', left: '0' }}
                >
                    <Button
                        faLogo={faXmark}
                        colours="dark"
                        onClick={() => setFocus(false)}
                    />
                </span>
            </>
        </Modal>
    ) : (
        <div
            className={`image-container--${type} ${
                type === 'avatar' || type === 'avatar--small'
                    ? 'rounded-circle'
                    : ''
            } ${hover ? 'gray-img-on-hover' : ''}`}
            onClick={() => setFocus(true)}
        >
            <img
                className={`h-100 image-container__img--${type} ${
                    type === 'avatar' || type === 'avatar--small'
                        ? 'rounded-circle'
                        : ''
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
