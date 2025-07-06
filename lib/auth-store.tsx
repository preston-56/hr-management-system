import { create } from 'zustand'
import { type User } from '@/types'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  checkAuthStatus: () => Promise<void>
}

class TokenManager {
  private static readonly ACCESS_TOKEN_KEY = "access_token"
  private static readonly REFRESH_TOKEN_KEY = "refresh_token"

  static setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, token)
    }
  }

  static getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.ACCESS_TOKEN_KEY)
    }
    return null
  }

  static setRefreshToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, token)
    }
  }

  static getRefreshToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY)
    }
    return null
  }

  static clearTokens(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY)
      localStorage.removeItem(this.REFRESH_TOKEN_KEY)
    }
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  checkAuthStatus: async () => {
    const token = TokenManager.getToken()
    if (!token) {
      set({ isLoading: false, isAuthenticated: false })
      return
    }

    try {
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const userData = await response.json()
        set({ user: userData, isAuthenticated: true })
      } else {
        const token = TokenManager.getToken()
        if (!token || !token.startsWith("demo_")) {
          TokenManager.clearTokens()
        }
        set({ user: null, isAuthenticated: false })
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      const token = TokenManager.getToken()
      if (!token || !token.startsWith("demo_")) {
        TokenManager.clearTokens()
      }
      set({ user: null, isAuthenticated: false })
    } finally {
      set({ isLoading: false })
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        TokenManager.setToken(data.accessToken)
        TokenManager.setRefreshToken(data.refreshToken)
        set({ user: data.user, isAuthenticated: true })
        return { success: true }
      } else {
        return {
          success: false,
          error: data.error || "Login failed",
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      }
    }
  },

  logout: async () => {
    try {
      const token = TokenManager.getToken()
      if (token) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      set({ user: null, isAuthenticated: false })
      TokenManager.clearTokens()
    }
  },

  refreshUser: async () => {
    try {
      const token = TokenManager.getToken()
      if (!token) return

      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const userData = await response.json()
        set({ user: userData, isAuthenticated: true })
      }
    } catch (error) {
      console.error("Failed to refresh user:", error)
    }
  },
}))

// Initialize auth check when the store is first used
let hasInitialized = false
export const useAuth = () => {
  const store = useAuthStore()

  // Auto-initialize on first use
  if (!hasInitialized && typeof window !== 'undefined') {
    hasInitialized = true
    store.checkAuthStatus()
  }

  return store
}