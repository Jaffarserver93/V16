"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Globe, Search, Shield, Zap, Crown, ArrowRight, Check } from "lucide-react"
import { EnhancedDiscordLogin } from "@/components/enhanced-discord-login"
import Link from "next/link"
import DomainOrderForm from "@/components/DomainOrderForm" // Import the new DomainOrderForm

const domainPricing = [
  {
    extension: ".com",
    price: "$12.99",
    period: "/year",
    description: "Most popular and trusted extension",
    features: ["Free WHOIS Privacy", "DNS Management", "Email Forwarding", "24/7 Support"],
    popular: true,
    color: "from-blue-500 to-cyan-500",
  },
  {
    extension: ".net",
    price: "$14.99",
    period: "/year",
    description: "Perfect for tech and network sites",
    features: ["Free WHOIS Privacy", "DNS Management", "Email Forwarding", "24/7 Support"],
    popular: false,
    color: "from-green-500 to-emerald-500",
  },
  {
    extension: ".org",
    price: "$13.99",
    period: "/year",
    description: "Ideal for organizations and nonprofits",
    features: ["Free WHOIS Privacy", "DNS Management", "Email Forwarding", "24/7 Support"],
    popular: false,
    color: "from-purple-500 to-pink-500",
  },
  {
    extension: ".io",
    price: "$39.99",
    period: "/year",
    description: "Popular choice for startups and tech",
    features: ["Free WHOIS Privacy", "DNS Management", "Email Forwarding", "24/7 Support"],
    popular: false,
    color: "from-orange-500 to-red-500",
  },
]

const popularExtensions = [
  { ext: ".com", price: "$12.99" },
  { ext: ".net", price: "$14.99" },
  { ext: ".org", price: "$13.99" },
  { ext: ".io", price: "$39.99" },
  { ext: ".co", price: "$29.99" },
  { ext: ".me", price: "$19.99" },
  { ext: ".dev", price: "$24.99" },
  { ext: ".app", price: "$19.99" },
]

export default function DomainsPage() {
  const [searchDomain, setSearchDomain] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedDomains, setSelectedDomains] = useState<any[]>([]) // Store full domain objects
  const [showForm, setShowForm] = useState(false)
  const [selectedDomainForOrder, setSelectedDomainForOrder] = useState<any>(null)

  const handleDomainSearch = async () => {
    if (!searchDomain.trim()) return

    setIsSearching(true)

    // Simulate domain search
    setTimeout(() => {
      const results = popularExtensions.map((ext) => ({
        domain: searchDomain.replace(/\.[^/.]+$/, "") + ext.ext,
        available: Math.random() > 0.3, // 70% chance of being available
        price: ext.price,
        extension: ext.ext,
      }))

      setSearchResults(results)
      setIsSearching(false)
    }, 1500)
  }

  const toggleDomainSelection = (domainResult: any) => {
    setSelectedDomains((prev) =>
      prev.some((d: any) => d.domain === domainResult.domain)
        ? prev.filter((d: any) => d.domain !== domainResult.domain)
        : [...prev, domainResult],
    )
  }

  const handleContinueToCheckout = () => {
    if (selectedDomains.length > 0) {
      setSelectedDomainForOrder(selectedDomains[0]) // For simplicity, take the first selected domain
      setShowForm(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {showForm && selectedDomainForOrder ? (
        <DomainOrderForm selectedDomain={selectedDomainForOrder} onBack={() => setShowForm(false)} theme="dark" />
      ) : (
        <>
          {/* Navigation */}
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
          >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">HostPro Domains</span>
              </Link>

              <div className="hidden md:flex items-center space-x-8">
                <Link href="/minecraft" className="text-white/80 hover:text-white transition-colors">
                  Minecraft
                </Link>
                <Link href="/vps" className="text-white/80 hover:text-white transition-colors">
                  VPS
                </Link>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </div>

              <EnhancedDiscordLogin />
            </div>
          </motion.nav>

          {/* Hero Section */}
          <section className="pt-32 pb-20 px-4">
            <div className="container mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
                  <Globe className="w-4 h-4 mr-2" />
                  Domain Registration
                </Badge>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Find Your
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {" "}
                    Perfect Domain
                  </span>
                </h1>

                <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                  Secure your online presence with premium domain names, free privacy protection, and professional DNS
                  management.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Domain Search */}
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl mb-12">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl text-center">Search for Your Domain</CardTitle>
                    <CardDescription className="text-white/70 text-center">
                      Enter your desired domain name to check availability
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Input
                          placeholder="Enter your domain name..."
                          value={searchDomain}
                          onChange={(e) => setSearchDomain(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleDomainSearch()}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 text-lg"
                        />
                      </div>
                      <Button
                        onClick={handleDomainSearch}
                        disabled={isSearching || !searchDomain.trim()}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 h-12"
                      >
                        {isSearching ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Search className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <Card className="bg-white/5 border-white/10 backdrop-blur-xl mb-12">
                    <CardHeader>
                      <CardTitle className="text-white text-xl">Search Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {searchResults.map((result, index) => (
                          <motion.div
                            key={result.domain}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-center justify-between p-4 rounded-lg border ${
                              result.available
                                ? "bg-green-500/10 border-green-500/30"
                                : "bg-red-500/10 border-red-500/30"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-3 h-3 rounded-full ${result.available ? "bg-green-400" : "bg-red-400"}`}
                              />
                              <span className="text-white font-medium">{result.domain}</span>
                              <Badge className={result.available ? "bg-green-500" : "bg-red-500"}>
                                {result.available ? "Available" : "Taken"}
                              </Badge>
                            </div>

                            {result.available && (
                              <div className="flex items-center space-x-4">
                                <span className="text-white font-bold">{result.price}/year</span>
                                <Button
                                  onClick={() => toggleDomainSelection(result)}
                                  variant={
                                    selectedDomains.some((d: any) => d.domain === result.domain) ? "default" : "outline"
                                  }
                                  className={
                                    selectedDomains.some((d: any) => d.domain === result.domain)
                                      ? "bg-purple-600 hover:bg-purple-700"
                                      : "border-white/20 text-white hover:bg-white/10"
                                  }
                                >
                                  {selectedDomains.some((d: any) => d.domain === result.domain) ? "Selected" : "Select"}
                                </Button>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>

                      {selectedDomains.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-white/10">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-white font-medium">
                                {selectedDomains.length} domain{selectedDomains.length > 1 ? "s" : ""} selected
                              </span>
                            </div>
                            <Button
                              onClick={handleContinueToCheckout}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base flex items-center justify-center"
                            >
                              Continue to Checkout
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </div>
          </section>

          {/* Domain Pricing */}
          <section className="py-20 px-4">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Domain Pricing</h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto">
                  Competitive pricing for all popular domain extensions
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {domainPricing.map((domain, index) => (
                  <motion.div
                    key={domain.extension}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="relative"
                  >
                    {domain.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1">
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <Card
                      className={`h-full ${
                        domain.popular
                          ? "bg-gradient-to-b from-white/15 to-white/5 border-purple-500/50 shadow-2xl shadow-purple-500/20"
                          : "bg-white/5 border-white/10"
                      } backdrop-blur-xl`}
                    >
                      <CardHeader className="text-center pb-8">
                        <div
                          className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${domain.color} rounded-2xl flex items-center justify-center`}
                        >
                          {domain.popular ? <Crown className="w-8 h-8" /> : <Globe className="w-8 h-8" />}
                        </div>
                        <CardTitle className="text-white text-2xl">{domain.extension}</CardTitle>
                        <CardDescription className="text-white/70 mb-4">{domain.description}</CardDescription>
                        <div className="text-center">
                          <span className="text-4xl font-bold text-white">{domain.price}</span>
                          <span className="text-white/70">{domain.period}</span>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <div className="space-y-3">
                          {domain.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-white/80">
                              <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>

                        <Button
                          className={`w-full ${
                            domain.popular
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                              : "bg-white/10 hover:bg-white/20 border border-white/20"
                          } text-white py-3`}
                          onClick={() => {
                            // Directly select this domain and show form
                            setSelectedDomainForOrder({
                              domain: `example${domain.extension}`, // Placeholder domain for direct purchase
                              available: true,
                              price: domain.price,
                              extension: domain.extension,
                            })
                            setShowForm(true)
                          }}
                        >
                          Register {domain.extension}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4">
            <div className="container mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Shield className="w-8 h-8" />,
                    title: "Free Privacy Protection",
                    description: "Keep your personal information private with free WHOIS protection",
                  },
                  {
                    icon: <Zap className="w-8 h-8" />,
                    title: "Easy DNS Management",
                    description: "Powerful DNS management tools with instant propagation",
                  },
                  {
                    icon: <Globe className="w-8 h-8" />,
                    title: "Global Network",
                    description: "Fast domain resolution with our worldwide DNS network",
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
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                          {feature.icon}
                        </div>
                        <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-white/70">{feature.description}</CardDescription>
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
