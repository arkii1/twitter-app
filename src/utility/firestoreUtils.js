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
  const docRef = doc(db, "userDetails", email)
  try {
    await setDoc(docRef, details)
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
