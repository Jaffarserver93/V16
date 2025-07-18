"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MenuIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { authManager } from "@/utils/auth"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const router = useRouter()

  useEffect(() => {
    const authState = authManager.getAuthState()
    setIsLoggedIn(authState.isAuthenticated)
    if (authState.isAuthenticated && authState.user) {
      setUsername(authState.user.username)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem("discord_user") // Clear local storage
      setIsLoggedIn(false)
      setUsername("")
      router.push("/") // Redirect to homepage
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <header className="w-full py-4 px-4 md:px-6 flex items-center justify-between bg-gradient-to-r from-slate-900 to-purple-900 text-white shadow-lg">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <img src="/logo.webp" alt="JXFRCloud Logo" className="h-8 w-auto" />
        <span className="text-2xl font-bold">JXFRCloud</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/" className="text-lg font-medium hover:text-purple-400 transition-colors" prefetch={false}>
          Home
        </Link>
        <Link
          href="/minecraft"
          className="text-lg font-medium hover:text-purple-400 transition-colors"
          prefetch={false}
        >
          Minecraft
        </Link>
        <Link href="/vps" className="text-lg font-medium hover:text-purple-400 transition-colors" prefetch={false}>
          VPS
        </Link>
        <Link href="/domains" className="text-lg font-medium hover:text-purple-400 transition-colors" prefetch={false}>
          Domains
        </Link>
        <Link href="/contact" className="text-lg font-medium hover:text-purple-400 transition-colors" prefetch={false}>
          Contact
        </Link>
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                {username}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800 border-slate-700 text-white">
              <DropdownMenuItem>
                <Link href="/profile" className="w-full block">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/admin" className="w-full block">
                  Admin
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/auth/discord" prefetch={false}>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Login with Discord</Button>
          </Link>
        )}
      </nav>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden text-white">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60 bg-slate-800 border-slate-700 text-white">
          <DropdownMenuItem>
            <Link href="/" className="w-full block" prefetch={false}>
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/minecraft" className="w-full block" prefetch={false}>
              Minecraft
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/vps" className="w-full block" prefetch={false}>
              VPS
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/domains" className="w-full block" prefetch={false}>
              Domains
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/contact" className="w-full block" prefetch={false}>
              Contact
            </Link>
          </DropdownMenuItem>
          {isLoggedIn ? (
            <>
              <DropdownMenuItem>
                <Link href="/profile" className="w-full block">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/admin" className="w-full block">
                  Admin
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem>
              <Link href="/auth/discord" className="w-full block" prefetch={false}>
                Login with Discord
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
