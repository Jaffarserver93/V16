import { db } from "@/lib/firebase" // Import Firestore
import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore"

export interface AuthState {
  isAuthenticated: boolean
  user?: {
    id: string
    username: string
    email: string
  }
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
  validateCoupon: (code: string) => {
    // Mock coupon validation
    if (code === "WELCOME10") {
      return { code, discountType: "percentage", discountValue: 10 }
    }
    return null
  },
  useCoupon: (code: string) => {
    console.log("Using coupon:", code)
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
