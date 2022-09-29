import React from 'react'

import propTypes from 'prop-types'
import uniqid from 'uniqid'

import TweetCard from './TweetCard'
import './styles.css'

function TweetList({ tweetArr }) {
    const tweets = tweetArr.map((tweet) => (
        <span key={uniqid()}>
            <TweetCard tweet={tweet} />
            <div className="my-1" />
        </span>
    ))
    return <div className="d-flex flex-column">{tweets}</div>
}

export default TweetList

TweetList.propTypes = {
    tweetArr: propTypes.arrayOf(propTypes.object).isRequired,
}
