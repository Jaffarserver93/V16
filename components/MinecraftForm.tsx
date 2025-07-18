"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle } from "lucide-react"
import { authManager, superDatabase, type Coupon } from "@/utils/database" // Import Coupon type
import { useToast } from "@/hooks/use-toast"

interface MinecraftPlan {
  name: string
  price: number
  ram: string
  players: string
}

interface MinecraftFormProps {
  plan: MinecraftPlan
}

export default function MinecraftForm({ plan }: MinecraftFormProps) {
  const { toast } = useToast()
  const [firstName, setFirstName] = useState(authManager.getFirstName())
  const [lastName, setLastName] = useState(authManager.getLastName())
  const [email, setEmail] = useState(authManager.getEmail())
  const [serverName, setServerName] = useState("")
  const [serverLocation, setServerLocation] = useState("")
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
  const [couponLoading, setCouponLoading] = useState(false)
  const [couponError, setCouponError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const basePrice = plan.price
  let finalPrice = basePrice

  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      finalPrice = basePrice * (1 - appliedCoupon.discountValue / 100)
    } else {
      finalPrice = basePrice - appliedCoupon.discountValue
    }
    if (finalPrice < 0) finalPrice = 0 // Ensure price doesn't go negative
  }

  const handleApplyCoupon = async () => {
    setCouponLoading(true)
    setCouponError(null)
    setAppliedCoupon(null)

    if (!couponCode) {
      setCouponError("Please enter a coupon code.")
      setCouponLoading(false)
      return
    }

    try {
      const coupon = await superDatabase.validateCoupon(couponCode)
      if (coupon) {
        setAppliedCoupon(coupon)
        toast({
          title: "Coupon Applied!",
          description: `${coupon.code} applied successfully. You get ${
            coupon.discountType === "percentage" ? `${coupon.discountValue}% off` : `$${coupon.discountValue} off`
          }.`,
        })
      } else {
        setCouponError("Invalid, expired, or used coupon code.")
        toast({
          title: "Coupon Invalid",
          description: "The coupon code entered is not valid or cannot be used.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error validating coupon:", error)
      setCouponError("Failed to validate coupon. Please try again.")
      toast({
        title: "Error",
        description: "Failed to validate coupon. Please try again.",
        variant: "destructive",
      })
    } finally {
      setCouponLoading(false)
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
    setCouponError(null)
    toast({
      title: "Coupon Removed",
      description: "The coupon has been removed.",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setOrderSuccess(false)

    const authState = authManager.getAuthState()
    if (!authState.isAuthenticated || !authState.user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please log in with Discord to place an order.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    const orderDetails = {
      userId: authState.user.id,
      orderId: `MC-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      planName: plan.name,
      price: `$${finalPrice.toFixed(2)}`,
      customerInfo: {
        firstName,
        lastName,
        email,
        discordUsername: authState.user.username,
      },
      serverDetails: {
        name: serverName,
        location: serverLocation,
      },
      type: "Minecraft Hosting",
      status: "pending", // Initial status
      couponUsed: appliedCoupon ? appliedCoupon.code : null,
      couponDiscount: appliedCoupon
        ? `${appliedCoupon.discountValue}${appliedCoupon.discountType === "percentage" ? "%" : "$"}`
        : null,
    }

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Record order in Firestore
      await superDatabase.createOrder(orderDetails)

      // Increment coupon usage if applied
      const couponId = appliedCoupon?.id
      if (couponId) {
        await superDatabase.useCoupon(couponId)
      }

      // Send notification to Discord (replace with your actual webhook URL)
      const discordWebhookUrl = process.env.NEXT_PUBLIC_DISCORD_ORDER_WEBHOOK_URL
      if (discordWebhookUrl) {
        await fetch(discordWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: `New Minecraft Order!
            Order ID: ${orderDetails.orderId}
            Plan: ${orderDetails.planName}
            Price: ${orderDetails.price}
            Customer: ${orderDetails.customerInfo.firstName} ${orderDetails.customerInfo.lastName} (${orderDetails.customerInfo.email})
            Discord: ${orderDetails.customerInfo.discordUsername}
            Server Name: ${orderDetails.serverDetails.name}
            Server Location: ${orderDetails.serverDetails.location}
            Coupon Applied: ${orderDetails.couponUsed || "None"}
            Status: ${orderDetails.status}`,
          }),
        })
      }

      setOrderSuccess(true)
      toast({
        title: "Order Placed!",
        description: `Your Minecraft server order for ${plan.name} has been successfully placed. Order ID: ${orderDetails.orderId}`,
      })
    } catch (error) {
      console.error("Order submission error:", error)
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (orderSuccess) {
    return (
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-6">
        <CardHeader className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold">Order Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg mb-4">Thank you for your purchase!</p>
          <p className="text-white/70">Your Minecraft server hosting order has been successfully placed.</p>
          <Button onClick={() => setOrderSuccess(false)} className="mt-6 bg-purple-600 hover:bg-purple-700">
            Place Another Order
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Order {plan.name} Minecraft Server</CardTitle>
        <p className="text-white/70">
          Complete your purchase for the <span className="font-semibold text-purple-400">{plan.name}</span> plan.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-white/70 mb-2 block">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-purple-500"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-white/70 mb-2 block">
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-purple-500"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="text-white/70 mb-2 block">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-purple-500"
            />
          </div>
          <div>
            <Label htmlFor="serverName" className="text-white/70 mb-2 block">
              Desired Server Name
            </Label>
            <Input
              id="serverName"
              type="text"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-purple-500"
            />
          </div>
          <div>
            <Label htmlFor="serverLocation" className="text-white/70 mb-2 block">
              Server Location
            </Label>
            <Select value={serverLocation} onValueChange={setServerLocation} required>
              <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20 text-white">
                <SelectItem value="us-east">US East</SelectItem>
                <SelectItem value="europe-west">Europe West</SelectItem>
                <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Coupon Code Section */}
          <div className="mt-4">
            <Label htmlFor="couponCode" className="text-white/70 mb-2 block">
              Coupon Code (Optional)
            </Label>
            <div className="flex gap-2">
              <Input
                id="couponCode"
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={!!appliedCoupon || couponLoading || isSubmitting}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-purple-500"
              />
              {!appliedCoupon ? (
                <Button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={couponLoading || isSubmitting || !couponCode}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {couponLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={removeCoupon}
                  disabled={isSubmitting}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Remove
                </Button>
              )}
            </div>
            {couponError && <p className="text-red-400 text-sm mt-2">{couponError}</p>}
            {appliedCoupon && (
              <p className="text-green-400 text-sm mt-2">
                Coupon "{appliedCoupon.code}" applied! You save{" "}
                {appliedCoupon.discountType === "percentage"
                  ? `${appliedCoupon.discountValue}%`
                  : `$${appliedCoupon.discountValue}`}{" "}
                off.
              </p>
            )}
          </div>

          <div className="text-right text-2xl font-bold text-white mt-6">Total: ${finalPrice.toFixed(2)}</div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" /> Processing Order...
              </>
            ) : (
              "Place Order"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
