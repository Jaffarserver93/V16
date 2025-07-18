"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { db } from "@/lib/firebase"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function DiscordCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [message, setMessage] = useState("Completing Discord authentication...")

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code")
      const error = searchParams.get("error")

      if (error) {
        setMessage(`Authentication failed: ${error}. Redirecting...`)
        toast({
          title: "Authentication Failed",
          description: `Discord authentication failed: ${error}`,
          variant: "destructive",
        })
        setTimeout(() => router.push("/"), 3000)
        return
      }

      if (!code) {
        setMessage("No authorization code found. Redirecting...")
        toast({
          title: "Authentication Error",
          description: "No authorization code found from Discord.",
          variant: "destructive",
        })
        setTimeout(() => router.push("/"), 3000)
        return
      }

      try {
        // Exchange code for token
        setMessage("Exchanging code for access token...")
        const tokenResponse = await fetch(`/api/discord/exchange-token?code=${code}`)
        if (!tokenResponse.ok) {
          const errorData = await tokenResponse.json()
          throw new Error(errorData.error || "Failed to exchange code for token")
        }
        const tokenData = await tokenResponse.json()
        const { access_token, expires_in } = tokenData

        // Fetch user info
        setMessage("Fetching user information...")
        const userResponse = await fetch("https://discord.com/api/v10/users/@me", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user info from Discord")
        }
        const userData = await userResponse.json()

        // Store user data in Firestore
        setMessage("Saving user data...")
        const userRef = doc(db, "users", userData.id)
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            id: userData.id,
            username: userData.username,
            email: userData.email || null, // Discord email might not always be available
            avatar: userData.avatar || null,
            createdAt: new Date(),
          })
          console.log("New user created in Firestore:", userData.username)
        } else {
          // Optionally update existing user data
          await setDoc(
            userRef,
            {
              username: userData.username,
              email: userData.email || null,
              avatar: userData.avatar || null,
              updatedAt: new Date(),
            },
            { merge: true },
          )
          console.log("Existing user updated in Firestore:", userData.username)
        }

        // Attempt to add user to Discord server
        setMessage("Adding you to our Discord server...")
        const joinServerResponse = await fetch("/api/discord/join-server", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userData.id, accessToken: access_token }),
        })

        if (!joinServerResponse.ok) {
          const errorData = await joinServerResponse.json()
          console.warn("Failed to add user to Discord server:", errorData.details || errorData.error)
          toast({
            title: "Discord Server Join Failed",
            description: "We couldn't automatically add you to our Discord server. Please join manually.",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Welcome!",
            description: "You've been added to our Discord server.",
          })
        }

        // Store user info in localStorage for client-side access
        localStorage.setItem(
          "discord_user",
          JSON.stringify({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            accessToken: access_token,
            expiresAt: Date.now() + expires_in * 1000, // Store expiry time
          }),
        )

        setMessage("Authentication complete! Redirecting to profile...")
        toast({
          title: "Login Successful",
          description: "You have successfully logged in with Discord.",
        })
        router.push("/profile") // Redirect to profile page
      } catch (err: any) {
        console.error("Discord authentication process failed:", err)
        setMessage(`Authentication failed: ${err.message}. Redirecting...`)
        toast({
          title: "Authentication Error",
          description: `An error occurred during authentication: ${err.message}`,
          variant: "destructive",
        })
        setTimeout(() => router.push("/"), 3000) // Redirect to home or login on error
      }
    }

    handleCallback()
  }, [searchParams, router, toast])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Loader2 className="h-16 w-16 animate-spin text-purple-500" />
      <p className="mt-4 text-lg">{message}</p>
    </div>
  )
}
