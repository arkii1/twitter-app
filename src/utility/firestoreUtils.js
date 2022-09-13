import {
  updateDoc,
  collection,
  query,
  where,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore"
import { firestore } from "../firebase"

const db = firestore

export async function getUserDetailsFromAuthID(id) {
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

export function getUserDetailsFromEmail() {}

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

export function getMainTweets() {}

export async function createOrUpdateUserDetails(email, details) {
  try {
    const docRef = doc(db, "userDetails", email)
    const d = await getUserDetailsFromAuthID(details.userID)
    if (!d) {
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
  const userDetails = await getUserDetailsFromAuthID(userID)
  const followDetails = await getUserDetailsFromAuthID(followID)
  userDetails.following.push(followID)
  followDetails.followers.push(userID)
  await createOrUpdateUserDetails(userDetails.email, userDetails)
  await createOrUpdateUserDetails(followDetails.email, followDetails)
}

export async function unfollow(userID, followID) {
  const userDetails = await getUserDetailsFromAuthID(userID)
  const followDetails = await getUserDetailsFromAuthID(followID)
  const index1 = userDetails.following.indexOf(followID)
  userDetails.following.splice(index1, 1)
  const index2 = followDetails.followers.indexOf(userID)
  followDetails.followers.splice(index2, 1)
  await createOrUpdateUserDetails(userDetails.email, userDetails)
  await createOrUpdateUserDetails(followDetails.email, followDetails)
}

export async function isFollowing(userID, followID) {
  const userDetails = await getUserDetailsFromAuthID(userID)
  const index = userDetails.following.indexOf(followID)
  return index > -1
}

export async function getUserDetailsFromIDArray(ids) {
  return ids.map((id) => getUserDetailsFromAuthID(id))
}
