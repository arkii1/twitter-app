import React, { useRef, useState } from 'react'

import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons'

import { useDetails } from '../../contexts/UserDetailsContext'
import { createTweet } from '../../utility/firestore/tweetFirestore'
import Button from '../common/Button'
import ImageContainer from '../common/ImageContainer'
import CircleProgressBar from '../input/CircleProgressBar'
import DynamicTextArea from '../input/DynamicTextArea'
import './styles.css'

function CreateTweet() {
    const { userDetails } = useDetails()

    const textInputRef = useRef()
    const fileInputRef = useRef()

    const [src, setSrc] = useState('')
    const [percentage, setPercentage] = useState(0)
    const [progressText, setProgressText] = useState(null)

    const handleImageOnChange = () => {
        const newSrc = URL.createObjectURL(fileInputRef.current.files[0])
        setSrc(newSrc)
    }

    const handleImageClick = () => {
        fileInputRef.current.click()
    }

    const removeImage = () => {
        setSrc('')
    }

    const handleCreateTweet = () => {
        const text = textInputRef.current.value
        createTweet(userDetails.userID, null, [], text, src)
    }

    const handleChange = () => {
        const count = textInputRef.current.value.length
        const percent = (count / 280) * 100
        setPercentage(percent)
        const text = count > 259 ? 280 - count : null
        setProgressText(text)
    }

    return (
        <div className="create-tweet d-flex flex-column justify-content-start w-100 p-2 ">
            <span className="d-flex justify-content-start align-items-start gap-3 w-100">
                <ImageContainer
                    src={userDetails.avatarURL}
                    alt=""
                    type="avatar--small"
                />
                <span className="w-100 d-flex flex-column gap-2">
                    <DynamicTextArea
                        placeholder="What's happening?"
                        inputRef={textInputRef}
                        maxLength={280}
                        maxRows={20}
                        onChange={handleChange}
                    />
                    {src !== '' && (
                        <div className="w-100 position-relative d-flex justify-content-center">
                            <ImageContainer
                                src={src}
                                alt=""
                                type="create-tweet"
                            />
                            <span
                                className="position-absolute w-100 h-100 p-1"
                                style={{ top: '0', left: '0' }}
                            >
                                <Button
                                    faLogo={faXmark}
                                    colours="dark"
                                    onClick={removeImage}
                                />
                            </span>
                        </div>
                    )}
                    <span className="break-line" />
                    <span className="create-tweet__bottom d-flex gap-1 justify-content-between">
                        <span className="d-flex justify-content-start gap-1 flex-grow-1">
                            <Button
                                faLogo={faImage}
                                colours="blue--reverse"
                                onClick={handleImageClick}
                            />
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageOnChange}
                                hidden
                            />
                        </span>
                        <span className="w-100 h-100 d-flex gap-1 justify-content-end align-items-center flex-grow-0">
                            <CircleProgressBar
                                percentage={percentage}
                                text={progressText}
                            />
                            <span className="break-line--vert" />
                            <Button
                                text="Tweet"
                                colours="blue"
                                onClick={handleCreateTweet}
                            />
                        </span>
                    </span>
                </span>
            </span>
        </div>
    )
}

export default CreateTweet
