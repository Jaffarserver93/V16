"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gamepad, Globe, Server } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function PlatformSelector() {
  const platforms = [
    {
      name: "Minecraft Hosting",
      icon: Gamepad,
      description: "High-performance servers for your Minecraft adventures.",
      link: "/minecraft",
      color: "from-green-500 to-blue-500",
    },
    {
      name: "VPS Hosting",
      icon: Server,
      description: "Powerful virtual private servers for ultimate control.",
      link: "/vps",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Domain Registration",
      icon: Globe,
      description: "Find and register your perfect domain name.",
      link: "/domains",
      color: "from-yellow-500 to-orange-500",
    },
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    hover: { scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" },
  }

  return (
    <section className="py-12 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Choose Your Platform
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            >
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 flex flex-col items-center text-center h-full">
                <CardHeader className="pb-4">
                  <div className={`p-4 rounded-full mb-4 bg-gradient-to-br ${platform.color} shadow-lg`}>
                    <platform.icon className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{platform.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-white/70 mb-6">{platform.description}</p>
                </CardContent>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold"
                >
                  <Link href={platform.link}>Explore Plans</Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
