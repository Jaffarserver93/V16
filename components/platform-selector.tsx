"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, Gamepad2, ArrowRight, Server } from "lucide-react" // Import Server icon
import { useRouter } from "next/navigation"

interface PlatformSelectorProps {
  selectedPlatform: string
  onPlatformChange: (platform: string) => void
}

const platforms = [
  {
    id: "minecraft",
    title: "Minecraft Hosting",
    description: "Optimized servers for the ultimate Minecraft experience",
    icon: <Gamepad2 className="w-8 h-8 text-white" />,
    features: ["1-Click Modpack Install", "Automatic Backups", "Plugin Support", "Custom JARs"],
    color: "from-green-500 to-emerald-500",
    gradientFrom: "from-green-900/30",
    gradientTo: "to-slate-900/30",
    iconColor: "from-green-500 to-emerald-500",
    popular: true,
    href: "/minecraft",
  },
  {
    id: "vps",
    title: "VPS Hosting",
    description: "High-performance virtual private servers with full root access",
    icon: <Server className="w-8 h-8 text-white" />,
    features: ["Full Root Access", "NVMe SSD Storage", "DDoS Protection", "Global Locations"],
    color: "from-blue-500 to-cyan-500",
    gradientFrom: "from-blue-900/30",
    gradientTo: "to-slate-900/30",
    iconColor: "from-blue-500 to-cyan-500",
    popular: false,
    href: "/vps",
  },
  {
    id: "domains",
    title: "Domain Registration",
    description: "Secure your perfect domain name with competitive pricing",
    icon: <Globe className="w-8 h-8 text-white" />,
    features: ["Free WHOIS Privacy", "DNS Management", "Email Forwarding", "Easy Transfer"],
    color: "from-purple-500 to-pink-500",
    gradientFrom: "from-purple-900/30",
    gradientTo: "to-slate-900/30",
    iconColor: "from-purple-500 to-pink-500",
    popular: false,
    href: "/domains",
  },
]

export function PlatformSelector({ selectedPlatform, onPlatformChange }: PlatformSelectorProps) {
  const router = useRouter()

  const handlePlatformSelect = (platformId: string, href: string) => {
    onPlatformChange(platformId)
    router.push(href)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
      {platforms.map((platform, index) => (
        <motion.div
          key={platform.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ once: true }}
          whileHover={{ y: -10, scale: 1.02 }}
          whileTap={{ scale: 0.98 }} // Added tap animation for the card
          className="relative"
        >
          {platform.popular && (
            <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 sm:px-4 py-1 text-xs sm:text-sm">
                Most Popular
              </Badge>
            </div>
          )}

          <Card
            className={`h-full transition-all duration-300 relative overflow-hidden
        ${
          platform.id === selectedPlatform
            ? `bg-gradient-to-br ${platform.gradientFrom} ${platform.gradientTo} border-purple-500/50 shadow-2xl shadow-purple-500/20`
            : `bg-white/5 border-white/10 hover:bg-white/10`
        } backdrop-blur-xl group`}
          >
            <CardHeader className="text-center">
              <motion.div
                className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-2xl flex items-center justify-center relative overflow-hidden
            bg-gradient-to-r ${platform.iconColor}`}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {platform.icon}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
              <CardTitle className="text-white text-lg sm:text-2xl font-bold mb-2">{platform.title}</CardTitle>
              <CardDescription className="text-white/70 text-sm sm:text-base">{platform.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                {platform.features.map((feature, idx) => (
                  <motion.div // Animate each feature item
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 + 0.5 }} // Staggered animation
                    viewport={{ once: true }}
                    className="flex items-center text-white/80 text-xs sm:text-sm"
                  >
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-2 sm:mr-3" />
                    {feature}
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={() => handlePlatformSelect(platform.id, platform.href)}
                className={`w-full py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300
            ${
              platform.id === selectedPlatform
                ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                : "bg-white/10 hover:bg-white/20 border border-white/20"
            } text-white flex items-center justify-center`}
                whileHover={{ scale: 1.05 }} // Added hover animation to button
                whileTap={{ scale: 0.95 }} // Added tap animation to button
              >
                Select {platform.title}
                <ArrowRight className="w-3 h-3 sm:w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
