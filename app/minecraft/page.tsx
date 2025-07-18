"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import MinecraftForm from "@/components/MinecraftForm"

interface MinecraftPlan {
  name: string
  price: number
  ram: string
  cpu: string
  storage: string
  players: string
  features: string[]
  isPopular?: boolean
}

export default function MinecraftPage() {
  const [showForm, setShowForm] = useState(false)
  const [selectedPlanForOrder, setSelectedPlanForOrder] = useState<MinecraftPlan | null>(null)

  const minecraftPlans: MinecraftPlan[] = [
    {
      name: "Starter",
      price: 5,
      ram: "2GB",
      cpu: "2 Cores",
      storage: "20GB SSD",
      players: "Unlimited",
      features: ["2GB RAM", "2 Cores CPU", "20GB SSD Storage", "Unlimited Players", "DDoS Protection", "24/7 Support"],
    },
    {
      name: "Pro",
      price: 10,
      ram: "4GB",
      cpu: "4 Cores",
      storage: "40GB SSD",
      players: "Unlimited",
      features: [
        "4GB RAM",
        "4 Cores CPU",
        "40GB SSD Storage",
        "Unlimited Players",
        "DDoS Protection",
        "24/7 Support",
        "Free Modpack Installation",
      ],
      isPopular: true,
    },
    {
      name: "Ultimate",
      price: 20,
      ram: "8GB",
      cpu: "6 Cores",
      storage: "80GB SSD",
      players: "Unlimited",
      features: [
        "8GB RAM",
        "6 Cores CPU",
        "80GB SSD Storage",
        "Unlimited Players",
        "DDoS Protection",
        "24/7 Support",
        "Free Modpack Installation",
        "Dedicated IP",
      ],
    },
  ]

  const handleSelectPlan = (plan: MinecraftPlan) => {
    setSelectedPlanForOrder(plan)
    setShowForm(true)
  }

  if (showForm && selectedPlanForOrder) {
    return <MinecraftForm plan={selectedPlanForOrder} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Minecraft Hosting Plans
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/80 mb-12"
        >
          Experience lag-free Minecraft with our powerful and reliable servers.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {minecraftPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {plan.isPopular && (
                <div className="absolute -top-3 right-1/2 translate-x-1/2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                  MOST POPULAR
                </div>
              )}
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white h-full flex flex-col">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-3xl font-bold mb-2">{plan.name}</CardTitle>
                  <div className="text-5xl font-extrabold text-green-400">${plan.price}</div>
                  <p className="text-sm text-white/70">per month</p>
                </CardHeader>
                <CardContent className="flex-1 py-4">
                  <ul className="space-y-2 text-left">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-white/90">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button
                    onClick={() => handleSelectPlan(plan)}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold"
                  >
                    Select Plan <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-4">Need a Custom Plan?</h2>
          <p className="text-lg text-white/80 mb-6">
            Contact our sales team for tailored solutions to meet your specific needs.
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-8 rounded-lg font-semibold">
            Contact Sales
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
