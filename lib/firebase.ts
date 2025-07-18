import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Log the configuration to help diagnose missing environment variables
console.log("Firebase Config being used:", firebaseConfig)
console.log("API Key status:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "Set" : "NOT SET")
console.log("Auth Domain status:", process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? "Set" : "NOT SET")
console.log("Project ID status:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "Set" : "NOT SET")
console.log("Storage Bucket status:", process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? "Set" : "NOT SET")
console.log("Messaging Sender ID status:", process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? "Set" : "NOT SET")
console.log("App ID status:", process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? "Set" : "NOT SET")

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
