import {
  updateDoc,
  collection,
  query,
  where,
  doc,
  setDoc,
  getDocs,
  addDoc,
  getDoc,
} from "firebase/firestore"
import { firestore } from "../firebase"

const db = firestore

export async function getUserDetailsFromID(id) {
  const userDetailsRef = collection(db, "userDetails")
  const q = await query(userDetailsRef, where("userID", "==", id))
  const queryResult = await getDocs(q)
  const qArr = []
  queryResult.forEach((d) => {
    qArr.push(d.data())
  })

  if (qArr > 1)
    return console.log(
      "Two documents in userDetails have the same userID. id: ",
      qArr[0].userID
    )
  if (qArr[0]) {
    return qArr[0]
  }
  return null
}

export function getUserDetailsFromIDArray(ids) {
  return ids.map((id) => getUserDetailsFromID(id))
}

export async function getUserDetailsFromUsername(username) {
  const userDetailsRef = collection(db, "userDetails")
  const q = await query(userDetailsRef, where("username", "==", username))
  const queryResult = await getDocs(q)
  const qArr = []
  queryResult.forEach((d) => {
    qArr.push(d.data())
  })

  if (qArr > 1)
    return console.log(
      "Two documents in userDetails have the same username. Username: ",
      qArr[0].username
    )
  if (qArr[0]) {
    return qArr[0]
  }
  return null
}

export async function createOrUpdateUserDetails(email, details) {
  try {
    const docRef = doc(db, "userDetails", email)
    const docSnap = await getDoc(docRef)
    if (!docSnap) {
      const newDetails = details
      const today = new Date()
      const day = String(today.getDate())
      const month = today.toLocaleString("default", { month: "long" })
      const year = today.getFullYear()
      // eslint-disable-next-line no-param-reassign
      newDetails.createdAt = {
        day,
        month,
        year,
      }
      newDetails.following = []
      newDetails.followers = []
      newDetails.email = email
      newDetails.likedTweets = []
      newDetails.tweets = []
      await setDoc(docRef, newDetails)
    } else updateDoc(docRef, details)
  } catch (err) {
    console.log(err)
  }
}

export async function usernameAlreadyExists(username, id) {
  const userDetailsRef = collection(db, "userDetails")
  const q = await query(
    userDetailsRef,
    where("username", "==", username),
    where("userID", "!=", id)
  )
  const queryResult = await getDocs(q)
  const qArr = []
  queryResult.forEach((d) => {
    qArr.push(d.data())
  })
  return qArr.length > 0
}

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
  attachment
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
  const details = {
    userID,
    replyID,
    repliesArr,
    text,
    attachment,
    createdAt,
  }
  const tweetCol = collection(db, "tweets")
  const ref = await addDoc(tweetCol, details)
  const d = await getUserDetailsFromID(userID)
  const tweetsArr = d.tweets
  tweetsArr.push(ref.id)
  console.log("tweets : ", ref)
  createOrUpdateUserDetails(d.email, {
    tweets: tweetsArr,
  })
}

export async function getTweetFromID(id) {
  const docRef = doc(db, "tweets", id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) return docSnap.data()
  return null
}

export function getTweetsFromUsersArr(followingArr, start, length) {
  const unsubscribe = async () => {
    let retArr = []

    const followingData = await Promise.all(
      followingArr.map((followingID) => getUserDetailsFromID(followingID))
    )

    const tweetIds = []
    followingData.forEach((following) => {
      following.tweets.forEach((tweetId) => {
        tweetIds.push(tweetId)
      })
    })

    const tweetData = await Promise.all(
      tweetIds.map((id) => getTweetFromID(id))
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
