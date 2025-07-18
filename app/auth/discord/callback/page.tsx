"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function DiscordCallback() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get("code")
    const error = searchParams.get("error")

    if (error) {
      console.error("Discord auth error:", error)
      window.close()
      return
    }

    if (code) {
      // Exchange code for access token
      exchangeCodeForToken(code)
    }
  }, [searchParams])

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await fetch("/api/discord/exchange-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      if (response.ok) {
        const data = await response.json()

        // Store user data in localStorage for parent window
        localStorage.setItem("discord_auth", JSON.stringify(data))

        // Close popup
        window.close()
      }
    } catch (error) {
      console.error("Token exchange error:", error)
      window.close()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white">Completing Discord authentication...</p>
      </div>
    </div>
  )
}
