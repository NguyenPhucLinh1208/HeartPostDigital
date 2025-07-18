"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { Clock, Mail, Users, Heart, Star, Calendar, Award, Menu, X, ChevronRight, LogOut, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"
import { useAnimation } from "@/hooks/useAnimation"

interface MainHallProps {
  user: string
  onNavigate: (view: "main" | "personal" | "postoffice" | "bulletin") => void
  onLogout: () => void
}

export const MainHall = React.memo<MainHallProps>(({ user, onNavigate, onLogout }) => {
  // Khởi tạo là null để tránh lỗi hydration
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const { animate } = useAnimation()

  // Chỉ chạy ở client để cập nhật thời gian
  useEffect(() => {
    setCurrentTime(new Date()) // Set thời gian lần đầu
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const timeGreeting = useMemo(() => {
    if (!currentTime) return "Welcome" // Trả về giá trị tĩnh khi currentTime là null
    const hour = currentTime.getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  }, [currentTime])

  const motivationalQuote = useMemo(() => {
    const quotes = [
      "Every letter is a bridge between souls",
      "Handwritten words carry the heart",
      "Distance cannot separate connected hearts",
      "Letters are the language of love",
      "In every envelope lies a piece of someone's heart",
    ]
    // Sử dụng index cố định hoặc logic không phụ thuộc Math.random() trong render đầu tiên
    return quotes[0]
  }, [])

  const navigationItems = useMemo(
    () => [
      {
        id: "personal",
        title: "Your Personal Space",
        shortTitle: "Personal",
        desc: "Memory book, storage, and profile",
        icon: Heart,
        color: "hover:bg-red-50 hover:border-red-200",
        iconColor: "text-red-600",
        bgGradient: "from-red-50 to-red-100",
      },
      {
        id: "postoffice",
        title: "Digital Post Office",
        shortTitle: "Post Office",
        desc: "Send letters and postal services",
        icon: Mail,
        color: "hover:bg-blue-50 hover:border-blue-200",
        iconColor: "text-blue-600",
        bgGradient: "from-blue-50 to-blue-100",
      },
      {
        id: "bulletin",
        title: "Community Board",
        shortTitle: "Community",
        desc: "News, announcements, and stories",
        icon: Users,
        color: "hover:bg-green-50 hover:border-green-200",
        iconColor: "text-green-600",
        bgGradient: "from-green-50 to-green-100",
      },
    ],
    [],
  )

  const notifications = [
    {
      id: 1,
      title: "System Maintenance",
      message: "Scheduled maintenance on Dec 16, 2024 from 2:00 AM to 4:00 AM",
      time: "2 hours ago",
      type: "system",
      read: false,
    },
    {
      id: 2,
      title: "New Feature Available",
      message: "You can now schedule letters to be sent at future dates!",
      time: "1 day ago",
      type: "feature",
      read: false,
    },
    {
      id: 3,
      title: "Welcome to HeartPost",
      message: "Thank you for joining our community of letter writers!",
      time: "3 days ago",
      type: "welcome",
      read: true,
    },
  ]

  const handleNavigation = useCallback(
    (view: "personal" | "postoffice" | "bulletin") => {
      animate(() => onNavigate(view))
    },
    [animate, onNavigate],
  )

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  const toggleNotifications = useCallback(() => {
    setShowNotifications((prev) => !prev)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex">
      {/* Enhanced Fixed Sidebar - giữ nguyên */}
      <div
        className={`fixed top-0 left-0 h-full bg-white/95 backdrop-blur-md shadow-2xl transition-all duration-500 ease-in-out z-50 ${
          sidebarOpen ? "w-80" : "w-16"
        } flex flex-col border-r border-amber-200/50`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-amber-200/50 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <FadeIn>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-serif text-amber-800 font-bold">HeartPost</h2>
                </div>
              </FadeIn>
            )}
            <Button
              onClick={toggleSidebar}
              variant="ghost"
              size="sm"
              className="text-amber-600 hover:bg-amber-100 transition-colors duration-200"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Enhanced User Info */}
        {sidebarOpen && (
          <FadeIn delay={100}>
            <div className="p-4 border-b border-amber-200/50 bg-gradient-to-r from-amber-50/50 to-orange-50/50">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mr-3 shadow-lg ring-2 ring-amber-200">
                  <span className="font-serif font-bold text-white text-lg">{user.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-amber-800 font-bold">{user}</h3>
                  <p className="text-sm text-amber-600">HeartPost Member</p>
                </div>
                <Button
                  onClick={onLogout}
                  variant="ghost"
                  size="sm"
                  className="text-amber-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Enhanced Navigation Items - Fixed collapsed state */}
        <div className="flex-1 p-2 overflow-y-auto">
          <div className="space-y-3">
            {navigationItems.map((item, index) => (
              <FadeIn key={item.id} delay={200 + index * 100}>
                <div
                  className={`group cursor-pointer rounded-xl border-2 border-transparent transition-all duration-300 ${item.color} ${
                    hoveredNavItem === item.id ? "scale-105 shadow-lg border-opacity-50" : ""
                  }`}
                  onMouseEnter={() => setHoveredNavItem(item.id)}
                  onMouseLeave={() => setHoveredNavItem(null)}
                  onClick={() => handleNavigation(item.id as any)}
                >
                  <div
                    className={`${sidebarOpen ? "p-4" : "p-3"} flex items-center relative overflow-hidden justify-center`}
                  >
                    {/* Background gradient on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${item.bgGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl`}
                    ></div>

                    <div
                      className={`${sidebarOpen ? "w-10 h-10" : "w-8 h-8"} rounded-lg flex items-center justify-center ${item.iconColor} bg-white shadow-md group-hover:shadow-lg transition-all duration-300 flex-shrink-0 relative z-10`}
                    >
                      <item.icon className={`${sidebarOpen ? "w-5 h-5" : "w-4 h-4"}`} />
                    </div>

                    {sidebarOpen && (
                      <>
                        <div className="ml-4 flex-1 relative z-10">
                          <h4 className="font-serif text-amber-800 font-bold text-sm group-hover:text-amber-900 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-amber-600 mt-1 group-hover:text-amber-700 transition-colors">
                            {item.desc}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-amber-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all duration-300 relative z-10" />
                      </>
                    )}

                    {/* Tooltip for collapsed sidebar - Fixed positioning */}
                    {!sidebarOpen && (
                      <div className="absolute left-14 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-lg">
                        {item.shortTitle}
                        <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Enhanced Sidebar Footer */}
        <div className="p-4 border-t border-amber-200/50 bg-gradient-to-r from-amber-50/30 to-orange-50/30">
          {sidebarOpen ? (
            <FadeIn>
              <div className="text-center">
                <p className="text-xs text-amber-600 font-serif italic">"Where hearts connect through letters"</p>
              </div>
            </FadeIn>
          ) : (
            <div className="flex justify-center">
              <Heart className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Main Content Area */}
      <div
        className={`flex-1 transition-all duration-500 ease-in-out ${
          sidebarOpen ? "ml-80" : "ml-16"
        } flex flex-col h-screen`}
      >
        {/* Fixed Header - Compact Design */}
        <div
          className={`fixed top-0 z-30 bg-gradient-to-r from-amber-50/95 via-orange-50/95 to-amber-100/95 backdrop-blur-md border-b border-amber-200/50 shadow-lg transition-all duration-500 ${sidebarOpen ? "left-80" : "left-16"} right-0`}
        >
          <div className="px-6 py-3">
            <FadeIn delay={300}>
              <div className="flex items-center justify-center relative max-w-4xl mx-auto">
                {/* Left side - Compact Title */}
                <div className="flex items-center">
                  <Heart className="w-6 h-6 text-amber-600 mr-2 animate-pulse" />
                  <div>
                    <h1 className="text-lg font-serif text-amber-800 font-bold leading-tight">HeartPost Dashboard</h1>
                    <p className="text-xs text-amber-600 font-serif italic leading-tight">
                      Digital Post Office of Hearts
                    </p>
                  </div>
                </div>

                {/* Right side - Notification Bell - positioned absolutely */}
                <div className="absolute right-0">
                  {/* Right side - Notification Bell */}
                  <div className="relative">
                    <Button
                      onClick={toggleNotifications}
                      className="relative bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                      title="System Notifications"
                    >
                      <Bell className="w-5 h-5" />
                      {/* Notification badge */}
                      {unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                          <span className="text-white text-xs font-bold">{unreadCount}</span>
                        </div>
                      )}
                    </Button>

                    {/* Notification Dropdown with highest z-index */}
                    {showNotifications && (
                      <FadeIn>
                        <div className="absolute top-12 right-0 w-80 bg-white rounded-xl shadow-2xl border border-amber-200 z-[9999] max-h-96 overflow-y-auto">
                          {/* Header */}
                          <div className="p-4 border-b border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
                            <div className="flex items-center justify-between">
                              <h3 className="font-serif text-amber-800 font-bold">Notifications</h3>
                              <Button
                                onClick={toggleNotifications}
                                variant="ghost"
                                size="sm"
                                className="text-amber-600 hover:bg-amber-100"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Notifications List */}
                          <div className="max-h-80 overflow-y-auto">
                            {notifications.map((notification, index) => (
                              <div
                                key={notification.id}
                                className={`p-4 border-b border-amber-100 hover:bg-amber-25 transition-colors cursor-pointer ${
                                  !notification.read ? "bg-amber-50/50" : ""
                                }`}
                              >
                                <div className="flex items-start space-x-3">
                                  {/* Notification Icon */}
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                      notification.type === "system"
                                        ? "bg-blue-100 text-blue-600"
                                        : notification.type === "feature"
                                          ? "bg-green-100 text-green-600"
                                          : "bg-purple-100 text-purple-600"
                                    }`}
                                  >
                                    <Bell className="w-4 h-4" />
                                  </div>

                                  {/* Notification Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                      <h4 className="font-serif text-amber-800 font-bold text-sm truncate">
                                        {notification.title}
                                      </h4>
                                      {!notification.read && (
                                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                                      )}
                                    </div>
                                    <p className="text-amber-700 text-xs mb-2 line-clamp-2">{notification.message}</p>
                                    <p className="text-amber-500 text-xs">{notification.time}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Footer */}
                          <div className="p-3 bg-gray-50 border-t border-amber-200">
                            <div className="flex justify-between items-center">
                              <Button variant="ghost" size="sm" className="text-amber-600 hover:bg-amber-100 text-xs">
                                Mark all as read
                              </Button>
                              <Button variant="ghost" size="sm" className="text-amber-600 hover:bg-amber-100 text-xs">
                                View all
                              </Button>
                            </div>
                          </div>
                        </div>
                      </FadeIn>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto pt-16">
          <div className="p-6">
            <div className="max-w-6xl mx-auto">
              {/* Enhanced Welcome Section */}
              <FadeIn delay={500}>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8 mb-8 border border-amber-200/50">
                  <div className="text-center">
                    <h2 className="text-3xl font-serif text-amber-800 mb-4">
                      {timeGreeting}, {user}!
                    </h2>
                    <p className="text-lg text-amber-700 font-serif italic mb-6">"{motivationalQuote}"</p>

                    {/* Enhanced Time Display: Hiển thị khi thời gian đã sẵn sàng */}
                    {currentTime && (
                      <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white p-6 rounded-xl shadow-lg inline-block relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-700/20 to-amber-600/20 animate-pulse"></div>
                        <div className="flex items-center justify-center mb-2 relative z-10">
                          <Clock className="w-6 h-6 mr-3" />
                          <span className="font-mono text-2xl">{currentTime.toLocaleTimeString()}</span>
                        </div>
                        <p className="font-serif text-lg relative z-10">
                          {currentTime.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>

              {/* Enhanced Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Enhanced Stats & Activities */}
                <div className="space-y-6">
                  <FadeIn delay={700}>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-amber-200/50">
                      <h3 className="text-xl font-serif text-amber-800 mb-4 flex items-center">
                        <Award className="w-6 h-6 mr-2" />
                        Your Statistics
                      </h3>
                      <div className="space-y-4">
                        {[
                          { icon: Mail, label: "Letters Sent", value: 12, color: "text-green-600", bg: "bg-green-50" },
                          { icon: Heart, label: "Letters Received", value: 8, color: "text-red-600", bg: "bg-red-50" },
                          { icon: Users, label: "Friends", value: 25, color: "text-blue-600", bg: "bg-blue-50" },
                        ].map((stat, index) => (
                          <FadeIn key={stat.label} delay={800 + index * 100}>
                            <div
                              className={`flex items-center justify-between p-4 ${stat.bg} rounded-lg border border-opacity-20 hover:shadow-md transition-all duration-300 group`}
                            >
                              <div className="flex items-center">
                                <div
                                  className={`w-10 h-10 ${stat.color} bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm group-hover:shadow-md transition-shadow`}
                                >
                                  <stat.icon className="w-5 h-5" />
                                </div>
                                <span className="font-serif text-amber-800">{stat.label}</span>
                              </div>
                              <span className="text-3xl font-bold text-amber-900 group-hover:scale-110 transition-transform">
                                {stat.value}
                              </span>
                            </div>
                          </FadeIn>
                        ))}
                      </div>
                    </div>
                  </FadeIn>

                  {/* Enhanced Recent Activity */}
                  <FadeIn delay={900}>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-amber-200/50">
                      <h3 className="text-xl font-serif text-amber-800 mb-4 flex items-center">
                        <Star className="w-6 h-6 mr-2" />
                        Recent Activity
                      </h3>
                      <div className="space-y-3">
                        {[
                          { text: "Letter sent to Sarah Johnson", time: "2 hours ago", color: "green" },
                          { text: "Letter received from Mom", time: "Yesterday", color: "blue" },
                          { text: "New friend added: Mike Chen", time: "3 days ago", color: "purple" },
                        ].map((activity, index) => (
                          <FadeIn key={index} delay={1000 + index * 100}>
                            <div
                              className={`p-4 bg-${activity.color}-50 rounded-lg border-l-4 border-${activity.color}-500 hover:shadow-md transition-all duration-300 hover:translate-x-1`}
                            >
                              <p className={`font-serif text-${activity.color}-800`}>{activity.text}</p>
                              <p className={`text-sm text-${activity.color}-600`}>{activity.time}</p>
                            </div>
                          </FadeIn>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                </div>

                {/* Right Column - Enhanced Tips & Community */}
                <div className="space-y-6">
                  <FadeIn delay={1100}>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-amber-200/50">
                      <h3 className="text-xl font-serif text-amber-800 mb-4 flex items-center">
                        <Calendar className="w-6 h-6 mr-2" />
                        Upcoming Events
                      </h3>
                      <div className="space-y-3">
                        {[
                          { name: "Sarah's Birthday", date: "December 25, 2024", color: "yellow" },
                          { name: "Anniversary with John", date: "January 14, 2025", color: "pink" },
                        ].map((event, index) => (
                          <FadeIn key={event.name} delay={1200 + index * 100}>
                            <div
                              className={`p-4 bg-${event.color}-50 rounded-lg border border-${event.color}-200 hover:shadow-md transition-all duration-300 group`}
                            >
                              <p className="font-serif text-amber-800 font-bold">{event.name}</p>
                              <p className="text-sm text-amber-600 mb-2">{event.date}</p>
                              <Button
                                className={`bg-${event.color}-600 hover:bg-${event.color}-700 text-white text-sm group-hover:scale-105 transition-transform`}
                              >
                                {event.name.includes("Birthday") ? "Send Birthday Letter" : "Plan Anniversary Letter"}
                              </Button>
                            </div>
                          </FadeIn>
                        ))}
                      </div>
                    </div>
                  </FadeIn>

                  <FadeIn delay={1300}>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-amber-200/50">
                      <h3 className="text-xl font-serif text-amber-800 mb-4">💡 Daily Tip</h3>
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                        <p className="font-serif text-amber-800 italic">
                          "Add a personal touch to your letters by including a small drawing or doodle. It shows extra
                          care and makes your letter unique!"
                        </p>
                      </div>
                    </div>
                  </FadeIn>

                  <FadeIn delay={1400}>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-amber-200/50">
                      <h3 className="text-xl font-serif text-amber-800 mb-4">🌟 Community Highlights</h3>
                      <div className="space-y-3">
                        {[
                          { text: "Amazing letter from grandma brought tears to my eyes!", author: "Sarah M." },
                          { text: "HeartPost helped me reconnect with old friends.", author: "Mike C." },
                        ].map((highlight, index) => (
                          <FadeIn key={index} delay={1500 + index * 100}>
                            <div className="p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-300">
                              <p className="text-sm font-serif text-amber-800">"{highlight.text}"</p>
                              <p className="text-xs text-amber-600">- {highlight.author}</p>
                            </div>
                          </FadeIn>
                        ))}
                      </div>
                      <Button
                        onClick={() => handleNavigation("bulletin")}
                        className="w-full mt-4 bg-amber-700 hover:bg-amber-600 text-white hover:scale-105 transition-transform"
                      >
                        Read More Stories
                      </Button>
                    </div>
                  </FadeIn>
                </div>
              </div>

              {/* Enhanced Footer Quote */}
              <FadeIn delay={1600}>
                <div className="text-center mt-8 p-6 bg-gradient-to-r from-amber-800 to-amber-900 text-white rounded-xl shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-700/20 to-amber-600/20 animate-pulse"></div>
                  <p className="font-serif text-lg italic relative z-10">
                    "In a world of instant messages, a handwritten letter is a treasure that lasts forever."
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to close notifications when clicking outside - with highest z-index */}
      {showNotifications && <div className="fixed inset-0 z-[9998]" onClick={toggleNotifications}></div>}
    </div>
  )
})

MainHall.displayName = "MainHall"