"use client"

import { useState, useEffect, useCallback } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 1. Khởi tạo state với giá trị ban đầu.
  //    Điều này đảm bảo server và client render giống nhau lần đầu.
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // 2. Sử dụng useEffect để đọc từ localStorage chỉ ở phía client.
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      // Chỉ cập nhật state nếu có giá trị trong localStorage.
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
    }
  }, [key]) // Chỉ chạy một lần sau khi component được mount.

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)

        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue],
  )

  return [storedValue, setValue] as const
}