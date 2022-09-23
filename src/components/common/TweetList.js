import React from 'react'

import propTypes from 'prop-types'

import TweetCard from './TweetCard'
import './styles.css'

function TweetList({ tweetArr }) {
    const tweets = tweetArr.map((tweet) => (
        <>
            <TweetCard tweet={tweet} />
            <div className="my-1" />
        </>
    ))
    return <div className="d-flex flex-column">{tweets}</div>
}

export default TweetList

TweetList.propTypes = {
    tweetArr: propTypes.arrayOf(propTypes.object).isRequired,
}