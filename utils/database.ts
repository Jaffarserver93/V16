import { db } from "@/lib/firebase" // Import Firestore
import { collection, addDoc, getDocs, query, where, serverTimestamp, doc, updateDoc } from "firebase/firestore"
import { getCouponByCode } from "@/actions/coupon" // Import the new action

export interface AuthState {
  isAuthenticated: boolean
  user?: {
    id: string
    username: string
    email: string
  }
}

export interface Coupon {
  id?: string // Firestore document ID
  code: string
  discountType: "percentage" | "fixed"
  discountValue: number
  expiresAt: Date | null
  usageLimit: number | null
  usageCount: number
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

// Mock auth manager for now (will be updated by EnhancedDiscordLogin)
export const authManager = {
  getAuthState: (): AuthState => {
    const savedUser = typeof window !== "undefined" ? localStorage.getItem("discord_user") : null
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        return { isAuthenticated: true, user: { id: user.id, username: user.username, email: user.email } }
      } catch (error) {
        console.error("Error parsing saved user from localStorage:", error)
        return { isAuthenticated: false }
      }
    }
    return { isAuthenticated: false }
  },
  getFirstName: () => {
    const authState = authManager.getAuthState()
    return authState.isAuthenticated && authState.user?.username ? authState.user.username.split(" ")[0] : ""
  },
  getLastName: () => {
    const authState = authManager.getAuthState()
    const nameParts = authState.isAuthenticated && authState.user?.username ? authState.user.username.split(" ") : []
    return nameParts.length > 1 ? nameParts[nameParts.length - 1] : ""
  },
  getEmail: () => {
    const authState = authManager.getAuthState()
    return authState.isAuthenticated && authState.user?.email ? authState.user.email : ""
  },
  getDiscordUsername: () => {
    const authState = authManager.getAuthState()
    return authState.isAuthenticated && authState.user?.username ? authState.user.username : ""
  },
}

// Firebase-integrated database operations
export const superDatabase = {
  validateCoupon: async (code: string): Promise<Coupon | null> => {
    const coupon = await getCouponByCode(code)
    if (!coupon) {
      return null // Coupon not found
    }

    // Check if active
    if (!coupon.isActive) {
      return null
    }

    // Check expiry date
    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      return null
    }

    // Check usage limit
    if (coupon.usageLimit !== null && coupon.usageCount >= coupon.usageLimit) {
      return null
    }

    return coupon
  },
  useCoupon: async (couponId: string) => {
    try {
      const couponRef = doc(db, "coupons", couponId)
      const currentCoupon = await getCouponByCode(couponId) // Fetch current state to get usageCount
      if (currentCoupon) {
        await updateDoc(couponRef, {
          usageCount: currentCoupon.usageCount + 1, // Increment usage count
          updatedAt: serverTimestamp(),
        })
        console.log("Coupon usage incremented for:", couponId)
      } else {
        console.warn("Attempted to use a coupon that no longer exists:", couponId)
      }
    } catch (error) {
      console.error("Error incrementing coupon usage:", error)
    }
  },
  getUserByDiscordId: async (id: string) => {
    try {
      const usersRef = collection(db, "users")
      const q = query(usersRef, where("id", "==", id))
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data()
      }
      return null
    } catch (error) {
      console.error("Error getting user by Discord ID:", error)
      return null
    }
  },
  createOrder: async (order: any) => {
    try {
      const ordersRef = collection(db, "orders")
      await addDoc(ordersRef, {
        ...order,
        timestamp: serverTimestamp(), // Add a server timestamp
      })
      console.log("Order created in Firestore:", order)
    } catch (error) {
      console.error("Error creating order in Firestore:", error)
    }
  },
}
