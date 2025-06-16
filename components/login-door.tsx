"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginDoorProps {
  onLogin: (username: string) => void
}

export function LoginDoor({ onLogin }: LoginDoorProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isDoorOpening, setIsDoorOpening] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim() && password.trim()) {
      setIsDoorOpening(true)
      setTimeout(() => onLogin(username), 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background - Brick Wall */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-amber-800 opacity-20"></div>

      {/* Street Light Effect */}
      <div className="absolute top-10 right-20 w-32 h-32 bg-yellow-300 rounded-full opacity-30 blur-3xl"></div>

      {/* Door Container */}
      <div className={`relative transition-all duration-1000 ${isDoorOpening ? "scale-110 rotate-y-12" : ""}`}>
        {/* Door Frame */}
        <div className="w-80 h-96 bg-gradient-to-b from-amber-900 to-amber-800 rounded-lg shadow-2xl border-4 border-amber-700 relative">
          {/* Door Surface */}
          <div className="absolute inset-2 bg-gradient-to-b from-amber-800 to-amber-900 rounded-md">
            {/* Wood Grain Effect */}
            <div className="absolute inset-0 opacity-30">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-50"></div>
              <div className="absolute top-1/4 left-0 right-0 h-px bg-amber-600 opacity-40"></div>
              <div className="absolute top-2/4 left-0 right-0 h-px bg-amber-600 opacity-40"></div>
              <div className="absolute top-3/4 left-0 right-0 h-px bg-amber-600 opacity-40"></div>
            </div>

            {/* HeartPost Sign */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-b from-yellow-600 to-yellow-700 px-6 py-3 rounded-lg shadow-lg border-2 border-yellow-800">
                <h1 className="text-amber-900 font-serif text-xl font-bold tracking-wider">HeartPost</h1>
              </div>
            </div>

            {/* Username Input */}
            <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-64">
              <div className="bg-gradient-to-b from-yellow-600 to-yellow-700 p-1 rounded-lg shadow-inner mb-4">
                <Input
                  type="text"
                  placeholder="Username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-amber-50 border-none text-amber-900 placeholder-amber-600 font-mono text-center shadow-inner"
                />
              </div>
              <div className="bg-gradient-to-b from-yellow-600 to-yellow-700 p-1 rounded-lg shadow-inner">
                <Input
                  type="password"
                  placeholder="Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-amber-50 border-none text-amber-900 placeholder-amber-600 font-mono text-center shadow-inner"
                />
              </div>
              <div className="text-center mt-2">
                <span className="text-amber-700 text-sm font-serif italic">Login Information</span>
              </div>
            </div>

            {/* Door Handle */}
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
              <Button
                onClick={handleSubmit}
                disabled={!username.trim() || !password.trim()}
                className="w-16 h-16 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 border-4 border-yellow-700 shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-8 h-8 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-full shadow-inner"></div>
              </Button>
              <div className="text-center mt-2">
                <span className="text-amber-700 text-xs font-serif italic">Door Handle</span>
              </div>
            </div>

            {/* Door Opening Animation */}
            {isDoorOpening && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200 to-yellow-400 opacity-80 animate-pulse transform origin-left transition-transform duration-2000 rotate-y-90"></div>
            )}
          </div>
        </div>

        {/* Door Shadow */}
        <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black opacity-20 blur-lg rounded-full"></div>
      </div>

      {/* Welcome Text */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-amber-800 font-serif text-lg italic">"Where letters carry hearts"</p>
      </div>
    </div>
  )
}
