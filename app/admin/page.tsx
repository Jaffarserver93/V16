"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { collection, getDocs, query, orderBy } from "firebase/firestore" // Import 'where'
import { auth, db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Lock, LayoutDashboard, LogOut, Users, ShoppingCart, Clock, Search, XCircle } from "lucide-react" // Import Search and XCircle
import { motion } from "framer-motion"
import { updateOrderStatus } from "@/actions/order"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Order {
  orderId: string
  planName: string
  price: string
  customerInfo: {
    firstName: string
    lastName: string
    email: string
  }
  timestamp: {
    seconds: number
    nanoseconds: number
  }
  status: "pending" | "confirmed" | "cancelled"
  id: string // Add this line for Firestore document ID
}

export default function AdminPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [totalUsers, setTotalUsers] = useState<number | null>(null)
  const [totalOrders, setTotalOrders] = useState<number | null>(null)
  const [allOrders, setAllOrders] = useState<Order[]>([]) // Store all orders for searching
  const [displayedOrders, setDisplayedOrders] = useState<Order[]>([]) // Orders currently displayed
  const [searchOrderId, setSearchOrderId] = useState("")
  const [loadingData, setLoadingData] = useState(true)
  const router = useRouter()

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        fetchAdminData()
      } else {
        setTotalUsers(null)
        setTotalOrders(null)
        setAllOrders([])
        setDisplayedOrders([])
      }
    })
    return () => unsubscribe()
  }, [])

  const fetchAdminData = async () => {
    setLoadingData(true)
    try {
      // Fetch total users
      const usersSnapshot = await getDocs(collection(db, "users"))
      setTotalUsers(usersSnapshot.size)

      // Fetch all orders
      const ordersRef = collection(db, "orders")
      const ordersSnapshot = await getDocs(query(ordersRef, orderBy("timestamp", "desc"))) // Fetch all, then filter
      const fetchedOrders = ordersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Order)
      setAllOrders(fetchedOrders)
      setDisplayedOrders(fetchedOrders.slice(0, 5)) // Display only recent 5 by default
      setTotalOrders(fetchedOrders.length)
    } catch (err) {
      console.error("Error fetching admin data:", err)
      setError("Failed to load data. Please try again.")
    } finally {
      setLoadingData(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      // User will be set by onAuthStateChanged listener
    } catch (err: any) {
      console.error("Login error:", err)
      setError("Invalid email or password. Please try again.")
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/admin") // Redirect to login page after logout
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

  const handleStatusChange = async (orderId: string, newStatus: "pending" | "confirmed" | "cancelled") => {
    setError(null)
    try {
      const result = await updateOrderStatus(orderId, newStatus)
      if (result.success) {
        // Update allOrders and then re-filter displayedOrders
        setAllOrders((prevAllOrders) =>
          prevAllOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
        )
        // Re-apply search filter if any
        if (searchOrderId) {
          handleSearch(searchOrderId)
        } else {
          setDisplayedOrders(
            allOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)).slice(0, 5),
          )
        }
      } else {
        setError(result.message)
      }
    } catch (err) {
      console.error("Error calling updateOrderStatus:", err)
      setError("An unexpected error occurred while updating status.")
    }
  }

  const handleSearch = (searchTerm: string) => {
    setSearchOrderId(searchTerm)
    if (searchTerm.trim() === "") {
      setDisplayedOrders(allOrders.slice(0, 5)) // Reset to recent 5 if search is cleared
    } else {
      const filtered = allOrders.filter((order) => order.orderId.toLowerCase().includes(searchTerm.toLowerCase()))
      setDisplayedOrders(filtered)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-white/70 flex items-center mb-2">
                <User className="w-4 h-4 mr-2" /> Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@admin.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-purple-500"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-white/70 flex items-center mb-2">
                <Lock className="w-4 h-4 mr-2" /> Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="jxfr45"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-purple-500"
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold"
            >
              Login
            </Button>
          </form>
          <p className="text-white/50 text-xs text-center mt-4">
            **Note:** For demo purposes, credentials are hardcoded. In production, use secure authentication.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-4xl font-bold flex items-center">
            <LayoutDashboard className="w-8 h-8 mr-3" /> Admin Dashboard
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </motion.div>

        {loadingData ? (
          <div className="text-center py-10">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/70">Loading admin data...</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border border-white/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white/70">Total Users</CardTitle>
                    <Users className="h-5 w-5 text-white/50" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-white">{totalUsers}</div>
                    <p className="text-xs text-white/50">Users registered via Discord</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border border-white/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white/70">Total Orders</CardTitle>
                    <ShoppingCart className="h-5 w-5 text-white/50" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-white">{totalOrders}</div>
                    <p className="text-xs text-white/50">Total hosting orders placed</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border border-white/20">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white flex items-center">
                    <Clock className="w-5 h-5 mr-2" /> Recent Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="relative flex items-center">
                      <Input
                        type="text"
                        placeholder="Search by Order ID..."
                        value={searchOrderId}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-purple-500 pr-10"
                      />
                      {searchOrderId && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSearch("")}
                          className="absolute right-1 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      )}
                      {!searchOrderId && (
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                      )}
                    </div>
                  </div>

                  {displayedOrders.length === 0 ? (
                    <p className="text-white/70">No orders found matching your search.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left table-auto">
                        <thead>
                          <tr className="border-b border-white/20">
                            <th className="py-2 px-4 text-white/70 text-sm">Order ID</th>
                            <th className="py-2 px-4 text-white/70 text-sm">Plan</th>
                            <th className="py-2 px-4 text-white/70 text-sm">Customer</th>
                            <th className="py-2 px-4 text-white/70 text-sm">Price</th>
                            <th className="py-2 px-4 text-white/70 text-sm">Date</th>
                            <th className="py-2 px-4 text-white/70 text-sm">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {displayedOrders.map((order) => (
                            <tr key={order.id} className="border-b border-white/10 last:border-b-0">
                              <td className="py-3 px-4 text-white text-sm font-mono">{order.orderId}</td>
                              <td className="py-3 px-4 text-white text-sm">{order.planName}</td>
                              <td className="py-3 px-4 text-white text-sm">
                                {order.customerInfo.firstName} {order.customerInfo.lastName} ({order.customerInfo.email}
                                )
                              </td>
                              <td className="py-3 px-4 text-white text-sm">{order.price}</td>
                              <td className="py-3 px-4 text-white/70 text-xs">{formatTimestamp(order.timestamp)}</td>
                              <td className="py-3 px-4 text-sm">
                                <Select
                                  value={order.status}
                                  onValueChange={(value: "pending" | "confirmed" | "cancelled") =>
                                    handleStatusChange(order.id, value)
                                  }
                                >
                                  <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white">
                                    <SelectValue placeholder="Select Status" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-black/90 border-white/20 text-white">
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
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
        )}
      </div>
    </div>
  )
}
