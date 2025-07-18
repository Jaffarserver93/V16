"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface PricingPlan {
  name: string
  price: string
  features: string[]
  isPopular?: boolean
}

export default function PricingSection() {
  const minecraftPlans: PricingPlan[] = [
    {
      name: "Starter",
      price: "$5/mo",
      features: ["2GB RAM", "2 Cores CPU", "20GB SSD Storage", "Unlimited Players", "DDoS Protection", "24/7 Support"],
    },
    {
      name: "Pro",
      price: "$10/mo",
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
      price: "$20/mo",
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

  const vpsPlans: PricingPlan[] = [
    {
      name: "Basic VPS",
      price: "₹499/mo",
      features: ["1GB RAM", "1 vCPU", "25GB SSD", "1TB Bandwidth", "Root Access", "DDoS Protection"],
    },
    {
      name: "Standard VPS",
      price: "₹999/mo",
      features: ["2GB RAM", "2 vCPU", "50GB SSD", "2TB Bandwidth", "Root Access", "DDoS Protection", "Managed Backups"],
      isPopular: true,
    },
    {
      name: "Premium VPS",
      price: "₹1999/mo",
      features: [
        "4GB RAM",
        "4 vCPU",
        "100GB SSD",
        "4TB Bandwidth",
        "Root Access",
        "DDoS Protection",
        "Managed Backups",
        "Dedicated IP",
      ],
    },
  ]

  const renderPlanCard = (plan: PricingPlan, index: number) => (
    <motion.div
      key={plan.name}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {plan.isPopular && (
        <div className="absolute -top-3 right-1/2 translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
          POPULAR
        </div>
      )}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white h-full flex flex-col">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold mb-2">{plan.name}</CardTitle>
          <div className="text-5xl font-extrabold text-purple-400">{plan.price}</div>
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
          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          Flexible Hosting Plans
        </motion.h2>

        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Minecraft Hosting</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{minecraftPlans.map(renderPlanCard)}</div>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">VPS Hosting</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{vpsPlans.map(renderPlanCard)}</div>
        </div>
      </div>
    </section>
  )
}
