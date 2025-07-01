"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { apiClient, type User, TokenManager } from "./api"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    const token = TokenManager.getToken()
    if (!token) {
      setIsLoading(false)
      return
    }

    try {
      const response = await apiClient.getCurrentUser()
      if (response.success && response.data) {
        setUser(response.data)
      } else {
        // clear tokens if not in demo mode
        const token = TokenManager.getToken()
        if (!token || !token.startsWith("demo_")) {
          TokenManager.clearTokens()
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      // Don't clear demo tokens
      const token = TokenManager.getToken()
      if (!token || !token.startsWith("demo_")) {
        TokenManager.clearTokens()
      }
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password)

      if (response.success && response.data) {
        TokenManager.setToken(response.data.accessToken)
        TokenManager.setRefreshToken(response.data.refreshToken)
        setUser(response.data.user)
        return { success: true }
      } else {
        return {
          success: false,
          error: response.error || "Login failed",
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      }
    }
  }

  const logout = async () => {
    try {
      await apiClient.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setUser(null)
      TokenManager.clearTokens()
    }
  }

  const refreshUser = async () => {
    try {
      const response = await apiClient.getCurrentUser()
      if (response.success && response.data) {
        setUser(response.data)
      }
    } catch (error) {
      console.error("Failed to refresh user:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
