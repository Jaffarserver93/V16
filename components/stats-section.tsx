"use client"

import { motion } from "framer-motion"
import { Users, Server, Globe, Shield } from "lucide-react"

const stats = [
  {
    icon: <Users className="w-8 h-8" />,
    value: "50K+",
    label: "Happy Customers",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Server className="w-8 h-8" />,
    value: "99.9%",
    label: "Uptime Guarantee",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    value: "15+",
    label: "Global Locations",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    value: "24/7",
    label: "Security Monitoring",
    color: "from-orange-500 to-red-500",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center`}
              >
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
