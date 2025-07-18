"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface ServerStatus {
  name: string
  status: "online" | "offline" | "maintenance" | "loading"
  location: string
  uptime?: string
  latency?: string
}

export default function ServerStatusSection() {
  const [serverStatuses, setServerStatuses] = useState<ServerStatus[]>([
    { name: "US East - Virginia", status: "loading", location: "Virginia, USA" },
    { name: "Europe - Frankfurt", status: "loading", location: "Frankfurt, Germany" },
    { name: "Asia - Singapore", status: "loading", location: "Singapore" },
    { name: "US West - California", status: "loading", location: "California, USA" },
  ])

  useEffect(() => {
    const fetchStatuses = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const updatedStatuses: ServerStatus[] = serverStatuses.map((server) => {
        const randomStatus = Math.random()
        let status: "online" | "offline" | "maintenance" = "online"
        let uptime = "99.9%"
        let latency = `${Math.floor(Math.random() * 50) + 20}ms` // 20-70ms

        if (randomStatus < 0.1) {
          status = "offline"
          uptime = "0%"
          latency = "N/A"
        } else if (randomStatus < 0.2) {
          status = "maintenance"
          uptime = "N/A"
          latency = "N/A"
        }

        return { ...server, status, uptime, latency }
      })
      setServerStatuses(updatedStatuses)
    }

    fetchStatuses()
    const interval = setInterval(fetchStatuses, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: ServerStatus["status"]) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "offline":
        return <XCircle className="h-6 w-6 text-red-500" />
      case "maintenance":
        return <AlertCircle className="h-6 w-6 text-yellow-500" />
      case "loading":
        return <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: ServerStatus["status"]) => {
    switch (status) {
      case "online":
        return "Operational"
      case "offline":
        return "Offline"
      case "maintenance":
        return "Maintenance"
      case "loading":
        return "Loading..."
      default:
        return ""
    }
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          Global Server Status
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serverStatuses.map((server, index) => (
            <motion.div
              key={server.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold">{server.name}</CardTitle>
                  {getStatusIcon(server.status)}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/70 mb-2">{server.location}</p>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium">Status:</span>
                    <span
                      className={`text-sm font-bold ${
                        server.status === "online"
                          ? "text-green-400"
                          : server.status === "offline"
                            ? "text-red-400"
                            : server.status === "maintenance"
                              ? "text-yellow-400"
                              : "text-blue-400"
                      }`}
                    >
                      {getStatusText(server.status)}
                    </span>
                  </div>
                  {server.uptime && (
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium">Uptime:</span>
                      <span className="text-sm text-white/70">{server.uptime}</span>
                    </div>
                  )}
                  {server.latency && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Latency:</span>
                      <span className="text-sm text-white/70">{server.latency}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
