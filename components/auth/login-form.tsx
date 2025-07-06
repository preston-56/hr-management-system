"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Building2 } from "lucide-react"
import { useAuth } from "@/lib/auth-store"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isDemoMode, setIsDemoMode] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setIsDemoMode(false)

    const result = await login(email, password)

    if (result.success) {
      router.push("/dashboard")
    } else {
      setError(result.error || "Login failed")
      setIsDemoMode(true)
    }

    setIsLoading(false)
  }

  const autofill = (email: string, password: string) => {
    setEmail(email)
    setPassword(password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Building2 className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold">HR Management System</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Sign in to your account</p>

          {isDemoMode && (
            <div className="mt-2 p-2 bg-yellow-100 dark:bg-yellow-300/10 border border-yellow-300 dark:border-yellow-400/50 rounded">
              <p className="text-xs text-yellow-800 dark:text-yellow-300">
                🚀 Demo Mode: Backend not connected. Using demo credentials below.
              </p>
            </div>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access the HR system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && !isDemoMode && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-300">Demo Credentials:</p>
              <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                <div
                  className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => autofill("hr@company.com", "password123")}
                >
                  HR Manager: hr@company.com / password123
                </div>
                <div
                  className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => autofill("staff@company.com", "password123")}
                >
                  HR Staff: staff@company.com / password123
                </div>
                <div
                  className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => autofill("admin@company.com", "password123")}
                >
                  Admin: admin@company.com / password123
                </div>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Click on credentials to auto-fill</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
