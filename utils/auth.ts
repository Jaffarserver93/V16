export interface AuthState {
  isAuthenticated: boolean
  user?: {
    id: string
    username: string
    email: string
  }
}

// Mock auth manager for now
export const authManager = {
  getAuthState: (): AuthState => ({ isAuthenticated: false }),
  getFirstName: () => "",
  getLastName: () => "",
  getEmail: () => "",
  getDiscordUsername: () => "",
}
