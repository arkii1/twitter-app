import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore'

import { firestore } from '../../firebase'

const db = firestore

export async function getUserDetailsFromID(id) {
    const userDetailsRef = collection(db, 'userDetails')
    const q = await query(userDetailsRef, where('userID', '==', id))
    const queryResult = await getDocs(q)
    const qArr = []
    queryResult.forEach((d) => {
        qArr.push(d.data())
    })

    if (qArr > 1)
        return console.log(
            'Two documents in userDetails have the same userID. id: ',
            qArr[0].userID,
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
    const userDetailsRef = collection(db, 'userDetails')
    const q = await query(userDetailsRef, where('username', '==', username))
    const queryResult = await getDocs(q)
    const qArr = []
    queryResult.forEach((d) => {
        qArr.push(d.data())
    })

    if (qArr > 1)
        return console.log(
            'Two documents in userDetails have the same username. Username: ',
            qArr[0].username,
        )
    if (qArr[0]) {
        return qArr[0]
    }
    return null
}

export async function createOrUpdateUserDetails(email, details) {
    try {
        const docRef = doc(db, 'userDetails', email)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) {
            const newDetails = details
            const today = new Date()
            const day = String(today.getDate())
            const month = today.toLocaleString('default', { month: 'long' })
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
    const userDetailsRef = collection(db, 'userDetails')
    const q = await query(
        userDetailsRef,
        where('username', '==', username),
        where('userID', '!=', id),
    )
    const queryResult = await getDocs(q)
    const qArr = []
    queryResult.forEach((d) => {
        qArr.push(d.data())
    })
    return qArr.length > 0
}
