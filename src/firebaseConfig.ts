import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
})

const firestore = firebase.firestore()
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { auth, firebase, firestore, db }
