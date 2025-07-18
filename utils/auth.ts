import { authManager as dbAuthManager } from "./database" // Import from database.ts

export interface AuthState {
  isAuthenticated: boolean
  user?: {
    id: string
    username: string
    email: string
  }
}

// Re-export authManager from database.ts
export const authManager = dbAuthManager
