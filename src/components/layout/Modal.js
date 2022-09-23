import React from 'react'
import { Outlet } from 'react-router-dom'

import propTypes from 'prop-types'

import './styles.css'

function Modal({ children }) {
    return (
        <div className="my-modal ">
            <div
                className="rounded my-modal__content d-flex flex-column justify-content-start align-items-center"
                style={{ overflowY: 'scroll', overflowX: 'hidden' }}
            >
                {!children && <Outlet />}
                {children && children}
            </div>
        </div>
    )
}

export default Modal

Modal.propTypes = {
    children: propTypes.any,
}
