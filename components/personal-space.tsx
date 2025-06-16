"use client"

import React, { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Book, Archive, User, PenTool, Heart } from "lucide-react"
import { LetterWriter } from "./letter-writer"
import { FadeIn } from "@/components/ui/fade-in"

interface PersonalSpaceProps {
  user: string
  onNavigate: (view: "main" | "personal" | "postoffice" | "bulletin") => void
}

export const PersonalSpace = React.memo<PersonalSpaceProps>(({ user, onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>("welcome")
  const [showLetterWriter, setShowLetterWriter] = useState(false)

  const handleLetterWriterNavigation = useCallback(
    (view: "main" | "personal" | "postoffice" | "bulletin") => {
      if (view === "personal") {
        setShowLetterWriter(false)
      } else {
        onNavigate(view)
      }
    },
    [onNavigate],
  )

  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section)
  }, [])

  if (showLetterWriter) {
    return <LetterWriter user={user} onNavigate={handleLetterWriterNavigation} />
  }

  const menuItems = [
    { id: "memory", title: "Memory Book", icon: Book, desc: "Your memories and special moments" },
    { id: "storage", title: "Storage Box", icon: Archive, desc: "Letters and drafts collection" },
    { id: "profile", title: "Profile", icon: User, desc: "Your account information" },
    { id: "write", title: "Write Letter", icon: PenTool, desc: "Create a new heartfelt letter" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 p-4 sm:p-6">
      {/* Back Button */}
      <FadeIn>
        <Button onClick={() => onNavigate("main")} className="mb-6 bg-amber-700 hover:bg-amber-600 text-amber-100">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hall
        </Button>
      </FadeIn>

      <div className="max-w-6xl mx-auto">
        <FadeIn delay={200}>
          <h1 className="text-2xl sm:text-3xl font-serif text-amber-800 mb-8 text-center">Your Personal Space</h1>
        </FadeIn>

        {/* Enhanced Navigation Menu */}
        <FadeIn delay={400}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {menuItems.map((item, index) => (
              <FadeIn key={item.id} delay={500 + index * 100}>
                <button
                  onClick={() => handleSectionChange(item.id)}
                  className={`p-4 sm:p-6 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    activeSection === item.id
                      ? "bg-amber-300 scale-105 shadow-xl"
                      : "bg-amber-200/80 hover:bg-amber-250 hover:scale-102 shadow-lg"
                  }`}
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10 text-center">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 rounded-lg bg-white shadow-md flex items-center justify-center transition-all duration-300 ${
                        activeSection === item.id ? "scale-110" : "group-hover:scale-105"
                      }`}
                    >
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700" />
                    </div>
                    <h3 className="font-serif text-amber-800 font-bold text-sm sm:text-base mb-1">{item.title}</h3>
                    <p className="text-xs text-amber-600 hidden sm:block">{item.desc}</p>
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

        {/* Enhanced Content Area */}
        <FadeIn delay={800}>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 min-h-96 border border-amber-200/50">
            {activeSection === "welcome" && (
              <div className="text-center py-12 sm:py-20">
                <Heart className="w-16 h-16 sm:w-24 sm:h-24 text-amber-400 mx-auto mb-6 opacity-50 animate-pulse" />
                <h2 className="text-xl sm:text-2xl font-serif text-amber-700 mb-4">
                  Welcome to your personal space, {user}!
                </h2>
                <p className="text-amber-600 font-serif italic">Select an option above to get started</p>
              </div>
            )}

            {activeSection === "memory" && (
              <div>
                <h2 className="text-xl sm:text-2xl font-serif text-amber-800 mb-6">Memory Book</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 hover:shadow-md transition-shadow">
                    <h3 className="font-serif text-amber-800 mb-4 text-lg">Special People</h3>
                    <p className="text-amber-700 mb-4">
                      Keep track of important people in your life and your memories with them.
                    </p>
                    <Button className="bg-amber-700 hover:bg-amber-600 text-white btn-hover-lift">Add Person</Button>
                  </div>
                  <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 hover:shadow-md transition-shadow">
                    <h3 className="font-serif text-amber-800 mb-4 text-lg">Important Dates</h3>
                    <p className="text-amber-700 mb-4">
                      Remember birthdays, anniversaries, and other special occasions.
                    </p>
                    <Button className="bg-amber-700 hover:bg-amber-600 text-white btn-hover-lift">Add Date</Button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "storage" && (
              <div>
                <h2 className="text-xl sm:text-2xl font-serif text-amber-800 mb-6">Storage Box</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {/* Storage items with enhanced design */}
                  {[
                    { title: "Sent Letters", count: 12, icon: Archive, color: "green", desc: "letters sent" },
                    { title: "Received Letters", count: 8, icon: Heart, color: "red", desc: "letters received" },
                    {
                      title: "Unsent Letters",
                      count: 3,
                      icon: Archive,
                      color: "blue",
                      desc: "ready to send",
                      badge: "!",
                    },
                    {
                      title: "Draft Letters",
                      count: 2,
                      icon: PenTool,
                      color: "purple",
                      desc: "in progress",
                      badge: "2",
                    },
                  ].map((item, index) => (
                    <FadeIn key={item.title} delay={900 + index * 100}>
                      <div className="bg-amber-50 p-4 sm:p-6 rounded-lg border border-amber-200 text-center hover:shadow-lg transition-all duration-300 group">
                        <div className="relative mx-auto mb-4">
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white shadow-md flex items-center justify-center text-${item.color}-600 group-hover:scale-110 transition-transform`}
                          >
                            <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          {item.badge && (
                            <div
                              className={`absolute -top-1 -right-1 w-4 h-4 ${
                                item.badge === "!" ? "bg-orange-500" : "bg-yellow-500"
                              } rounded-full flex items-center justify-center`}
                            >
                              <span className="text-white text-xs font-bold">{item.badge}</span>
                            </div>
                          )}
                        </div>
                        <h3 className="text-sm sm:text-lg font-serif text-amber-800 mb-2">{item.title}</h3>
                        <p className="text-xl sm:text-2xl font-bold text-amber-900 mb-1">{item.count}</p>
                        <p className="text-xs text-amber-700 mb-4">{item.desc}</p>
                        <Button
                          className={`bg-${item.color}-600 hover:bg-${item.color}-700 text-white text-xs sm:text-sm w-full btn-hover-lift`}
                        >
                          View All
                        </Button>
                      </div>
                    </FadeIn>
                  ))}
                </div>

                {/* Enhanced Storage Details */}
                <div className="mt-8 bg-white p-6 rounded-lg border border-amber-200 shadow-sm">
                  <h3 className="text-lg sm:text-xl font-serif text-amber-800 mb-4">📋 Storage Details</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Unsent Letters */}
                    <div>
                      <h4 className="font-serif text-amber-800 font-bold mb-3 flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        Recent Unsent Letters
                      </h4>
                      <div className="space-y-2">
                        {[
                          { to: "Sarah Johnson", subject: "Birthday wishes", time: "2 days ago" },
                          { to: "Mom", subject: "Thank you letter", time: "yesterday" },
                          { to: "John Smith", subject: "Anniversary letter", time: "3 hours ago" },
                        ].map((letter, index) => (
                          <div
                            key={index}
                            className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500 hover:bg-blue-100 transition-colors"
                          >
                            <p className="font-serif text-blue-800 text-sm font-bold">To: {letter.to}</p>
                            <p className="text-xs text-blue-600">
                              {letter.subject} • Sealed {letter.time}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Draft Letters in Progress */}
                    <div>
                      <h4 className="font-serif text-amber-800 font-bold mb-3 flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        Draft Letters in Progress
                      </h4>
                      <div className="space-y-2">
                        {[
                          { to: "Best Friend", step: "Writing content", time: "1 hour ago" },
                          { to: "Grandma", step: "Choosing envelope", time: "2 days ago" },
                        ].map((draft, index) => (
                          <div
                            key={index}
                            className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500 hover:bg-purple-100 transition-colors"
                          >
                            <p className="font-serif text-purple-800 text-sm font-bold">To: {draft.to}</p>
                            <p className="text-xs text-purple-600 mb-2">
                              Step: {draft.step} • Last edited {draft.time}
                            </p>
                            <Button
                              onClick={() => setShowLetterWriter(true)}
                              className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 btn-hover-lift"
                            >
                              Continue Writing
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    onClick={() => setShowLetterWriter(true)}
                    className="bg-amber-700 hover:bg-amber-600 text-white px-6 py-2 btn-hover-lift"
                  >
                    ✍️ Write New Letter
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 btn-hover-lift">
                    📤 Send Unsent Letters
                  </Button>
                </div>
              </div>
            )}

            {activeSection === "profile" && (
              <div>
                <h2 className="text-xl sm:text-2xl font-serif text-amber-800 mb-6">Your Profile</h2>
                <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-8">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg mx-auto sm:mx-0">
                    <User className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-serif text-amber-800 mb-2">{user}</h3>
                    <p className="text-amber-700 mb-4">HeartPost Member since 2024</p>
                    <div className="space-y-2 text-amber-700">
                      <p>
                        <strong>Member ID:</strong> HP-{user.toUpperCase()}-2024
                      </p>
                      <p>
                        <strong>Letters Sent:</strong> 12
                      </p>
                      <p>
                        <strong>Letters Received:</strong> 8
                      </p>
                      <p>
                        <strong>Friends:</strong> 25
                      </p>
                    </div>
                    <Button className="mt-6 bg-amber-700 hover:bg-amber-600 text-white btn-hover-lift">
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "write" && (
              <div>
                <h2 className="text-xl sm:text-2xl font-serif text-amber-800 mb-6">Write a New Letter</h2>
                <div className="text-center py-8 sm:py-12">
                  <PenTool className="w-16 h-16 sm:w-24 sm:h-24 text-amber-400 mx-auto mb-6 animate-bounce-gentle" />
                  <h3 className="text-lg sm:text-xl font-serif text-amber-700 mb-4">
                    Ready to write a heartfelt letter?
                  </h3>
                  <p className="text-amber-600 mb-8 max-w-md mx-auto">
                    Follow our step-by-step process to create the perfect handwritten letter
                  </p>
                  <Button
                    onClick={() => setShowLetterWriter(true)}
                    className="bg-amber-700 hover:bg-amber-600 text-white text-lg px-8 py-3 btn-hover-lift"
                  >
                    Start Letter Writing Studio
                  </Button>
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  )
})

PersonalSpace.displayName = "PersonalSpace"
