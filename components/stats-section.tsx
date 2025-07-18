"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ShoppingCart, Server } from "lucide-react"
import { motion } from "framer-motion"

export default function StatsSection() {
  return (
    <section className="py-12 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Our Achievements
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-center p-6">
              <CardHeader className="flex flex-col items-center">
                <Users className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-3xl font-bold">10,000+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-white/70">Happy Customers</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-center p-6">
              <CardHeader className="flex flex-col items-center">
                <ShoppingCart className="h-12 w-12 text-pink-400 mb-4" />
                <CardTitle className="text-3xl font-bold">50,000+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-white/70">Orders Processed</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-center p-6">
              <CardHeader className="flex flex-col items-center">
                <Server className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-3xl font-bold">99.9%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-white/70">Uptime Guarantee</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
