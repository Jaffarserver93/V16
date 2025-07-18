"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Crown, Server, Gamepad2, Globe } from "lucide-react"
import { EnhancedDiscordLogin } from "./enhanced-discord-login"

export function Navigation() {
  const pathname = usePathname()

  const getIcon = () => {
    if (pathname === "/minecraft") return <Gamepad2 className="w-5 h-5 text-white" />
    if (pathname === "/vps") return <Server className="w-5 h-5 text-white" />
    if (pathname === "/domains") return <Globe className="w-5 h-5 text-white" />
    return <Crown className="w-5 h-5 text-white" />
  }

  const getTitle = () => {
    if (pathname === "/minecraft") return "HostPro Minecraft"
    if (pathname === "/vps") return "HostPro VPS"
    if (pathname === "/domains") return "HostPro Domains"
    return "HostPro"
  }

  const getGradient = () => {
    if (pathname === "/minecraft") return "from-green-500 to-emerald-500"
    if (pathname === "/vps") return "from-blue-500 to-cyan-500"
    if (pathname === "/domains") return "from-purple-500 to-pink-500"
    return "from-purple-500 to-pink-500"
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className={`w-8 h-8 bg-gradient-to-r ${getGradient()} rounded-lg flex items-center justify-center`}>
            {getIcon()}
          </div>
          <span className="text-xl font-bold text-white">{getTitle()}</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/minecraft"
            className={`transition-colors ${pathname === "/minecraft" ? "text-green-400" : "text-white/80 hover:text-white"}`}
          >
            Minecraft
          </Link>
          <Link
            href="/vps"
            className={`transition-colors ${pathname === "/vps" ? "text-blue-400" : "text-white/80 hover:text-white"}`}
          >
            VPS
          </Link>
          <Link
            href="/domains"
            className={`transition-colors ${pathname === "/domains" ? "text-purple-400" : "text-white/80 hover:text-white"}`}
          >
            Domains
          </Link>
          <Link
            href="/"
            className={`transition-colors ${pathname === "/" ? "text-purple-400" : "text-white/80 hover:text-white"}`}
          >
            Home
          </Link>
        </div>

        <EnhancedDiscordLogin />
      </div>
    </motion.nav>
  )
}
