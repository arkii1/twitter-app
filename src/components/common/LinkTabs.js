import React from 'react'
import { Link } from 'react-router-dom'

import propTypes from 'prop-types'
import uniqid from 'uniqid'

import './styles.css'

function LinkTabs({ links }) {
    const path = window.location.pathname

    return (
        <div className="link-tabs d-flex w-100 justify-content-center align-items-start">
            {links.map((l) => (
                <Link
                    key={uniqid()}
                    className={` d-flex flex-column justify-content-between align-items-center gap-1 h-100 link-tabs__link${
                        l.link === path ? '--active' : ''
                    } react-link--none d-inline-flex flex-column justify-content-center`}
                    to={l.link}
                >
                    <span className="pt-3 p-2">{l.text}</span>
                    <span
                        className={`links-tabs__line--${
                            l.link === path ? 'active' : 'inactive'
                        } rounded `}
                    />
                </Link>
            ))}
        </div>
    )
}

export default LinkTabs

LinkTabs.propTypes = {
    links: propTypes.arrayOf(propTypes.object),
}
