import React from 'react'

import propTypes from 'prop-types'

import UserCard from './UserCard'
import './styles.css'

function UserList({ users }) {
    return (
        <div>
            {users.map((c) => (
                <span key={c.id}>
                    <UserCard details={c} />
                </span>
            ))}
        </div>
    )
}

export default UserList

UserList.propTypes = {
    users: propTypes.arrayOf(propTypes.object),
}
