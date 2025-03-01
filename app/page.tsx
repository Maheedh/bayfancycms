"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/lib/api"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await login(email, password)
      // Store the token in localStorage
      localStorage.setItem("auth_token", response.token)
      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password. Please try again.")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full">
      {/* Left side - Black background */}
      <div className="hidden md:flex md:w-1/3 bg-black items-center justify-center">
        <div className="p-8">
          <h1 className="text-white text-3xl font-bold mb-4">Bayfancy Singapore</h1>
          <p className="text-gray-400">Content Management System</p>
        </div>
      </div>

      {/* Middle stripe - White */}
      <div className="hidden md:block w-12 bg-white"></div>

      {/* Right side - Dark Olive Green with gradient */}
      <div className="w-full md:w-[calc(2/3-3rem)] bg-gradient-to-br from-[#556B2F] to-[#4A5F29] flex items-center justify-center p-6">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
          <div className="flex flex-col space-y-2 text-center mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">Enter your credentials to access the CMS</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@bayfancy.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-[#556B2F] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#556B2F] hover:bg-[#4A5F29]" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="mt-4 text-center text-sm">
              <p className="text-muted-foreground">
                Need help? Contact{" "}
                <Link href="mailto:support@bayfancy.com" className="text-[#556B2F] hover:underline">
                  IT Support
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

