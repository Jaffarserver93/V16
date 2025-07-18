"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Server, Globe, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export default function StatsSection() {
  const stats = [
    {
      title: "Active Users",
      value: "1,234",
      description: "+15% from last month",
      icon: <Users className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Servers Hosted",
      value: "567",
      description: "+8% from last month",
      icon: <Server className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Domains Registered",
      value: "890",
      description: "+12% from last month",
      icon: <Globe className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Uptime",
      value: "99.9%",
      description: "Industry leading reliability",
      icon: <TrendingUp className="h-5 w-5 text-pink-500" />,
    },
  ]

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          Our Performance at a Glance
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{stat.value}</div>
                  <p className="text-xs text-white/70">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
