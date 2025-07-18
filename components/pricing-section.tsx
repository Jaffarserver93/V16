"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

interface Plan {
  name: string
  price: string
  features: string[]
  isPopular?: boolean
}

const plans: Plan[] = [
  {
    name: "Basic",
    price: "$9.99/month",
    features: ["10GB SSD Storage", "1 CPU Core", "1GB RAM", "DDoS Protection", "24/7 Support"],
  },
  {
    name: "Standard",
    price: "$19.99/month",
    features: [
      "20GB SSD Storage",
      "2 CPU Cores",
      "2GB RAM",
      "Advanced DDoS Protection",
      "24/7 Priority Support",
      "Daily Backups",
    ],
    isPopular: true,
  },
  {
    name: "Premium",
    price: "$39.99/month",
    features: [
      "50GB SSD Storage",
      "4 CPU Cores",
      "4GB RAM",
      "Enterprise DDoS Protection",
      "24/7 VIP Support",
      "Daily Backups & Snapshots",
      "Dedicated IP",
    ],
  },
]

export default function PricingSection() {
  return (
    <section className="py-12 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Flexible Hosting Plans
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
            >
              <Card
                className={`bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 flex flex-col h-full ${
                  plan.isPopular ? "border-purple-500 ring-2 ring-purple-500" : ""
                }`}
              >
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-3xl font-bold mb-2">{plan.name}</CardTitle>
                  <p className="text-5xl font-extrabold text-purple-400">{plan.price}</p>
                  {plan.isPopular && (
                    <span className="mt-2 inline-block bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3 text-white/80">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-green-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-6">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
