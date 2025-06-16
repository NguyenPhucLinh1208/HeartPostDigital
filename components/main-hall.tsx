"use client"

import { useState, useEffect } from "react"
import { Clock, Mail, Users, Heart, Star, Calendar, Award, Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MainHallProps {
  user: string
  onNavigate: (view: "main" | "personal" | "postoffice" | "bulletin") => void
}

export function MainHall({ user, onNavigate }: MainHallProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getTimeGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  }

  const getMotivationalQuote = () => {
    const quotes = [
      "Every letter is a bridge between souls",
      "Handwritten words carry the heart",
      "Distance cannot separate connected hearts",
      "Letters are the language of love",
      "In every envelope lies a piece of someone's heart",
    ]
    return quotes[Math.floor(Math.random() * quotes.length)]
  }

  const navigationItems = [
    {
      id: "personal",
      title: "Your Personal Space",
      shortTitle: "Personal",
      desc: "Memory book, storage, and profile",
      icon: Heart,
      color: "hover:bg-red-50",
      iconColor: "text-red-600",
    },
    {
      id: "postoffice",
      title: "Digital Post Office",
      shortTitle: "Post Office",
      desc: "Send letters and postal services",
      icon: Mail,
      color: "hover:bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: "bulletin",
      title: "Community Board",
      shortTitle: "Community",
      desc: "News, announcements, and stories",
      icon: Users,
      color: "hover:bg-green-50",
      iconColor: "text-green-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-200 flex">
      {/* Fixed Sidebar Navigation */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl transition-all duration-300 ease-in-out z-50 ${
          sidebarOpen ? "w-80" : "w-16"
        } flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-amber-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center">
                <Heart className="w-8 h-8 text-amber-600 mr-3" />
                <h2 className="text-xl font-serif text-amber-800 font-bold">HeartPost</h2>
              </div>
            )}
            <Button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              variant="ghost"
              size="sm"
              className="text-amber-600 hover:bg-amber-50"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* User Info */}
        {sidebarOpen && (
          <div className="p-4 border-b border-amber-200 bg-amber-50">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center mr-3">
                <span className="font-serif font-bold text-amber-800">{user.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <h3 className="font-serif text-amber-800 font-bold">{user}</h3>
                <p className="text-sm text-amber-600">HeartPost Member</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <div
                key={item.id}
                className={`group cursor-pointer rounded-lg transition-all duration-200 ${item.color} ${
                  hoveredNavItem === item.id ? "scale-105 shadow-md" : ""
                }`}
                onMouseEnter={() => setHoveredNavItem(item.id)}
                onMouseLeave={() => setHoveredNavItem(null)}
                onClick={() => onNavigate(item.id as any)}
              >
                <div className="p-4 flex items-center relative">
                  <item.icon className={`w-6 h-6 ${item.iconColor} flex-shrink-0`} />
                  {sidebarOpen && (
                    <>
                      <div className="ml-4 flex-1">
                        <h4 className="font-serif text-amber-800 font-bold text-sm">{item.title}</h4>
                        <p className="text-xs text-amber-600 mt-1">{item.desc}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-amber-400 group-hover:text-amber-600 transition-colors" />
                    </>
                  )}

                  {/* Tooltip for collapsed sidebar */}
                  {!sidebarOpen && (
                    <div className="absolute left-16 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                      {item.shortTitle}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-amber-200">
          {sidebarOpen ? (
            <div className="text-center">
              <p className="text-xs text-amber-600 font-serif italic">"Where hearts connect through letters"</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <Heart className="w-5 h-5 text-amber-400" />
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area with proper margin */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-80" : "ml-16"
        } overflow-auto h-screen`}
      >
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Heart className="w-12 h-12 text-amber-600 mr-4" />
                <h1 className="text-4xl font-serif text-amber-800 font-bold">HeartPost Dashboard</h1>
                <Heart className="w-12 h-12 text-amber-600 ml-4" />
              </div>
              <p className="text-xl text-amber-700 font-serif italic">The Digital Post Office of Hearts</p>
            </div>

            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="text-center">
                <h2 className="text-3xl font-serif text-amber-800 mb-4">
                  {getTimeGreeting()}, {user}!
                </h2>
                <p className="text-lg text-amber-700 font-serif italic mb-6">"{getMotivationalQuote()}"</p>

                {/* Current Time & Date */}
                <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white p-6 rounded-lg shadow-lg inline-block">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-6 h-6 mr-3" />
                    <span className="font-mono text-2xl">{currentTime.toLocaleTimeString()}</span>
                  </div>
                  <p className="font-serif text-lg">
                    {currentTime.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Stats & Activities */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-serif text-amber-800 mb-4 flex items-center">
                    <Award className="w-6 h-6 mr-2" />
                    Your Statistics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                      <div className="flex items-center">
                        <Mail className="w-6 h-6 text-amber-600 mr-3" />
                        <span className="font-serif text-amber-800">Letters Sent</span>
                      </div>
                      <span className="text-3xl font-bold text-amber-900">12</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                      <div className="flex items-center">
                        <Heart className="w-6 h-6 text-amber-600 mr-3" />
                        <span className="font-serif text-amber-800">Letters Received</span>
                      </div>
                      <span className="text-3xl font-bold text-amber-900">8</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                      <div className="flex items-center">
                        <Users className="w-6 h-6 text-amber-600 mr-3" />
                        <span className="font-serif text-amber-800">Friends</span>
                      </div>
                      <span className="text-3xl font-bold text-amber-900">25</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-serif text-amber-800 mb-4 flex items-center">
                    <Star className="w-6 h-6 mr-2" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <p className="font-serif text-green-800">Letter sent to Sarah Johnson</p>
                      <p className="text-sm text-green-600">2 hours ago</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <p className="font-serif text-blue-800">Letter received from Mom</p>
                      <p className="text-sm text-blue-600">Yesterday</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <p className="font-serif text-purple-800">New friend added: Mike Chen</p>
                      <p className="text-sm text-purple-600">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Tips & Community */}
              <div className="space-y-6">
                {/* Upcoming Events */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-serif text-amber-800 mb-4 flex items-center">
                    <Calendar className="w-6 h-6 mr-2" />
                    Upcoming Events
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="font-serif text-amber-800 font-bold">Sarah's Birthday</p>
                      <p className="text-sm text-amber-600">December 25, 2024</p>
                      <Button className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm">
                        Send Birthday Letter
                      </Button>
                    </div>
                    <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                      <p className="font-serif text-amber-800 font-bold">Anniversary with John</p>
                      <p className="text-sm text-amber-600">January 14, 2025</p>
                      <Button className="mt-2 bg-pink-600 hover:bg-pink-700 text-white text-sm">
                        Plan Anniversary Letter
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Daily Tip */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-serif text-amber-800 mb-4">💡 Daily Tip</h3>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="font-serif text-amber-800 italic">
                      "Add a personal touch to your letters by including a small drawing or doodle. It shows extra care
                      and makes your letter unique!"
                    </p>
                  </div>
                </div>

                {/* Community Highlights */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-serif text-amber-800 mb-4">🌟 Community Highlights</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <p className="text-sm font-serif text-amber-800">
                        "Amazing letter from grandma brought tears to my eyes!"
                      </p>
                      <p className="text-xs text-amber-600">- Sarah M.</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <p className="text-sm font-serif text-amber-800">
                        "HeartPost helped me reconnect with old friends."
                      </p>
                      <p className="text-xs text-amber-600">- Mike C.</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => onNavigate("bulletin")}
                    className="w-full mt-4 bg-amber-700 hover:bg-amber-600 text-white"
                  >
                    Read More Stories
                  </Button>
                </div>
              </div>
            </div>

            {/* Footer Quote */}
            <div className="text-center mt-8 p-6 bg-gradient-to-r from-amber-800 to-amber-900 text-white rounded-lg shadow-lg">
              <p className="font-serif text-lg italic">
                "In a world of instant messages, a handwritten letter is a treasure that lasts forever."
              </p>
            </div>

            {/* Extra content to demonstrate scrolling */}
            <div className="mt-8 space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-serif text-amber-800 mb-4">📚 Letter Writing Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-serif text-blue-800 font-bold mb-2">Start with warmth</h4>
                    <p className="text-sm text-blue-700">
                      Begin your letter with a personal greeting that shows you care.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-serif text-green-800 font-bold mb-2">Share memories</h4>
                    <p className="text-sm text-green-700">Include shared experiences to create emotional connection.</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-serif text-purple-800 font-bold mb-2">Be authentic</h4>
                    <p className="text-sm text-purple-700">
                      Write in your natural voice, don't try to be someone else.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-serif text-orange-800 font-bold mb-2">End with love</h4>
                    <p className="text-sm text-orange-700">Close with a heartfelt message that leaves them smiling.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
