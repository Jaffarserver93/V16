"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import PlatformSelector from "@/components/platform-selector"
import PricingSection from "@/components/pricing-section"
import StatsSection from "@/components/stats-section"
import ServerStatus from "@/components/server-status"
import { useRef } from "react"
import FirestoreTest from "@/components/firestore-test"

export default function HomePage() {
  const platformSelectorRef = useRef<HTMLDivElement>(null)

  const scrollToPlatformSelector = () => {
    platformSelectorRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-purple-900/70 to-slate-900/70"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            Unleash Your Digital Potential
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Experience unparalleled performance and reliability with our premium hosting solutions for Minecraft, VPS,
            and Domains.
          </p>
          <Button
            onClick={scrollToPlatformSelector}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-4 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            Get Started Free
          </Button>
        </motion.div>
      </section>

      {/* Platform Selector Section */}
      <div ref={platformSelectorRef}>
        <PlatformSelector />
      </div>

      {/* Pricing Section */}
      <PricingSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Server Status Section */}
      <ServerStatus />

      {/* Firestore Test Section */}
      <FirestoreTest />

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-slate-900 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6"
          >
            Ready to Elevate Your Hosting?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/80 mb-10 max-w-2xl mx-auto"
          >
            Join thousands of satisfied customers and experience the difference of truly premium hosting.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/signup" passHref>
              <Button className="bg-white text-purple-800 hover:bg-gray-200 text-lg px-8 py-4 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105">
                Sign Up Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-8 text-white/70 text-center text-sm">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Premium Hosting. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
