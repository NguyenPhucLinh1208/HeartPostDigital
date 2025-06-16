"use client"

import React, { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn } from "@/components/ui/fade-in"
import { useAnimation } from "@/hooks/useAnimation"
import { Key } from "lucide-react"

interface LoginDoorProps {
  onLogin: (username: string) => void
}

export const LoginDoor = React.memo<LoginDoorProps>(({ onLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({})
  const [isKeyHovered, setIsKeyHovered] = useState(false)
  const { isAnimating, animate } = useAnimation(2000)

  const validateForm = useCallback(() => {
    const newErrors: { username?: string; password?: string } = {}

    if (!username.trim()) {
      newErrors.username = "Username is required"
    } else if (username.length < 2) {
      newErrors.username = "Username must be at least 2 characters"
    }

    if (!password.trim()) {
      newErrors.password = "Password is required"
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [username, password])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      if (validateForm()) {
        animate(() => onLogin(username.trim()))
      }
    },
    [username, validateForm, animate, onLogin],
  )

  const handleInputChange = useCallback(
    (field: "username" | "password") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (field === "username") {
        setUsername(value)
        if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }))
      } else {
        setPassword(value)
        if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
      }
    },
    [errors],
  )

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-orange-800/20 to-amber-700/25"></div>

        {/* Floating elements */}
        <div className="absolute top-20 right-32 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-32 h-32 bg-orange-300/25 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-amber-400/15 rounded-full blur-xl animate-pulse animation-delay-500"></div>
        <div className="absolute bottom-1/4 right-1/3 w-36 h-36 bg-yellow-400/20 rounded-full blur-2xl animate-pulse animation-delay-1500"></div>

        {/* Floating hearts */}
        <div className="absolute top-16 left-16 text-amber-400/30 text-2xl animate-bounce-gentle">💌</div>
        <div className="absolute top-32 right-24 text-orange-400/25 text-xl animate-bounce-gentle animation-delay-1000">
          ✉️
        </div>
        <div className="absolute bottom-24 left-32 text-amber-500/20 text-lg animate-bounce-gentle animation-delay-500">
          💝
        </div>
        <div className="absolute bottom-16 right-16 text-yellow-500/30 text-2xl animate-bounce-gentle animation-delay-1500">
          📮
        </div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 20px 20px, rgba(245, 158, 11, 0.3) 2px, transparent 2px)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Light rays */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-yellow-300/20 via-transparent to-transparent transform rotate-12 animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-amber-300/15 via-transparent to-transparent transform -rotate-12 animate-pulse animation-delay-1000"></div>
      </div>

      <FadeIn delay={300} duration={800}>
        <div className={`relative transition-all duration-2000 ${isAnimating ? "scale-110 rotate-y-12" : ""}`}>
          {/* Door Frame with enhanced design */}
          <div className="w-80 h-96 bg-gradient-to-b from-amber-900 to-amber-800 rounded-xl shadow-2xl border-4 border-amber-700 relative transform-gpu">
            {/* Door Surface with improved texture */}
            <div className="absolute inset-2 bg-gradient-to-b from-amber-800 to-amber-900 rounded-lg overflow-hidden">
              {/* Enhanced Wood Grain Effect */}
              <div className="absolute inset-0 opacity-40">
                <div className="h-full w-full bg-gradient-to-r from-transparent via-amber-600/50 to-transparent"></div>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute left-0 right-0 h-px bg-amber-600/40`}
                    style={{ top: `${20 * (i + 1)}%` }}
                  />
                ))}
              </div>

              {/* HeartPost Sign - moved up more */}
              <FadeIn delay={600}>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-b from-yellow-500 to-yellow-600 px-8 py-4 rounded-xl shadow-lg border-2 border-yellow-700 relative">
                    <div className="absolute inset-0 bg-yellow-400/20 rounded-xl blur animate-pulse"></div>
                    <h1 className="text-amber-900 font-serif text-2xl font-bold tracking-wider relative z-10">
                      HeartPost
                    </h1>
                  </div>
                </div>
              </FadeIn>

              {/* Form Section - repositioned */}
              <FadeIn delay={900}>
                <form
                  onSubmit={handleSubmit}
                  className="absolute top-32 left-1/2 transform -translate-x-1/2 w-56 space-y-4"
                >
                  {/* Username Input */}
                  <div className="bg-gradient-to-b from-yellow-500/80 to-yellow-600/80 p-1 rounded-lg shadow-inner backdrop-blur-sm">
                    <Input
                      type="text"
                      placeholder="Enter username..."
                      value={username}
                      onChange={handleInputChange("username")}
                      className={`bg-amber-50/90 border-none text-amber-900 placeholder-amber-600/70 font-mono text-center shadow-inner transition-all duration-300 focus:bg-white focus:scale-105 ${
                        errors.username ? "ring-2 ring-red-400" : ""
                      }`}
                      disabled={isAnimating}
                    />
                    {errors.username && (
                      <p className="text-red-600 text-xs mt-1 text-center font-serif">{errors.username}</p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div className="bg-gradient-to-b from-yellow-500/80 to-yellow-600/80 p-1 rounded-lg shadow-inner backdrop-blur-sm">
                    <Input
                      type="password"
                      placeholder="Enter password..."
                      value={password}
                      onChange={handleInputChange("password")}
                      className={`bg-amber-50/90 border-none text-amber-900 placeholder-amber-600/70 font-mono text-center shadow-inner transition-all duration-300 focus:bg-white focus:scale-105 ${
                        errors.password ? "ring-2 ring-red-400" : ""
                      }`}
                      disabled={isAnimating}
                    />
                    {errors.password && (
                      <p className="text-red-600 text-xs mt-1 text-center font-serif">{errors.password}</p>
                    )}
                  </div>

                  {/* Key Button - moved inside form */}
                  <div className="flex justify-center pt-2">
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={isAnimating || !username.trim() || !password.trim()}
                      onMouseEnter={() => setIsKeyHovered(true)}
                      onMouseLeave={() => setIsKeyHovered(false)}
                      className="w-16 h-16 rounded-full bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 border-4 border-yellow-700 shadow-2xl transition-all duration-500 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed transform-gpu group relative overflow-hidden"
                    >
                      {/* Background glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/50 to-yellow-500/50 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Key icon */}
                      <div className="relative z-10">
                        {isAnimating ? (
                          <div className="w-6 h-6 border-3 border-yellow-200 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Key
                            className={`w-6 h-6 text-amber-900 transition-all duration-500 ${
                              isKeyHovered ? "rotate-45 scale-110" : ""
                            }`}
                          />
                        )}
                      </div>

                      {/* Ripple effect */}
                      <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                    </Button>
                  </div>
                </form>
              </FadeIn>

              {/* Door Opening Animation */}
              {isAnimating && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/80 to-yellow-400/80 animate-pulse transform origin-left transition-transform duration-2000 backdrop-blur-sm"></div>
              )}
            </div>
          </div>

          {/* Enhanced Door Shadow */}
          <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/20 blur-lg rounded-full"></div>
        </div>
      </FadeIn>

      {/* Floating particles animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
})

LoginDoor.displayName = "LoginDoor"
