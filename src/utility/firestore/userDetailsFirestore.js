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

export async function createUserDetails(id, details) {
    const today = new Date()
    const day = String(today.getDate())
    const month = today.toLocaleString('default', { month: 'long' })
    const year = today.getFullYear()
    const newDetails = {
        ...details,
        id,
        following: [],
        followers: [],
        tweets: [],
        likedTweets: [],
        createdAt: {
            day,
            month,
            year,
        },
    }
    await setDoc(doc(db, 'userDetails', id), newDetails)
    return newDetails
}

// eslint-disable-next-line no-unused-vars
export async function getUserDetails(id) {
    const docRef = doc(db, 'userDetails', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return docSnap.data()
    }
    return null
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

export async function updateUserDetails(id, details) {
    const userDetails = await getUserDetails(id)
    if (userDetails) {
        await updateDoc(doc(db, 'userDetails', id), details)
        return details
    }
    return null
}

export async function deleteUserDetails(id) {
    console.log(`NOT IMPLEMENTED: deleteUserDetails. Id: ${id}`)
}

export async function usernameExists(username, userID) {
    const q = await query(
        collection(db, 'userDetails'),
        where('username', '==', username),
        where('userID', '!=', userID),
    )
    const queryResult = await getDocs(q)

    return queryResult.length > 0
}

export async function follow(userID, followID) {
    const userDetails = await getUserDetails(userID)
    const followDetails = await getUserDetails(followID)

    userDetails.following.push(followID)
    followDetails.followers.push(userID)

    await updateUserDetails(userID, userDetails)
    await updateUserDetails(followID, followDetails)
}

export async function unfollow(userID, followID) {
    const userDetails = await getUserDetails(userID)
    const followDetails = await getUserDetails(followID)

    const index1 = userDetails.following.indexOf(followID)
    userDetails.following.splice(index1, 1)
    const index2 = followDetails.followers.indexOf(userID)
    followDetails.followers.splice(index2, 1)

    await updateUserDetails(userID, userDetails)
    await updateUserDetails(followID, followDetails)
}
