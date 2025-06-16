import React from "react"

interface PageTransitionProps {
  isTransitioning: boolean
  children: React.ReactNode
}

export const PageTransition = React.memo<PageTransitionProps>(({ isTransitioning, children }) => {
  return (
    <>
      {/* Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-gradient-to-br from-amber-900/30 to-amber-800/20 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-amber-400 rounded-full animate-spin animation-delay-150"></div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`transition-all duration-500 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
      >
        {children}
      </div>
    </>
  )
})

PageTransition.displayName = "PageTransition"
