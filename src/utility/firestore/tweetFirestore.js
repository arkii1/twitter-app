import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import { firestore } from '../../firebase'
import {
    createOrUpdateUserDetails,
    getUserDetailsFromID,
} from './userDetailsFirestore'

const db = firestore

export async function follow(userID, followID) {
    const userDetails = await getUserDetailsFromID(userID)
    const followDetails = await getUserDetailsFromID(followID)
    userDetails.following.push(followID)
    followDetails.followers.push(userID)
    await createOrUpdateUserDetails(userDetails.email, userDetails)
    await createOrUpdateUserDetails(followDetails.email, followDetails)
}

export async function unfollow(userID, followID) {
    const userDetails = await getUserDetailsFromID(userID)
    const followDetails = await getUserDetailsFromID(followID)
    const index1 = userDetails.following.indexOf(followID)
    userDetails.following.splice(index1, 1)
    const index2 = followDetails.followers.indexOf(userID)
    followDetails.followers.splice(index2, 1)
    await createOrUpdateUserDetails(userDetails.email, userDetails)
    await createOrUpdateUserDetails(followDetails.email, followDetails)
}

export async function isFollowing(userID, followID) {
    const userDetails = await getUserDetailsFromID(userID)
    const index = userDetails.following.indexOf(followID)
    return index > -1
}

export async function createTweet(
    userID,
    replyID,
    repliesArr,
    text,
    attachment,
) {
    const today = new Date()
    const createdAt = {
        second: today.getSeconds(),
        minute: today.getMinutes(),
        hour: today.getHours(),
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear(),
    }
    const retweets = []
    const likes = []
    const ref = db.collection('tweets').doc()
    const details = {
        userID,
        replyID,
        repliesArr,
        text,
        attachment,
        createdAt,
        retweets,
        likes,
        id: ref.id,
    }
    await setDoc(ref, details)
    const d = await getUserDetailsFromID(userID)
    const tweetsArr = d.tweets
    tweetsArr.push(ref.id)
    console.log('tweets : ', ref.id)
    createOrUpdateUserDetails(d.email, {
        tweets: tweetsArr,
    })
}

export async function updateTweet(id, tweet) {
    try {
        const docRef = doc(db, 'tweets', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            updateDoc(docRef, tweet)
        } else console.log("Tweet doesn't exist. Id: ", id)
    } catch (err) {
        console.log(err)
    }
}

export async function getTweetFromID(id) {
    const docRef = doc(db, 'tweets', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) return docSnap.data()
    return null
}

export function getTweetsFromUsersArr(followingArr, start, length) {
    const unsubscribe = async () => {
        let retArr = []

        const followingData = await Promise.all(
            followingArr.map((followingID) =>
                getUserDetailsFromID(followingID),
            ),
        )

        const tweetIds = []
        followingData.forEach((following) => {
            following.tweets.forEach((tweetId) => {
                tweetIds.push(tweetId)
            })
        })
        if (tweetIds.length < 1) return []

        const tweetData = await Promise.all(
            tweetIds.map((id) => getTweetFromID(id)),
        )

        const sortedTweetData = tweetData.sort((a, b) => {
            const createdA = a.createdAt
            const createdB = b.createdAt
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

        retArr = sortedTweetData.splice(start, length)
        return retArr
    }

    return unsubscribe()
}

export async function likeTweet(userID, tweetID) {
    const user = await getUserDetailsFromID(userID)
    user.likedTweets.push(tweetID)
    await createOrUpdateUserDetails(user.email, user)
    const tweet = await getTweetFromID(tweetID)
    tweet.likes.push(userID)
    await updateTweet(tweetID, tweet)
}

export async function unlikeTweet(userID, tweetID) {
    const user = await getUserDetailsFromID(userID)
    const indexOne = user.likedTweets.indexOf(tweetID)
    user.likedTweets.splice(indexOne, 1)
    await createOrUpdateUserDetails(user.email, user)
    const tweet = await getTweetFromID(tweetID)
    const indexTwo = tweet.likes.indexOf(userID)
    tweet.likes.splice(indexTwo, 1)
    await updateTweet(tweetID, tweet)
}

export async function likesTweet(userID, tweetID) {
    const tweet = await getTweetFromID(tweetID)
    const index = tweet.likes.indexOf(userID)
    return index !== -1
}
