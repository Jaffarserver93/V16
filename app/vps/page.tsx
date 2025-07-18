"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, Cpu, HardDrive, Wifi, Shield, Crown } from "lucide-react"
import { EnhancedDiscordLogin } from "@/components/enhanced-discord-login"
import Link from "next/link"
import Image from "next/image"
import VPSOrderForm from "@/components/VPSOrderForm" // Import the new VPSOrderForm

const vpsPlans = [
  {
    name: "India - Xeon Budget S",
    price: "$6.00",
    period: "/monthly",
    cpu: "2 vCores",
    ram: "8 GB DDR4 ECC",
    storage: "80 GB NVMe SSD",
    bandwidth: "Unmetered (1 Gbps)",
    processor: "Intel Xeon E5-2682 v4",
    network: "Located in Delhi, IN",
    features: ["Advance DDoS Protection", "Full Root Access", "99.9% Uptime", "24/7 Support"],
    popular: false,
    color: "from-red-500 to-orange-500",
    priceUSD: "$0.07/hr",
  },
  {
    name: "India - Xeon Budget M",
    price: "$10.00",
    period: "/monthly",
    cpu: "4 vCores",
    ram: "16 GB DDR4 ECC",
    storage: "150 GB NVMe SSD",
    bandwidth: "Unmetered (1 Gbps)",
    processor: "Intel Xeon E5-2682 v4",
    network: "Located in Delhi, IN",
    features: ["Advance DDoS Protection", "Full Root Access", "99.9% Uptime", "24/7 Support"],
    popular: false,
    color: "from-red-500 to-orange-500",
    priceUSD: "$0.14/hr",
  },
  {
    name: "India - Xeon Budget L",
    price: "$14.00",
    period: "/monthly",
    cpu: "6 vCores",
    ram: "32 GB DDR4 ECC",
    storage: "300 GB NVMe SSD",
    bandwidth: "Unmetered (1 Gbps)",
    processor: "Intel Xeon E5-2682 v4",
    network: "Located in Delhi, IN",
    features: ["Advance DDoS Protection", "Full Root Access", "99.9% Uptime", "24/7 Support"],
    popular: false,
    color: "from-red-500 to-orange-500",
    priceUSD: "$0.19/hr",
  },
  {
    name: "India - Xeon Budget XL",
    price: "$22.00",
    period: "/monthly",
    cpu: "8 vCores",
    ram: "64 GB DDR4 ECC",
    storage: "400 GB NVMe SSD",
    bandwidth: "Unmetered (1 Gbps)",
    processor: "Intel Xeon E5-2682 v4",
    network: "Located in Delhi, IN",
    features: ["Advance DDoS Protection", "Full Root Access", "99.9% Uptime", "24/7 Support"],
    popular: false,
    color: "from-red-500 to-orange-500",
    priceUSD: "$0.30/hr",
  },
]

const operatingSystems = [
  { name: "Ubuntu 22.04 LTS", icon: "🐧" },
  { name: "Ubuntu 20.04 LTS", icon: "🐧" },
  { name: "CentOS 8", icon: "🔴" },
  { name: "Debian 11", icon: "🌀" },
  { name: "Windows Server 2022", icon: "🪟" },
  { name: "Windows Server 2019", icon: "🪟" },
  { name: "Fedora 38", icon: "🎩" },
  { name: "Rocky Linux 9", icon: "🏔️" },
]

const locations = [
  { name: "New York, USA", flag: "🇺🇸" },
  { name: "Los Angeles, USA", flag: "🇺🇸" },
  { name: "London, UK", flag: "🇬🇧" },
  { name: "Frankfurt, Germany", flag: "🇩🇪" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Tokyo, Japan", flag: "🇯🇵" },
  { name: "Sydney, Australia", flag: "🇦🇺" },
  { name: "Toronto, Canada", flag: "🇨🇦" },
]

const applications = [
  "None (Clean Install)",
  "Docker",
  "LAMP Stack",
  "LEMP Stack",
  "Node.js",
  "WordPress",
  "Minecraft Server",
  "Game Panel",
]

export default function VPSPage() {
  const [selectedPlanName, setSelectedPlanName] = useState("India - Xeon Budget S")
  const [showForm, setShowForm] = useState(false)

  const selectedPlan = vpsPlans.find((plan) => plan.name === selectedPlanName)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {showForm && selectedPlan ? (
        <VPSOrderForm selectedPlan={selectedPlan} onBack={() => setShowForm(false)} theme="dark" />
      ) : (
        <>
          {/* Navigation */}
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
          >
            <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center p-1">
                  <Image
                    src="/logo.webp"
                    alt="JXFRCloud Logo"
                    width={32}
                    height={32}
                    className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                  />
                </div>
                <span className="text-lg sm:text-xl font-bold text-white">JXFRCloud™ VPS</span>
              </Link>

              <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                <Link href="/minecraft" className="text-white/80 hover:text-white transition-colors">
                  Minecraft
                </Link>
                <Link href="/domains" className="text-white/80 hover:text-white transition-colors">
                  Domains
                </Link>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  Home
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
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <Badge className="mb-4 sm:mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs sm:text-sm">
                  <Server className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  VPS Hosting
                </Badge>

                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
                  Powerful
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {" "}
                    VPS Hosting
                  </span>
                </h1>

                <p className="text-base sm:text-xl text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  High-performance virtual private servers with full root access, SSD storage, and enterprise-grade
                  infrastructure.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 sm:py-20 px-4">
            <div className="container mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-16 sm:mb-20">
                {[
                  {
                    icon: <Cpu className="w-6 h-6 sm:w-8 sm:h-8" />,
                    title: "High Performance",
                    description: "Latest Intel/AMD processors",
                  },
                  {
                    icon: <HardDrive className="w-6 h-6 sm:w-8 sm:h-8" />,
                    title: "NVMe SSD Storage",
                    description: "Ultra-fast storage performance",
                  },
                  {
                    icon: <Wifi className="w-6 h-6 sm:w-8 sm:h-8" />,
                    title: "Premium Network",
                    description: "1Gbps connection guaranteed",
                  },
                  {
                    icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
                    title: "Enterprise Security",
                    description: "Advanced DDoS protection",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-white text-sm sm:text-xl font-semibold mb-1 sm:mb-2">{feature.title}</h3>
                    <p className="text-white/70 text-xs sm:text-base">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Plans */}
          <section className="py-16 sm:py-20 px-4">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12 sm:mb-16"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">VPS Plans</h2>
                <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto px-4">
                  Scalable virtual private servers for every need
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
                {vpsPlans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="relative"
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 sm:px-4 py-1 text-xs sm:text-sm">
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <Card
                      className={`h-full cursor-pointer transition-all duration-300 ${
                        selectedPlanName === plan.name
                          ? "bg-white/10 border-blue-500/50 shadow-2xl shadow-blue-500/20"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      } backdrop-blur-xl`}
                      onClick={() => setSelectedPlanName(plan.name)}
                    >
                      <CardHeader className="text-center pb-6 sm:pb-8">
                        <div
                          className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center`}
                        >
                          {plan.popular ? (
                            <Crown className="w-6 h-6 sm:w-8 sm:h-8" />
                          ) : (
                            <Server className="w-6 h-6 sm:w-8 sm:h-8" />
                          )}
                        </div>
                        <CardTitle className="text-white text-xl sm:text-2xl">{plan.name}</CardTitle>
                        <div className="text-center">
                          <span className="text-3xl sm:text-4xl font-bold text-white">{plan.price}</span>
                          <span className="text-white/70 text-sm sm:text-base">{plan.period}</span>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                          <div>
                            <div className="text-base sm:text-lg font-bold text-white">{plan.cpu}</div>
                            <div className="text-white/70 text-xs sm:text-sm">CPU</div>
                          </div>
                          <div>
                            <div className="text-base sm:text-lg font-bold text-white">{plan.ram}</div>
                            <div className="text-white/70 text-xs sm:text-sm">RAM</div>
                          </div>
                          <div>
                            <div className="text-base sm:text-lg font-bold text-white">{plan.storage}</div>
                            <div className="text-white/70 text-xs sm:text-sm">Storage</div>
                          </div>
                          <div>
                            <div className="text-base sm:text-lg font-bold text-white">{plan.bandwidth}</div>
                            <div className="text-white/70 text-xs sm:text-sm">Bandwidth</div>
                          </div>
                          {plan.processor && (
                            <div className="col-span-2">
                              <div className="text-base sm:text-lg font-bold text-white">{plan.processor}</div>
                              <div className="text-white/70 text-xs sm:text-sm">Processor</div>
                            </div>
                          )}
                          {plan.network && (
                            <div className="col-span-2">
                              <div className="text-base sm:text-lg font-bold text-white">{plan.network}</div>
                              <div className="text-white/70 text-xs sm:text-sm">Network</div>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                          {plan.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-white/80 text-xs sm:text-sm">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full mr-2 sm:mr-3" />
                              {feature}
                            </div>
                          ))}
                        </div>

                        <Button
                          onClick={() => {
                            setSelectedPlanName(plan.name)
                            setShowForm(true)
                          }}
                          className={`w-full ${
                            selectedPlanName === plan.name
                              ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                              : "bg-white/10 hover:bg-white/20 border border-white/20"
                          } text-white py-2 sm:py-3 text-sm sm:text-base`}
                        >
                          Select {plan.name}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
