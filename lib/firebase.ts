// Firebase configuration
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD-SFjagJIKFag9ybire32cxtoGkqA-zCw",
  authDomain: "project-2-78c26.firebaseapp.com",
  projectId: "project-2-78c26",
  storageBucket: "project-2-78c26.firebasestorage.app",
  messagingSenderId: "986493431540",
  appId: "1:986493431540:web:d8beb75bc460727a6678a1",
  measurementId: "G-GYDV1HEZRV",
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

export default app
