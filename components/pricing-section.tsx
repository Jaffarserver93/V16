"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap, Star } from "lucide-react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface PricingSectionProps {
  selectedPlatform: string
}

const pricingData = {
  vps: [
    {
      name: "Starter VPS",
      price: "$5",
      period: "/month",
      description: "Perfect for small projects and development",
      features: ["1 vCPU Core", "1GB RAM", "25GB SSD Storage", "1TB Bandwidth", "Full Root Access"],
      popular: false,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Professional VPS",
      price: "$15",
      period: "/month",
      description: "Ideal for growing applications and websites",
      features: ["2 vCPU Cores", "4GB RAM", "80GB SSD Storage", "3TB Bandwidth", "DDoS Protection"],
      popular: true,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Enterprise VPS",
      price: "$35",
      period: "/month",
      description: "Maximum performance for demanding workloads",
      features: ["4 vCPU Cores", "8GB RAM", "160GB SSD Storage", "Unlimited Bandwidth", "Priority Support"],
      popular: false,
      color: "from-orange-500 to-red-500",
    },
  ],
  minecraft: [
    {
      name: "Creeper",
      price: "$3",
      period: "/month",
      description: "Perfect for small friend groups",
      features: ["1GB RAM", "10 Player Slots", "Plugin Support", "Automatic Backups", "Modpack Support"],
      popular: false,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Enderman",
      price: "$8",
      period: "/month",
      description: "Great for medium communities",
      features: ["3GB RAM", "25 Player Slots", "Custom JARs", "MySQL Database", "FTP Access"],
      popular: true,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Dragon",
      price: "$20",
      period: "/month",
      description: "Ultimate power for large servers",
      features: ["8GB RAM", "100 Player Slots", "Dedicated IP", "Priority Support", "Custom Plugins"],
      popular: false,
      color: "from-orange-500 to-red-500",
    },
  ],
  domains: [
    {
      name: ".com Domain",
      price: "$12",
      period: "/year",
      description: "The most popular and trusted extension",
      features: ["Free WHOIS Privacy", "DNS Management", "Email Forwarding", "24/7 Support", "Easy Transfer"],
      popular: true,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: ".net Domain",
      price: "$15",
      period: "/year",
      description: "Perfect for tech and network sites",
      features: ["Free WHOIS Privacy", "DNS Management", "Email Forwarding", "24/7 Support", "Easy Transfer"],
      popular: false,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: ".org Domain",
      price: "$14",
      period: "/year",
      description: "Ideal for organizations and nonprofits",
      features: ["Free WHOIS Privacy", "DNS Management", "Email Forwarding", "24/7 Support", "Easy Transfer"],
      popular: false,
      color: "from-purple-500 to-pink-500",
    },
  ],
}

export function PricingSection({ selectedPlatform }: PricingSectionProps) {
  const plans = pricingData[selectedPlatform as keyof typeof pricingData] || pricingData.vps

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Simple, Transparent Pricing</h2>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Choose the perfect plan for your needs. All plans include our premium features and 24/7 support.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="relative"
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}

            <Card
              className={`h-full ${
                plan.popular
                  ? "bg-gradient-to-b from-white/15 to-white/5 border-purple-500/50 shadow-2xl shadow-purple-500/20"
                  : "bg-white/5 border-white/10"
              } backdrop-blur-xl`}
            >
              <CardHeader className="text-center pb-8">
                <div
                  className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center`}
                >
                  {plan.popular ? <Crown className="w-8 h-8" /> : <Zap className="w-8 h-8" />}
                </div>
                <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-white/70 mb-4">{plan.description}</CardDescription>
                <div className="text-center">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/70">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-white/80">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Link
                  href="/minecraft"
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      : "bg-white/10 hover:bg-white/20 border border-white/20"
                  } text-white py-3 rounded-lg text-sm sm:text-base flex items-center justify-center`}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
