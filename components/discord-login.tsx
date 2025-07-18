"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"

interface DiscordUser {
  id: string
  username: string
  discriminator: string
  avatar: string
  email: string
}

export function DiscordLogin() {
  const [user, setUser] = useState<DiscordUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleDiscordLogin = async () => {
    setIsLoading(true)

    try {
      // Discord OAuth2 URL with auto-join parameter
      const clientId =
        process.env.DISCORD_CLIENT_ID || process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "1090917458346524734"
      const redirectUri = encodeURIComponent(
        process.env.DISCORD_REDIRECT_URI || window.location.origin + "/auth/discord/callback",
      )
      const guildId = process.env.NEXT_PUBLIC_DISCORD_GUILD_ID || "1388084142075547680"

      const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify%20email%20guilds.join&permissions=0&guild_id=${guildId}`

      // Open Discord auth in popup
      const popup = window.open(discordAuthUrl, "discord-auth", "width=500,height=700,scrollbars=yes,resizable=yes")

      // Listen for auth completion
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed)
          // Check for auth success in localStorage
          const authData = localStorage.getItem("discord_auth")
          if (authData) {
            const userData = JSON.parse(authData)
            setUser(userData)
            localStorage.removeItem("discord_auth")

            // Show success notification
            console.log("Successfully logged in with Discord!")

            // Auto-join Discord server
            joinDiscordServer(userData.access_token)
          }
          setIsLoading(false)
        }
      }, 1000)
    } catch (error) {
      console.error("Discord login error:", error)
      setIsLoading(false)
    }
  }

  const joinDiscordServer = async (accessToken: string) => {
    try {
      const guildId = process.env.NEXT_PUBLIC_DISCORD_GUILD_ID
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
        console.log("Successfully joined Discord server")
      }
    } catch (error) {
      console.error("Error joining Discord server:", error)
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("discord_user")
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                alt={user.username}
              />
              <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-black/90 border-white/20" align="end" forceMount>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium text-white">{user.username}</p>
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
          <DropdownMenuSeparator className="bg-white/20" />
          <DropdownMenuItem className="text-red-400 hover:bg-red-500/10" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button onClick={handleDiscordLogin} disabled={isLoading} className="bg-[#5865F2] hover:bg-[#4752C4] text-white">
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
      ) : (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      )}
      Login with Discord
    </Button>
  )
}
