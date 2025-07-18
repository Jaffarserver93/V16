"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User, Crown, Shield } from "lucide-react"
import { useToast } from "./notification-toast"
import { db } from "@/lib/firebase" // Import Firestore
import { doc, setDoc } from "firebase/firestore" // Import Firestore functions

interface DiscordUser {
  id: string
  username: string
  discriminator: string
  avatar: string
  email: string
  access_token?: string
}

export function EnhancedDiscordLogin() {
  const [user, setUser] = useState<DiscordUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { showToast, ToastContainer } = useToast()

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem("discord_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("discord_user")
      }
    }
  }, [])

  const handleDiscordLogin = async () => {
    setIsLoading(true)

    try {
      const clientId = "1090917458346524734"
      const redirectUri = encodeURIComponent(window.location.origin + "/auth/discord/callback")
      const guildId = process.env.NEXT_PUBLIC_DISCORD_GUILD_ID || "1388084142075547680"

      const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify%20email%20guilds.join&permissions=0&guild_id=${guildId}`

      // Open Discord auth in popup
      const popup = window.open(discordAuthUrl, "discord-auth", "width=500,height=700,scrollbars=yes,resizable=yes")

      if (!popup) {
        showToast("Please allow popups for Discord authentication", "error")
        setIsLoading(false)
        return
      }

      // Listen for auth completion
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed)

          // Check for auth success in localStorage
          const authData = localStorage.getItem("discord_auth")
          if (authData) {
            try {
              const userData = JSON.parse(authData)
              setUser(userData)
              localStorage.setItem("discord_user", JSON.stringify(userData))
              localStorage.removeItem("discord_auth")

              showToast(`Welcome back, ${userData.username}!`, "success")

              // Save user to Firestore
              saveUserToFirestore(userData)

              // Auto-join Discord server
              joinDiscordServer(userData.access_token)
            } catch (error) {
              console.error("Error processing auth data:", error)
              showToast("Authentication failed. Please try again.", "error")
            }
          } else {
            showToast("Authentication was cancelled", "info")
          }
          setIsLoading(false)
        }
      }, 1000)

      // Timeout after 5 minutes
      setTimeout(() => {
        if (!popup?.closed) {
          popup?.close()
          clearInterval(checkClosed)
          setIsLoading(false)
          showToast("Authentication timed out", "error")
        }
      }, 300000)
    } catch (error) {
      console.error("Discord login error:", error)
      showToast("Failed to initiate Discord login", "error")
      setIsLoading(false)
    }
  }

  const saveUserToFirestore = async (userData: DiscordUser) => {
    try {
      const userRef = doc(db, "users", userData.id)
      await setDoc(
        userRef,
        {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          avatar: userData.avatar,
          lastLogin: new Date(),
        },
        { merge: true },
      ) // Use merge to update if exists, create if not
      console.log("User data saved to Firestore:", userData.id)
    } catch (error) {
      console.error("Error saving user to Firestore:", error)
    }
  }

  const joinDiscordServer = async (accessToken: string) => {
    try {
      const guildId = process.env.NEXT_PUBLIC_DISCORD_GUILD_ID
      if (!guildId) {
        console.warn("Discord guild ID not configured")
        return
      }

      const response = await fetch(`/api/discord/join-server`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: accessToken,
          guild_id: guildId,
        }),
      })

      if (response.ok) {
        showToast("Successfully joined our Discord server!", "success")
      } else {
        const errorData = await response.json()
        console.error("Failed to join Discord server:", errorData)
        showToast("Logged in successfully, but couldn't auto-join Discord server", "warning")
      }
    } catch (error) {
      console.error("Error joining Discord server:", error)
      showToast("Logged in successfully, but couldn't auto-join Discord server", "warning")
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("discord_user")
    showToast("Successfully logged out", "info")
  }

  if (user) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 ring-2 ring-purple-500/50">
                <AvatarImage
                  src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : undefined}
                  alt={user.username}
                />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-black/90 border-white/20 backdrop-blur-xl" align="end" forceMount>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium text-white flex items-center">
                  {user.username}
                  <Crown className="w-4 h-4 ml-2 text-yellow-500" />
                </p>
                <p className="text-xs text-white/70">{user.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator className="bg-white/20" />
            <DropdownMenuItem className="text-white hover:bg-white/10">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-white/10">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-white/10">
              <Shield className="mr-2 h-4 w-4" />
              Premium Features
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/20" />
            <DropdownMenuItem className="text-red-400 hover:bg-red-500/10" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ToastContainer />
      </>
    )
  }

  return (
    <>
      <Button
        onClick={handleDiscordLogin}
        disabled={isLoading}
        className="bg-[#5865F2] hover:bg-[#4752C4] text-white relative overflow-hidden group"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
        ) : (
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
        )}
        {isLoading ? "Connecting..." : "Login with Discord"}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Button>
      <ToastContainer />
    </>
  )
}
