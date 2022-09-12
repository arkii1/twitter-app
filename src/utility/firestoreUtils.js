import {
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

export function getMainTweets() {}

export async function createOrUpdateUserDetails(email, details) {
  try {
    const d = await getUserDetailsFromAuthID(details.userID)
    let newDetails = details
    if (!d) {
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
      newDetails = details
    } else {
      Object.keys(d).forEach((key) => {
        if (!newDetails[key]) {
          newDetails[key] = d[key]
        }
      })
    }
    const docRef = doc(db, "userDetails", email)
    await setDoc(docRef, newDetails)
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
