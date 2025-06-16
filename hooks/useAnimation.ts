"use client"

import { useCallback, useState } from "react"

export function useAnimation(duration = 300) {
  const [isAnimating, setIsAnimating] = useState(false)

  const animate = useCallback(
    async (callback?: () => void) => {
      setIsAnimating(true)

      if (callback) {
        setTimeout(callback, duration / 2)
      }

      setTimeout(() => {
        setIsAnimating(false)
      }, duration)
    },
    [duration],
  )

  return { isAnimating, animate }
}

export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const transition = useCallback(async (callback: () => void, delay = 800) => {
    setIsTransitioning(true)

    setTimeout(() => {
      callback()
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, delay)
  }, [])

  return { isTransitioning, transition }
}
