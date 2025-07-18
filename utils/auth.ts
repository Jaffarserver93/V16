import { authManager } from "./database"

export function getAuthStatus() {
  return authManager.getAuthState()
}

export function getFirstName() {
  return authManager.getFirstName()
}

export function getLastName() {
  return authManager.getLastName()
}

export function getEmail() {
  return authManager.getEmail()
}

export function getDiscordUsername() {
  return authManager.getDiscordUsername()
}
