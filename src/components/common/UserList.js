import React from 'react'

import propTypes from 'prop-types'

import UserCard from './UserCard'
import './styles.css'

function UserList({ children }) {
    return (
        <div>
            {children.map((c) => (
                <span key={c.id}>
                    <UserCard details={c} />
                </span>
            ))}
        </div>
    )
}

export default UserList

UserList.propTypes = {
    children: propTypes.arrayOf(propTypes.object),
}
