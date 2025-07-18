"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Users, ArrowRight, Sparkles, Crown, Rocket } from "lucide-react"
import { EnhancedDiscordLogin } from "@/components/enhanced-discord-login"
import { PlatformSelector } from "@/components/platform-selector"
import { PricingSection } from "@/components/pricing-section"
import { StatsSection } from "@/components/stats-section"
import { ServerStatus } from "@/components/server-status"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState("vps")
  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleGetStartedClick = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <motion.div className="flex items-center space-x-2 sm:space-x-3" whileHover={{ scale: 1.05 }}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center p-1">
              <Image
                src="/logo.webp"
                alt="JXFRCloud Logo"
                width={32}
                height={32}
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">JXFRCloud™</span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="#services" className="text-white/80 hover:text-white transition-colors">
              Services
            </Link>
            <Link href="#pricing" className="text-white/80 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-white/80 hover:text-white transition-colors">
              About
            </Link>
          </div>

          <div className="scale-75 sm:scale-100">
            <EnhancedDiscordLogin />
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Badge className="mb-4 sm:mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs sm:text-sm">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Premium Hosting Solutions
            </Badge>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
              Power Your
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Digital Empire
              </span>
            </h1>

            <p className="text-base sm:text-xl text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Experience lightning-fast VPS hosting, premium domains, and Minecraft servers with enterprise-grade
              security and 24/7 support.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                onClick={handleGetStartedClick}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base"
              >
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Get Started Free
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>

              <Link href="#pricing" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-6 sm:px-8 py-3 rounded-full bg-transparent text-sm sm:text-base"
                >
                  View Pricing
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-purple-400 rounded-full"
                initial={{
                  x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                  y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
                  opacity: 0,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Platform Selection */}
      <section id="services" ref={servicesRef} className="py-16 sm:py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
              Choose Your Platform
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto px-4">
              Select from our premium hosting solutions designed for performance and reliability
            </p>
          </motion.div>

          <PlatformSelector selectedPlatform={selectedPlatform} onPlatformChange={setSelectedPlatform} />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-20 px-4">
        <PricingSection selectedPlatform="minecraft" />
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
              Why Choose JXFRCloud™?
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Lightning Fast",
                description: "NVMe SSD storage and premium network infrastructure for maximum performance",
              },
              {
                icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Enterprise Security",
                description: "Advanced DDoS protection and security monitoring to keep your data safe",
              },
              {
                icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "24/7 Support",
                description: "Expert support team available around the clock via Discord and tickets",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl h-full">
                  <CardHeader>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-white text-lg sm:text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/70 text-sm sm:text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Server Status Section */}
      <ServerStatus />

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-3xl p-8 sm:p-12 backdrop-blur-xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Join thousands of satisfied customers and experience premium hosting today
            </p>
            <Link href="/minecraft">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg"
              >
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Start Your Journey
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 border-t border-white/10">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center p-1">
              <Image
                src="/logo.webp"
                alt="JXFRCloud Logo"
                width={32}
                height={32}
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">JXFRCloud™</span>
          </div>
          <p className="text-white/50 text-sm sm:text-base">© 2024 JXFRCloud™. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
