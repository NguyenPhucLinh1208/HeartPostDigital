"use client"

import { useState } from "react"
import { LoginDoor } from "@/components/login-door"
import { MainHall } from "@/components/main-hall"
import { PersonalSpace } from "@/components/personal-space"
import { PostOffice } from "@/components/post-office"
import { BulletinBoard } from "@/components/bulletin-board"

export default function HeartPostApp() {
  const [currentView, setCurrentView] = useState<"login" | "main" | "personal" | "postoffice" | "bulletin">("login")
  const [user, setUser] = useState<string>("")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleLogin = (username: string) => {
    setUser(username)
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentView("main")
      setIsTransitioning(false)
    }, 1500)
  }

  const navigateTo = (view: "main" | "personal" | "postoffice" | "bulletin") => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentView(view)
      setIsTransitioning(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
      {/* Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-amber-900/20 z-50 flex items-center justify-center">
          <div className="animate-spin">
            <div className="w-16 h-16 border-4 border-amber-800 border-t-transparent rounded-full"></div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        {currentView === "login" && <LoginDoor onLogin={handleLogin} />}
        {currentView === "main" && <MainHall user={user} onNavigate={navigateTo} />}
        {currentView === "personal" && <PersonalSpace user={user} onNavigate={navigateTo} />}
        {currentView === "postoffice" && <PostOffice user={user} onNavigate={navigateTo} />}
        {currentView === "bulletin" && <BulletinBoard user={user} onNavigate={navigateTo} />}
      </div>
    </div>
  )
}
