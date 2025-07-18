"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle, XCircle, ArrowLeft, Loader2 } from "lucide-react"
import DomainOrderForm from "@/components/DomainOrderForm" // Import the new form

interface Domain {
  name: string
  price: number
  available: boolean
}

export default function DomainsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Domain[]>([])
  const [loading, setLoading] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [selectedDomainForOrder, setSelectedDomainForOrder] = useState<Domain | null>(null)

  const handleSearch = async () => {
    setLoading(true)
    setSearchPerformed(true)
    setSearchResults([]) // Clear previous results
    setShowForm(false) // Hide form on new search
    setSelectedDomainForOrder(null) // Clear selected domain

    // Simulate API call for domain availability
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockDomains: Domain[] = [
      { name: `${searchTerm}.com`, price: 12.99, available: true },
      { name: `${searchTerm}.net`, price: 10.49, available: Math.random() > 0.5 },
      { name: `${searchTerm}.org`, price: 9.99, available: Math.random() > 0.5 },
      { name: `${searchTerm}.io`, price: 39.99, available: Math.random() > 0.7 },
      { name: `${searchTerm}.xyz`, price: 2.99, available: true },
    ]

    setSearchResults(mockDomains)
    setLoading(false)
  }

  const handleRegisterClick = (domain: Domain) => {
    setSelectedDomainForOrder(domain)
    setShowForm(true)
  }

  if (showForm && selectedDomainForOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 sm:p-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Button
              variant="ghost"
              onClick={() => setShowForm(false)}
              className="text-white/70 hover:text-white flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search Results
            </Button>
          </motion.div>
          <DomainOrderForm domain={selectedDomainForOrder} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-8"
        >
          Find Your Perfect Domain
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="Enter your desired domain name (e.g., myawesomeproject)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-purple-500"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
              }}
            />
            <Button
              onClick={handleSearch}
              disabled={loading || searchTerm.trim() === ""}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Search className="w-5 h-5 mr-2" />}
              Search Domains
            </Button>
          </div>
        </motion.div>

        {searchPerformed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Search Results</h2>
            {loading ? (
              <div className="text-center py-10">
                <Loader2 className="w-10 h-10 animate-spin text-purple-500 mx-auto mb-4" />
                <p className="text-white/70">Searching for domains...</p>
              </div>
            ) : searchResults.length === 0 ? (
              <p className="text-white/70 text-center">No domains found for "{searchTerm}". Try a different name.</p>
            ) : (
              <div className="space-y-4">
                {searchResults.map((domain) => (
                  <Card key={domain.name} className="bg-white/5 border-white/10 flex items-center justify-between p-4">
                    <CardContent className="flex items-center p-0">
                      {domain.available ? (
                        <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-400 mr-3" />
                      )}
                      <div>
                        <CardTitle className="text-lg font-semibold text-white">{domain.name}</CardTitle>
                        <p className="text-white/70 text-sm">{domain.available ? "Available" : "Not Available"}</p>
                      </div>
                    </CardContent>
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-bold text-white">${domain.price.toFixed(2)}</span>
                      <Button
                        disabled={!domain.available}
                        onClick={() => handleRegisterClick(domain)}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        {domain.available ? "Register Now" : "Unavailable"}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
