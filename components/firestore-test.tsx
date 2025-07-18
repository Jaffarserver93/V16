"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

export default function FirestoreTest() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("Attempting Firestore connection...")

  useEffect(() => {
    const testFirestore = async () => {
      try {
        // Attempt to write a dummy document
        const testDocRef = doc(db, "test_collection", "connection_test")
        await setDoc(testDocRef, {
          timestamp: new Date(),
          status: "connected",
        })
        setMessage("Successfully wrote to Firestore!")

        // Attempt to read the dummy document
        const docSnap = await getDoc(testDocRef)
        if (docSnap.exists()) {
          setMessage("Successfully read from Firestore! Data: " + JSON.stringify(docSnap.data()))
          setStatus("success")
        } else {
          setMessage("Successfully wrote, but failed to read (document not found).")
          setStatus("error")
        }
      } catch (err: any) {
        console.error("Firestore test failed:", err)
        setMessage(`Firestore connection failed: ${err.message || err.toString()}`)
        setStatus("error")
      }
    }

    testFirestore()
  }, [])

  return (
    <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 mt-8 max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center">
          {status === "loading" && <Loader2 className="w-5 h-5 animate-spin mr-2 text-blue-400" />}
          {status === "success" && <CheckCircle className="w-5 h-5 mr-2 text-green-400" />}
          {status === "error" && <XCircle className="w-5 h-5 mr-2 text-red-400" />}
          Firestore Connection Test
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-white/80">{message}</p>
        {status === "error" && (
          <p className="text-red-300 text-sm mt-2">
            Please ensure Firestore Database is enabled for your project in the Firebase Console and security rules
            allow read/write.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
