"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Search, CheckCircle, XCircle, ArrowRight, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DomainOrderForm from "@/components/DomainOrderForm"

interface Domain {
  name: string
  price: number
  available: boolean
}

export default function DomainsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Domain[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [selectedDomainForOrder, setSelectedDomainForOrder] = useState<Domain | null>(null)

  const domainExtensions = [
    { extension: ".com", price: 12.99 },
    { extension: ".net", price: 14.99 },
    { extension: ".org", price: 10.99 },
    { extension: ".xyz", price: 2.99 },
    { extension: ".cloud", price: 19.99 },
    { extension: ".io", price: 39.99 },
    { extension: ".dev", price: 15.99 },
    { extension: ".app", price: 17.99 },
  ]

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSearchResults([])
    setShowForm(false) // Hide form when searching

    if (!searchTerm.trim()) {
      setLoading(false)
      return
    }

    // Simulate API call for domain availability
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const baseDomain = searchTerm.toLowerCase().replace(/[^a-z0-9-]/g, "") // Sanitize input
    if (!baseDomain) {
      setLoading(false)
      return
    }

    const results: Domain[] = domainExtensions.map((ext) => {
      const fullDomain = `${baseDomain}${ext.extension}`
      // Simulate availability: some domains are taken, some are available
      const isAvailable = Math.random() > 0.3 // 70% chance of being available
      return {
        name: fullDomain,
        price: ext.price,
        available: isAvailable,
      }
    })
    setSearchResults(results)
    setLoading(false)
  }

  const handleSelectDomain = (domain: Domain) => {
    setSelectedDomainForOrder(domain)
    setShowForm(true)
  }

  if (showForm && selectedDomainForOrder) {
    return <DomainOrderForm selectedDomain={selectedDomainForOrder} onBack={() => setShowForm(false)} theme="dark" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Find Your Perfect Domain
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/80 mb-8"
        >
          Search for available domain names and register them instantly.
        </motion.p>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-12 max-w-xl mx-auto"
        >
          <Input
            type="text"
            placeholder="Enter your desired domain name (e.g., mywebsite)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-purple-500 py-3 px-4 text-base"
            required
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-lg font-semibold text-base"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="w-5 h-5 animate-spin mr-2" /> Searching...
              </span>
            ) : (
              <span className="flex items-center">
                <Search className="w-5 h-5 mr-2" /> Search Domain
              </span>
            )}
          </Button>
        </motion.form>

        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-left mb-6">Search Results for "{searchTerm}"</h2>
            <div className="space-y-4">
              {searchResults.map((domain, index) => (
                <motion.div
                  key={domain.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex flex-col sm:flex-row items-center justify-between bg-white/5 border border-white/10 rounded-lg p-4"
                >
                  <div className="flex items-center mb-2 sm:mb-0">
                    {domain.available ? (
                      <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400 mr-3" />
                    )}
                    <span className="text-lg font-semibold">{domain.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold text-purple-400">${domain.price.toFixed(2)}/year</span>
                    {domain.available ? (
                      <Button
                        onClick={() => handleSelectDomain(domain)}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center"
                      >
                        Register Now <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button disabled className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold">
                        Taken
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {loading && searchResults.length === 0 && searchTerm.trim() !== "" && (
          <div className="text-center mt-8">
            <Loader2 className="w-10 h-10 animate-spin text-purple-400 mx-auto mb-4" />
            <p className="text-lg text-white/70">Searching for domains...</p>
          </div>
        )}

        {!loading && searchResults.length === 0 && searchTerm.trim() !== "" && (
          <div className="text-center mt-8">
            <p className="text-lg text-white/70">No domains found for "{searchTerm}". Try a different name.</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Why Register with Us?</CardTitle>
            </CardHeader>
            <CardContent className="text-left text-white/80 space-y-2">
              <p>• Free WHOIS Privacy Protection</p>
              <p>• Easy DNS Management Tools</p>
              <p>• 24/7 Expert Support</p>
              <p>• Seamless Integration with Hosting</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Popular Extensions</CardTitle>
            </CardHeader>
            <CardContent className="text-left text-white/80 space-y-2">
              {domainExtensions.slice(0, 5).map((ext) => (
                <p key={ext.extension}>
                  • {ext.extension} - ${ext.price.toFixed(2)}/year
                </p>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
