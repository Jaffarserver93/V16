"use server"

import { db } from "@/lib/firebase"
import { doc, updateDoc } from "firebase/firestore"

export async function updateOrderStatus(orderId: string, newStatus: "pending" | "confirmed" | "cancelled") {
  try {
    const orderRef = doc(db, "orders", orderId)
    await updateDoc(orderRef, { status: newStatus })
    return { success: true, message: `Order ${orderId} status updated to ${newStatus}.` }
  } catch (error) {
    console.error("Error updating order status:", error)
    return { success: false, message: "Failed to update order status." }
  }
}
