"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authManager } from "@/utils/database"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, User, Mail, DiscIcon as Discord, ShoppingCart, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"

interface Order {
  orderId: string
  planName: string
  price: string
  type: string
  timestamp: {
    seconds: number
    nanoseconds: number
  }
  status: "pending" | "confirmed" | "cancelled"
}

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true)
      setError(null)
      const authState = authManager.getAuthState()

      if (!authState.isAuthenticated || !authState.user?.id) {
        toast({
          title: "Authentication Required",
          description: "Please log in to view your profile.",
          variant: "destructive",
        })
        router.push("/") // Redirect to home or login if not authenticated
        return
      }

      setUser(authState.user)

      try {
        // Fetch user's orders
        const ordersRef = collection(db, "orders")
        const q = query(ordersRef, where("userId", "==", authState.user.id), orderBy("timestamp", "desc"))
        const querySnapshot = await getDocs(q)
        const fetchedOrders: Order[] = querySnapshot.docs.map((doc) => doc.data() as Order)
        setOrders(fetchedOrders)
      } catch (err) {
        console.error("Error fetching orders:", err)
        setError("Failed to load order history. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [router, toast])

  const formatTimestamp = (timestamp: { seconds: number; nanoseconds: number }) => {
    if (!timestamp) return "N/A"
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
    return date.toLocaleString()
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem("discord_user") // Clear local storage
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      })
      router.push("/") // Redirect to home page after logout
    } catch (err) {
      console.error("Logout error:", err)
      toast({
        title: "Logout Failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <Loader2 className="h-16 w-16 animate-spin text-purple-500" />
        <p className="mt-4 text-lg">Loading profile data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <p className="text-red-400 text-lg">{error}</p>
        <Button onClick={() => router.push("/")} className="mt-4 bg-purple-600 hover:bg-purple-700">
          Go Home
        </Button>
      </div>
    )
  }

  if (!user) {
    // This case should ideally be handled by the initial redirect, but as a fallback
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <p className="text-lg">You are not logged in.</p>
        <Button onClick={() => router.push("/")} className="mt-4 bg-purple-600 hover:bg-purple-700">
          Login
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-4xl font-bold flex items-center">
            <User className="w-8 h-8 mr-3" /> My Profile
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white/10 backdrop-blur-md border border-white/20">
              <CardHeader className="flex flex-col items-center text-center pb-4">
                <Avatar className="h-24 w-24 mb-4 border-2 border-purple-500">
                  <AvatarImage src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} />
                  <AvatarFallback className="bg-purple-600 text-white text-4xl">
                    {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl font-bold text-white">{user.username}</CardTitle>
                <p className="text-white/70 text-sm">Discord User</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-white/80">
                  <Mail className="w-5 h-5 mr-3 text-purple-400" />
                  <span>{user.email || "N/A"}</span>
                </div>
                <div className="flex items-center text-white/80">
                  <Discord className="w-5 h-5 mr-3 text-purple-400" />
                  <span>{user.username}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order History Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/10 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" /> Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-white/70">You have no orders yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left table-auto">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="py-2 px-4 text-white/70 text-sm">Order ID</th>
                          <th className="py-2 px-4 text-white/70 text-sm">Type</th>
                          <th className="py-2 px-4 text-white/70 text-sm">Plan</th>
                          <th className="py-2 px-4 text-white/70 text-sm">Price</th>
                          <th className="py-2 px-4 text-white/70 text-sm">Date</th>
                          <th className="py-2 px-4 text-white/70 text-sm">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, index) => (
                          <tr key={order.orderId || index} className="border-b border-white/10 last:border-b-0">
                            <td className="py-3 px-4 text-white text-sm font-mono">{order.orderId}</td>
                            <td className="py-3 px-4 text-white text-sm">{order.type}</td>
                            <td className="py-3 px-4 text-white text-sm">{order.planName}</td>
                            <td className="py-3 px-4 text-white text-sm">{order.price}</td>
                            <td className="py-3 px-4 text-white/70 text-xs">{formatTimestamp(order.timestamp)}</td>
                            <td className="py-3 px-4 text-sm">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  order.status === "confirmed"
                                    ? "bg-green-500/20 text-green-400"
                                    : order.status === "pending"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-red-500/20 text-red-400"
                                }`}
                              >
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
