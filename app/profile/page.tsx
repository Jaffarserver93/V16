"use client"

import { CardDescription } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc, collection, query, where, orderBy, getDocs } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, LogOut, History, Loader2, Crown } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface UserProfile {
  id: string
  username: string
  email: string
  avatar?: string
  firstName?: string
  lastName?: string
}

interface Order {
  orderId: string
  planName: string
  price: string
  status: "pending" | "confirmed" | "cancelled"
  timestamp: {
    seconds: number
    nanoseconds: number
  }
  type: string // 'minecraft' or 'vps'
}

export default function UserProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Fetch user profile from Firestore
          const userDocRef = doc(db, "users", currentUser.uid)
          const userDocSnap = await getDoc(userDocRef)

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data() as UserProfile
            setUser({
              id: currentUser.uid,
              username: userData.username,
              email: userData.email,
              avatar: userData.avatar,
              firstName: userData.username.split(" ")[0],
              lastName: userData.username.split(" ").slice(1).join(" "),
            })
          } else {
            // Fallback to basic user info if Firestore doc doesn't exist
            setUser({
              id: currentUser.uid,
              username: currentUser.displayName || currentUser.email || "User",
              email: currentUser.email || "N/A",
            })
          }

          // Fetch user orders from Firestore
          const ordersRef = collection(db, "orders")
          const q = query(ordersRef, where("userId", "==", currentUser.uid), orderBy("timestamp", "desc"))
          const querySnapshot = await getDocs(q)
          const fetchedOrders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Order[]
          setOrders(fetchedOrders)
        } catch (err) {
          console.error("Error fetching user data or orders:", err)
          setError("Failed to load profile data. Please try again.")
        } finally {
          setLoading(false)
        }
      } else {
        router.push("/") // Redirect to home if not logged in
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem("discord_user") // Clear local storage on logout
      router.push("/")
    } catch (err) {
      console.error("Logout error:", err)
      setError("Failed to log out.")
    }
  }

  const formatTimestamp = (timestamp: { seconds: number; nanoseconds: number }) => {
    if (!timestamp) return "N/A"
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
    return date.toLocaleString()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500 text-white">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 text-white">Cancelled</Badge>
      default:
        return <Badge className="bg-gray-500 text-white">Unknown</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-white">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-red-400">
          <p>{error}</p>
          <Button onClick={() => router.push("/")} className="mt-4">
            Go Home
          </Button>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Should redirect by now, but as a fallback
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 sm:p-8">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center p-1">
              <Image
                src="/logo.webp"
                alt="JXFRCloud Logo"
                width={32}
                height={32}
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">JXFRCloud™</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/minecraft" className="text-white/80 hover:text-white transition-colors">
              Minecraft
            </Link>
            <Link href="/vps" className="text-white/80 hover:text-white transition-colors">
              VPS
            </Link>
            <Link href="/domains" className="text-white/80 hover:text-white transition-colors">
              Domains
            </Link>
            <Link href="/" className="text-white/80 hover:text-white transition-colors">
              Home
            </Link>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </motion.nav>

      <div className="max-w-7xl mx-auto pt-24 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-4xl font-bold flex items-center">
            <User className="w-8 h-8 mr-3" /> My Profile
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* User Info Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 h-full">
              <CardHeader className="flex flex-col items-center text-center pb-4">
                <Avatar className="h-24 w-24 mb-4 ring-2 ring-purple-500/50">
                  <AvatarImage
                    src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : undefined}
                    alt={user.username}
                  />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-4xl">
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  {user.username}
                  <Crown className="w-5 h-5 ml-2 text-yellow-500" />
                </CardTitle>
                <CardDescription className="text-white/70 text-sm">
                  {user.firstName} {user.lastName}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-white/80">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center text-white/80">
                  <User className="w-4 h-4 mr-2" />
                  <span>Discord ID: {user.id}</span>
                </div>
                <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white mt-4">
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
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
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 h-full">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center">
                  <History className="w-5 h-5 mr-2" /> Order History
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
                          <th className="py-2 px-4 text-white/70 text-sm">Status</th>
                          <th className="py-2 px-4 text-white/70 text-sm">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.orderId} className="border-b border-white/10 last:border-b-0">
                            <td className="py-3 px-4 text-white text-sm font-mono">{order.orderId}</td>
                            <td className="py-3 px-4 text-white text-sm capitalize">{order.type}</td>
                            <td className="py-3 px-4 text-white text-sm">{order.planName}</td>
                            <td className="py-3 px-4 text-white text-sm">{order.price}</td>
                            <td className="py-3 px-4 text-sm">{getStatusBadge(order.status)}</td>
                            <td className="py-3 px-4 text-white/70 text-xs">{formatTimestamp(order.timestamp)}</td>
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
