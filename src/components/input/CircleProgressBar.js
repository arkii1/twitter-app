import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import propTypes from 'prop-types'

import './styles.css'

function CircleProgressBar({ percentage, text }) {
    let size = '1.4rem'
    let colour = 'rgba(62, 152, 199)'
    let textColour = 'black'
    if (percentage >= (260 / 280) * 100) {
        size = '1.6rem'
        colour = 'rgb(255,212,0)'
    }

    if (percentage >= 100) {
        colour = 'rgb(244,49,61)'
        textColour = 'rgb(244,49,61)'
    }

    return (
        <span
            style={{ height: size, width: size, transition: '0.2s' }}
            className="d-flex justify-content-center align-items-center"
        >
            <CircularProgressbar
                text={text}
                value={percentage}
                minValue={0}
                maxValue={100}
                styles={{
                    path: {
                        stroke: colour,
                        strokeLinecap: 'butt',
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                    },
                    text: {
                        fill: textColour,
                        fontSize: '3rem',
                    },
                }}
            />
        </span>
    )
}

export default CircleProgressBar

CircleProgressBar.propTypes = {
    percentage: propTypes.number.isRequired,
    text: propTypes.number,
}
