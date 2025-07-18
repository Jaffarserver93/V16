"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Wifi, Database } from "lucide-react"

interface ServerStatus {
  name: string
  status: "online" | "maintenance" | "offline"
  uptime: string
  ping: number
  load: number
}

const mockServerData: ServerStatus[] = [
  { name: "US East", status: "online", uptime: "99.9%", ping: 12, load: 45 },
  { name: "US West", status: "online", uptime: "99.8%", ping: 8, load: 32 },
  { name: "Europe", status: "online", uptime: "99.9%", ping: 15, load: 28 },
  { name: "Asia Pacific", status: "maintenance", uptime: "99.7%", ping: 25, load: 0 },
]

export function ServerStatus() {
  const [servers, setServers] = useState<ServerStatus[]>(mockServerData)

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setServers((prev) =>
        prev.map((server) => ({
          ...server,
          ping: server.status === "online" ? Math.floor(Math.random() * 20) + 5 : 0,
          load: server.status === "online" ? Math.floor(Math.random() * 60) + 20 : 0,
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "maintenance":
        return "bg-yellow-500"
      case "offline":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Online"
      case "maintenance":
        return "Maintenance"
      case "offline":
        return "Offline"
      default:
        return "Unknown"
    }
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Server Status</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Real-time monitoring of our global infrastructure</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servers.map((server, index) => (
            <motion.div
              key={server.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{server.name}</CardTitle>
                    <Badge className={`${getStatusColor(server.status)} text-white border-0`}>
                      {getStatusText(server.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-white/70">
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 mr-2" />
                      Uptime
                    </div>
                    <span className="text-white font-medium">{server.uptime}</span>
                  </div>

                  <div className="flex items-center justify-between text-white/70">
                    <div className="flex items-center">
                      <Wifi className="w-4 h-4 mr-2" />
                      Ping
                    </div>
                    <span className="text-white font-medium">{server.ping}ms</span>
                  </div>

                  <div className="flex items-center justify-between text-white/70">
                    <div className="flex items-center">
                      <Database className="w-4 h-4 mr-2" />
                      Load
                    </div>
                    <span className="text-white font-medium">{server.load}%</span>
                  </div>

                  {server.status === "online" && (
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${100 - server.load}%` }}
                      />
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
