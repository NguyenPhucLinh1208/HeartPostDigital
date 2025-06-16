"use client"

import React, { useState, useCallback, Suspense } from "react"
import { usePageTransition } from "@/hooks/useAnimation"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { PageTransition } from "@/components/ui/page-transition"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Lazy load components for better performance
const LoginDoor = React.lazy(() => import("@/components/login-door").then((module) => ({ default: module.LoginDoor })))
const MainHall = React.lazy(() => import("@/components/main-hall").then((module) => ({ default: module.MainHall })))
const PersonalSpace = React.lazy(() =>
  import("@/components/personal-space").then((module) => ({ default: module.PersonalSpace })),
)
const PostOffice = React.lazy(() =>
  import("@/components/post-office").then((module) => ({ default: module.PostOffice })),
)
const BulletinBoard = React.lazy(() =>
  import("@/components/bulletin-board").then((module) => ({ default: module.BulletinBoard })),
)

type ViewType = "login" | "main" | "personal" | "postoffice" | "bulletin"

export default function HeartPostApp() {
  const [currentView, setCurrentView] = useState<ViewType>("login")
  const [user, setUser] = useLocalStorage<string>("heartpost_user", "")
  const { isTransitioning, transition } = usePageTransition()

  // Auto-login if user exists
  React.useEffect(() => {
    if (user && currentView === "login") {
      setCurrentView("main")
    }
  }, [user, currentView])

  const handleLogin = useCallback(
    (username: string) => {
      setUser(username)
      transition(() => setCurrentView("main"), 1500)
    },
    [setUser, transition],
  )

  const navigateTo = useCallback(
    (view: Exclude<ViewType, "login">) => {
      transition(() => setCurrentView(view))
    },
    [transition],
  )

  const handleLogout = useCallback(() => {
    setUser("")
    transition(() => setCurrentView("login"))
  }, [setUser, transition])

  const renderCurrentView = () => {
    const commonProps = { user, onNavigate: navigateTo }

    switch (currentView) {
      case "login":
        return <LoginDoor onLogin={handleLogin} />
      case "main":
        return <MainHall {...commonProps} onLogout={handleLogout} />
      case "personal":
        return <PersonalSpace {...commonProps} />
      case "postoffice":
        return <PostOffice {...commonProps} />
      case "bulletin":
        return <BulletinBoard {...commonProps} />
      default:
        return <LoginDoor onLogin={handleLogin} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden">
      <PageTransition isTransitioning={isTransitioning}>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <LoadingSpinner size="lg" className="mx-auto mb-4" />
                <p className="text-amber-700 font-serif">Loading HeartPost...</p>
              </div>
            </div>
          }
        >
          {renderCurrentView()}
        </Suspense>
      </PageTransition>
    </div>
  )
}
