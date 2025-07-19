"use server"

import { db } from "@/lib/firebase"
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  orderBy,
} from "firebase/firestore"

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

export async function createCoupon(couponData: Omit<Coupon, "id" | "usageCount" | "createdAt" | "updatedAt">) {
  try {
    const couponsRef = collection(db, "coupons")
    const newCoupon = {
      ...couponData,
      usageCount: 0, // Initialize usage count
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
    const docRef = await addDoc(couponsRef, newCoupon)
    return { success: true, message: `Coupon ${couponData.code} created successfully!`, id: docRef.id }
  } catch (error) {
    console.error("Error creating coupon:", error)
    return { success: false, message: "Failed to create coupon." }
  }
}

export async function updateCoupon(couponId: string, updateData: Partial<Omit<Coupon, "id" | "createdAt">>) {
  try {
    const couponRef = doc(db, "coupons", couponId)
    await updateDoc(couponRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    })
    return { success: true, message: `Coupon ${updateData.code || couponId} updated successfully!` }
  } catch (error) {
    console.error("Error updating coupon:", error)
    return { success: false, message: "Failed to update coupon." }
  }
}

export async function deleteCoupon(couponId: string) {
  try {
    const couponRef = doc(db, "coupons", couponId)
    await deleteDoc(couponRef)
    return { success: true, message: "Coupon deleted successfully!" }
  } catch (error) {
    console.error("Error deleting coupon:", error)
    return { success: false, message: "Failed to delete coupon." }
  }
}

export async function getCoupons(): Promise<Coupon[]> {
  try {
    const couponsRef = collection(db, "coupons")
    const q = query(couponsRef, orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      expiresAt: doc.data().expiresAt?.toDate() || null, // Convert Firestore Timestamp to Date
      createdAt: doc.data().createdAt?.toDate() || null,
      updatedAt: doc.data().updatedAt?.toDate() || null,
    })) as Coupon[]
  } catch (error) {
    console.error("Error fetching coupons:", error)
    return []
  }
}

export async function getCouponByCode(code: string): Promise<Coupon | null> {
  try {
    const couponsRef = collection(db, "coupons")
    const q = query(couponsRef, where("code", "==", code.toUpperCase()))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data()
      return {
        id: querySnapshot.docs[0].id,
        ...docData,
        expiresAt: docData.expiresAt?.toDate() || null,
        createdAt: docData.createdAt?.toDate() || null,
        updatedAt: docData.updatedAt?.toDate() || null,
      } as Coupon
    }
    return null
  } catch (error) {
    console.error("Error fetching coupon by code:", error)
    return null
  }
}
