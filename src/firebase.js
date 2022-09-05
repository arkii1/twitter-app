import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA9c9QDzPQngKrwi2qXe9rs9n2PEoUqFjw",
  authDomain: "twitter-clone-9749d.firebaseapp.com",
  projectId: "twitter-clone-9749d",
  storageBucket: "twitter-clone-9749d.appspot.com",
  messagingSenderId: "1072963825966",
  appId: "1:1072963825966:web:46484ce7578c0ed3330abf",
  measurementId: "G-1NS42SXC2D",
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()
const auth = firebase.auth()

const timestamp = firebase.firestore.FieldValue.serverTimestamp()

export { firestore, auth, timestamp }
