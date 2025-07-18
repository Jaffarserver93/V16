"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface ServerStatus {
  name: string
  status: "online" | "offline" | "loading"
  latency?: number
}

export default function ServerStatus() {
  const [serverStatuses, setServerStatuses] = useState<ServerStatus[]>([
    { name: "US East", status: "loading" },
    { name: "Europe West", status: "loading" },
    { name: "Asia Pacific", status: "loading" },
  ])

  useEffect(() => {
    const fetchStatus = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setServerStatuses([
        { name: "US East", status: "online", latency: 35 },
        { name: "Europe West", status: "online", latency: 80 },
        { name: "Asia Pacific", status: "offline" },
      ])
    }
    fetchStatus()
  }, [])

  return (
    <section className="py-12 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Global Server Status
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serverStatuses.map((server, index) => (
            <motion.div
              key={server.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-center p-6">
                <CardHeader className="flex flex-col items-center">
                  {server.status === "online" && <CheckCircle className="h-12 w-12 text-green-400 mb-4" />}
                  {server.status === "offline" && <XCircle className="h-12 w-12 text-red-400 mb-4" />}
                  {server.status === "loading" && <Loader2 className="h-12 w-12 animate-spin text-purple-400 mb-4" />}
                  <CardTitle className="text-2xl font-bold">{server.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-white/70 capitalize">Status: {server.status}</p>
                  {server.status === "online" && <p className="text-md text-white/50">Latency: {server.latency}ms</p>}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
