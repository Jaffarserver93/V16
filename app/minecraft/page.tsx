"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Zap, Shield, Download, Settings, Database, HardDrive, Cpu } from "lucide-react"
import { EnhancedDiscordLogin } from "@/components/enhanced-discord-login"
import Link from "next/link"
import Image from "next/image"
import MinecraftForm from "@/components/MinecraftForm"

const minecraftPlans = [
  {
    name: "Gravel",
    price: "$1",
    period: "/monthly",
    cpu: "100%",
    ram: "2 GB DDR5 ECC",
    storage: "12 GB NVMe",
    databases: "1",
    backups: "1",
    ports: "1",
    features: ["High Frequency Gaming CPU", "Premium Game Panel", "Advanced DDoS Protection"],
    popular: false,
    color: "from-gray-500 to-gray-600",
    icon: "🪨",
  },
  {
    name: "Andesite",
    price: "$2",
    period: "/monthly",
    cpu: "150%",
    ram: "3 GB DDR5 ECC",
    storage: "18 GB NVMe",
    databases: "2",
    backups: "2",
    ports: "2",
    features: ["High Frequency Gaming CPU", "Premium Game Panel", "Advanced DDoS Protection"],
    popular: false,
    color: "from-slate-500 to-slate-600",
    icon: "🗿",
  },
  {
    name: "Cobblestone",
    price: "$3",
    period: "/monthly",
    cpu: "180%",
    ram: "4 GB DDR5 ECC",
    storage: "25 GB NVMe",
    databases: "4",
    backups: "2",
    ports: "2",
    features: ["High Frequency Gaming CPU", "Premium Game Panel", "Advanced DDoS Protection"],
    popular: false,
    color: "from-stone-500 to-stone-600",
    icon: "🧱",
  },
  {
    name: "Stone",
    price: "$4",
    period: "/monthly",
    cpu: "200%",
    ram: "5 GB DDR5 ECC",
    storage: "30 GB NVMe",
    databases: "4",
    backups: "2",
    ports: "2",
    features: ["High Frequency Gaming CPU", "Premium Game Panel", "Advanced DDoS Protection"],
    popular: false,
    color: "from-gray-600 to-gray-700",
    icon: "🪨",
  },
  {
    name: "Coal",
    price: "$5",
    period: "/monthly",
    cpu: "250%",
    ram: "6 GB DDR5 ECC",
    storage: "36 GB NVMe",
    databases: "4",
    backups: "3",
    ports: "4",
    features: ["High Frequency Gaming CPU", "Premium Game Panel", "Advanced DDoS Protection"],
    popular: false,
    color: "from-black to-gray-800",
    icon: "⚫",
  },
  {
    name: "Iron",
    price: "$6",
    period: "/monthly",
    cpu: "280% (2.8 vCore)",
    ram: "7 GB DDR5 ECC",
    storage: "42 GB NVMe",
    databases: "4",
    backups: "3",
    ports: "4",
    features: ["High Frequency Gaming CPU", "Premium Game Panel", "Advanced DDoS Protection"],
    popular: true,
    color: "from-gray-400 to-gray-500",
    icon: "⚙️",
  },
  {
    name: "Diamond",
    price: "$8",
    period: "/monthly",
    cpu: "350%",
    ram: "10 GB DDR5 ECC",
    storage: "60 GB NVMe",
    databases: "6",
    backups: "4",
    ports: "5",
    features: ["High Frequency Gaming CPU", "Premium Game Panel", "Advanced DDoS Protection"],
    popular: false,
    color: "from-cyan-400 to-blue-500",
    icon: "💎",
  },
  {
    name: "Emerald",
    price: "$10",
    period: "/monthly",
    cpu: "400%",
    ram: "12 GB DDR5 ECC",
    storage: "72 GB NVMe",
    databases: "8",
    backups: "5",
    ports: "6",
    features: ["High Frequency Gaming CPU", "Premium Game Panel", "Advanced DDoS Protection"],
    popular: false,
    color: "from-emerald-400 to-green-500",
    icon: "💚",
  },
  {
    name: "Obsidian",
    price: "$15",
    period: "/monthly",
    cpu: "500%",
    ram: "18 GB DDR5 ECC",
    storage: "108 GB NVMe",
    databases: "10",
    backups: "8",
    ports: "8",
    features: ["High Frequency Gaming CPU", "Premium Game Panel", "Advanced DDoS Protection"],
    popular: false,
    color: "from-purple-600 to-indigo-700",
    icon: "🔮",
  },
  {
    name: "Bedrock",
    price: "$16",
    period: "/monthly",
    cpu: "550%",
    ram: "20 GB DDR5 ECC",
    storage: "120 GB NVMe",
    databases: "10",
    backups: "8",
    ports: "8",
    features: ["High Frequency Gaming CPU", "Premium Game Panel", "Advanced DDoS Protection"],
    popular: false,
    color: "from-stone-600 to-stone-800",
    icon: "🏔️",
  },
  {
    name: "Beacon",
    price: "$18",
    period: "/monthly",
    cpu: "600%",
    ram: "24 GB DDR5 ECC",
    storage: "135 GB NVMe",
    databases: "12",
    backups: "8",
    ports: "8",
    features: ["High Frequency Gaming CPU", "Premium Game Panel", "Advanced DDoS Protection"],
    popular: false,
    color: "from-yellow-400 to-orange-500",
    icon: "🔆",
  },
  {
    name: "Thunder",
    price: "$20",
    period: "/monthly",
    cpu: "650%",
    ram: "28 GB DDR5 ECC",
    storage: "145 GB NVMe",
    databases: "12",
    backups: "8",
    ports: "8",
    features: ["High Frequency Gaming CPU", "Premium Game Panel", "Advanced DDoS Protection"],
    popular: false,
    color: "from-blue-500 to-purple-600",
    icon: "⚡",
  },
  {
    name: "Crystal",
    price: "$23",
    period: "/monthly",
    cpu: "No CPU Limit",
    ram: "32 GB DDR5 ECC",
    storage: "160 GB NVMe",
    databases: "14",
    backups: "8",
    ports: "8",
    features: ["High Frequency Gaming CPU", "Premium Game Panel", "Advanced DDoS Protection"],
    popular: false,
    color: "from-pink-400 to-rose-500",
    icon: "💎",
  },
  {
    name: "Barrier",
    price: "$26",
    period: "/monthly",
    cpu: "No CPU Limit",
    ram: "48 GB DDR5 ECC",
    storage: "Unlimited NVMe SSD",
    databases: "15",
    backups: "10",
    ports: "10",
    features: ["High Frequency Gaming CPU", "Premium Game Panel", "Advanced DDoS Protection"],
    popular: false,
    color: "from-indigo-500 to-purple-700",
    icon: "🛡️",
  },
  {
    name: "Ruby",
    price: "$32",
    period: "/monthly",
    cpu: "No CPU Limit",
    ram: "64 GB DDR5 ECC",
    storage: "Unlimited NVMe SSD",
    databases: "15",
    backups: "10",
    ports: "10",
    features: ["High Frequency Gaming CPU", "Premium Game Panel", "Advanced DDoS Protection"],
    popular: false,
    color: "from-red-500 to-pink-600",
    icon: "💎",
  },
]

const modpacks = ["Vanilla", "Forge", "Fabric", "Paper", "Spigot", "Bukkit", "Purpur", "Quilt"]
const locations = ["New York, USA", "Los Angeles, USA", "London, UK", "Frankfurt, Germany", "Singapore", "Tokyo, Japan"]
const versions = ["1.20.4", "1.20.1", "1.19.4", "1.19.2", "1.18.2", "1.17.1", "1.16.5"]

export default function MinecraftPage() {
  const [selectedPlan, setSelectedPlan] = useState("Iron")
  const [serverName, setServerName] = useState("")
  const [selectedModpack, setSelectedModpack] = useState("Paper")
  const [selectedLocation, setSelectedLocation] = useState("New York, USA")
  const [selectedVersion, setSelectedVersion] = useState("1.20.4")
  const [maxPlayers, setMaxPlayers] = useState("20")
  const [serverDescription, setServerDescription] = useState("")
  const [enableWhitelist, setEnableWhitelist] = useState(false)
  const [enablePvp, setEnablePvp] = useState(true)
  const [difficulty, setDifficulty] = useState("normal")

  const [showForm, setShowForm] = useState(false)
  const [selectedAddons, setSelectedAddons] = useState({ units: 0, backups: 0 })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      {showForm ? (
        <MinecraftForm
          selectedPlan={{
            ...minecraftPlans.find((p) => p.name === selectedPlan),
            addons: { unit: "$5", backup: "$3" },
          }}
          selectedAddons={selectedAddons}
          onBack={() => setShowForm(false)}
          theme="dark"
        />
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
                <span className="text-lg sm:text-xl font-bold text-white">JXFRCloud™ Minecraft</span>
              </Link>

              <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                <Link href="/vps" className="text-white/80 hover:text-white transition-colors">
                  VPS
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
                <Badge className="mb-4 sm:mb-6 bg-green-500/20 text-green-300 border-green-500/30 text-xs sm:text-sm">
                  <Gamepad2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Minecraft Hosting
                </Badge>

                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
                  Build Your
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {" "}
                    Minecraft World
                  </span>
                </h1>

                <p className="text-base sm:text-xl text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  Premium Minecraft server hosting with instant setup, mod support, and 24/7 uptime guarantee.
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
                    icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
                    title: "Instant Setup",
                    description: "Server ready in under 60 seconds",
                  },
                  {
                    icon: <Download className="w-6 h-6 sm:w-8 sm:h-8" />,
                    title: "1-Click Modpacks",
                    description: "Install popular modpacks instantly",
                  },
                  {
                    icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
                    title: "DDoS Protection",
                    description: "Enterprise-grade security included",
                  },
                  {
                    icon: <Settings className="w-6 h-6 sm:w-8 sm:h-8" />,
                    title: "Full Control",
                    description: "Complete server management access",
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
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
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
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
                  Minecraft Hosting Plans
                </h2>
                <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto px-4">
                  Choose from our extensive range of Minecraft hosting plans with high-frequency gaming CPUs
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
                {minecraftPlans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: (index % 12) * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="relative"
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 sm:px-3 py-1 text-xs">
                          Popular
                        </Badge>
                      </div>
                    )}

                    <Card
                      className={`h-full cursor-pointer transition-all duration-300 ${
                        selectedPlan === plan.name
                          ? "bg-white/10 border-green-500/50 shadow-2xl shadow-green-500/20"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      } backdrop-blur-xl`}
                      onClick={() => setSelectedPlan(plan.name)}
                    >
                      <CardHeader className="text-center pb-3 sm:pb-4">
                        <div
                          className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center text-lg sm:text-2xl`}
                        >
                          {plan.icon}
                        </div>
                        <CardTitle className="text-white text-lg sm:text-xl">{plan.name}</CardTitle>
                        <div className="text-center">
                          <span className="text-2xl sm:text-3xl font-bold text-white">{plan.price}</span>
                          <span className="text-white/70 text-xs sm:text-sm">{plan.period}</span>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-3 sm:space-y-4">
                        {/* Specifications Grid */}
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <div className="flex items-center text-white/70">
                              <Cpu className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              CPU
                            </div>
                            <span className="text-white font-medium text-xs sm:text-sm">{plan.cpu}</span>
                          </div>

                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <div className="flex items-center text-white/70">
                              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              RAM
                            </div>
                            <span className="text-white font-medium text-xs sm:text-sm">{plan.ram}</span>
                          </div>

                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <div className="flex items-center text-white/70">
                              <HardDrive className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              Storage
                            </div>
                            <span className="text-white font-medium text-xs sm:text-sm">{plan.storage}</span>
                          </div>

                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <div className="flex items-center text-white/70">
                              <Database className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              Databases
                            </div>
                            <span className="text-white font-medium text-xs sm:text-sm">{plan.databases}</span>
                          </div>

                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <div className="flex items-center text-white/70">
                              <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              Backups
                            </div>
                            <span className="text-white font-medium text-xs sm:text-sm">{plan.backups}</span>
                          </div>

                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <div className="flex items-center text-white/70">
                              <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              Ports
                            </div>
                            <span className="text-white font-medium text-xs sm:text-sm">{plan.ports}</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/10">
                          <div className="space-y-1 sm:space-y-2">
                            {plan.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center text-white/80 text-xs">
                                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-400 rounded-full mr-2" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button
                          onClick={() => {
                            setSelectedPlan(plan.name)
                            if (selectedPlan === plan.name) {
                              // Add addons structure to the plan
                              const planWithAddons = {
                                ...plan,
                                addons: {
                                  unit: "$5",
                                  backup: "$3",
                                },
                              }
                              setShowForm(true)
                            }
                          }}
                          className={`w-full ${
                            selectedPlan === plan.name
                              ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                              : "bg-white/10 hover:bg-white/20 border border-white/20"
                          } text-white py-2 text-xs sm:text-sm`}
                        >
                          {selectedPlan === plan.name ? "Continue to Order" : `Select ${plan.name}`}
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
