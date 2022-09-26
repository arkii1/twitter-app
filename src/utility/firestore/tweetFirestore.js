import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import { firestore } from '../../firebase'
import { getUserDetails, updateUserDetails } from './userDetailsFirestore'

const db = firestore

export function sortTweets(tweets) {
    const sortedTweets = tweets.sort((a, b) => {
        const createdA = a.tweetData.createdAt
        const createdB = b.tweetData.createdAt
        if (createdA.year !== createdB.year) {
            return createdB.year - createdA.year
        }
        if (createdA.month !== createdB.month) {
            return createdB.month - createdA.month
        }
        if (createdA.day !== createdB.day) {
            return createdB.day - createdA.day
        }
        if (createdA.hour !== createdB.hour) {
            return createdB.hour - createdA.hour
        }
        if (createdA.minute !== createdB.minute) {
            return createdB.minute - createdA.minute
        }
        if (createdA.second !== createdB.second) {
            return createdB.second - createdA.second
        }
        return 0
    })
    return sortedTweets
}

export async function createTweet(
    userID,
    replyID,
    text,
    attachments,
    retweetedUser = null,
) {
    const docRef = db.collection('tweets').doc()
    const today = new Date()
    const day = String(today.getDate())
    const month = today.toLocaleString('default', { month: 'long' })
    const year = today.getFullYear()
    const details = {
        userID,
        id: docRef.id,
        text,
        attachments: [...attachments],
        createdAt: {
            day,
            month,
            year,
        },
        likes: [],
        retweets: [],
        replies: [],
        repliedTo: replyID || null,
    }
    await setDoc(docRef, details)

    const userDetails = await getUserDetails(userID)
    userDetails.tweets.push({
        retweetedUser,
        tweetID: docRef.id,
    })
    await updateUserDetails(userID, userDetails)
}

export async function getTweet(id) {
    const docRef = doc(db, 'tweets', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return docSnap.data()
    }
    return null
}

export function getTweetsFromUserArray(followingArr, start, length) {
    const unsubscribe = async () => {
        const followingData = await Promise.all(
            followingArr.map((followingID) => getUserDetails(followingID)),
        )

        const tweetArr = []
        followingData.forEach((following) => {
            following.tweets.forEach((t) => {
                tweetArr.push(t)
            })
        })
        if (tweetArr.length < 1) return []

        const tweetData = await Promise.all(
            tweetArr.map(async (t) => {
                const data = await getTweet(t.tweetID)
                return {
                    tweetData: data,
                    retweetedUser: t.retweetedUser,
                }
            }),
        )

        const sortedTweetData = sortTweets(tweetData)

        return sortedTweetData.slice(start, length)
    }

    return unsubscribe()
}

export async function updateTweet(id, details) {
    const tweet = await getTweet(id)
    if (tweet) {
        await updateDoc(doc(db, 'tweets', id), details)
    } else console.log('No doc found in updateUserDetails. id: ', id)
}

export async function deleteTweet() {
    console.log('NOT IMPLEMENTED: deleteTweet')
}

export async function likeTweet(userID, tweetID) {
    const userDetails = await getUserDetails(userID)
    userDetails.likedTweets.push(tweetID)
    await updateUserDetails(userDetails.id, userDetails)

    const tweetDetails = await getTweet(tweetID)
    tweetDetails.likes.push(userID)
    await updateTweet(tweetID, tweetDetails)
}

export async function unlikeTweet(userID, tweetID) {
    const userDetails = await getUserDetails(userID)
    const indexOne = userDetails.likedTweets.indexOf(tweetID)
    userDetails.likedTweets.splice(indexOne, 1)
    await updateUserDetails(userDetails.id, userDetails)

    const tweetDetails = await getTweet(tweetID)
    const indexTwo = tweetDetails.likes.indexOf(userID)
    tweetDetails.likes.splice(indexTwo, 1)
    await updateTweet(tweetID, tweetDetails)
}

export async function retweet(userID, tweetID) {
    const userDetails = await getUserDetails(userID)
    userDetails.tweets.push({
        id: tweetID,
        retweetedUser: userID,
    })
    await updateUserDetails(userDetails.id, userDetails)

    const tweetDetails = await getTweet(tweetID)
    tweetDetails.retweets.push(userID)
    await updateTweet(tweetID, tweetDetails)
}

export async function unRetweet(userID, tweetID) {
    const userDetails = await getUserDetails(userID)
    const tweet = userDetails.tweets.find((t) => t.tweetID === tweetID)
    const userIndex = userDetails.tweets.indexOf(tweet)
    userDetails.tweets.splice(userIndex, 1)
    await updateUserDetails(userDetails.id, userDetails)

    const tweetDetails = await getTweet(tweetID)
    const tweetIndex = tweetDetails.retweets.indexOf(userID)
    tweetDetails.retweets.splice(tweetIndex, 1)
    await updateTweet(tweetID, tweetDetails)
}

export async function replyToTweet() {
    console.log('NOT IMPLEMENTED: replyToTweet')
}

export async function shareTweet() {
    console.log('NOT IMPLEMENTED: shareTweet')
}
