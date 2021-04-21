import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
  apiKey: 'AIzaSyCKTZ6zMSD8MdFG4yuvRFroAy3U-WOpQjE',
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
})

const auth = firebase.auth()
const firestore = firebase.firestore()

export { auth, firebase, firestore }
