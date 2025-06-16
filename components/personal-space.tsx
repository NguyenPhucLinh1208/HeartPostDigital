"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Book, Archive, User, PenTool, Heart } from "lucide-react"
import { LetterWriter } from "./letter-writer"

interface PersonalSpaceProps {
  user: string
  onNavigate: (view: "main" | "personal" | "postoffice" | "bulletin") => void
}

export function PersonalSpace({ user, onNavigate }: PersonalSpaceProps) {
  const [activeSection, setActiveSection] = useState<string>("welcome")
  const [showLetterWriter, setShowLetterWriter] = useState(false)

  if (showLetterWriter) {
    return (
      <LetterWriter
        user={user}
        onNavigate={(view) => {
          if (view === "personal") {
            setShowLetterWriter(false)
          } else {
            onNavigate(view)
          }
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-amber-200 p-6">
      {/* Back Button */}
      <Button onClick={() => onNavigate("main")} className="mb-6 bg-amber-700 hover:bg-amber-600 text-amber-100">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Hall
      </Button>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif text-amber-800 mb-8 text-center">Your Personal Space</h1>

        {/* Navigation Menu */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setActiveSection("memory")}
            className={`p-6 rounded-lg transition-all duration-300 ${
              activeSection === "memory" ? "bg-amber-300 scale-105" : "bg-amber-200 hover:bg-amber-250"
            }`}
          >
            <Book className="w-8 h-8 text-amber-700 mx-auto mb-2" />
            <span className="font-serif text-amber-800">Memory Book</span>
          </button>

          <button
            onClick={() => setActiveSection("storage")}
            className={`p-6 rounded-lg transition-all duration-300 ${
              activeSection === "storage" ? "bg-amber-300 scale-105" : "bg-amber-200 hover:bg-amber-250"
            }`}
          >
            <Archive className="w-8 h-8 text-amber-700 mx-auto mb-2" />
            <span className="font-serif text-amber-800">Storage Box</span>
          </button>

          <button
            onClick={() => setActiveSection("profile")}
            className={`p-6 rounded-lg transition-all duration-300 ${
              activeSection === "profile" ? "bg-amber-300 scale-105" : "bg-amber-200 hover:bg-amber-250"
            }`}
          >
            <User className="w-8 h-8 text-amber-700 mx-auto mb-2" />
            <span className="font-serif text-amber-800">Profile</span>
          </button>

          <button
            onClick={() => setActiveSection("write")}
            className={`p-6 rounded-lg transition-all duration-300 ${
              activeSection === "write" ? "bg-amber-300 scale-105" : "bg-amber-200 hover:bg-amber-250"
            }`}
          >
            <PenTool className="w-8 h-8 text-amber-700 mx-auto mb-2" />
            <span className="font-serif text-amber-800">Write Letter</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white p-8 rounded-lg shadow-lg min-h-96">
          {activeSection === "welcome" && (
            <div className="text-center py-20">
              <Heart className="w-24 h-24 text-amber-400 mx-auto mb-6 opacity-50" />
              <h2 className="text-2xl font-serif text-amber-700 mb-4">Welcome to your personal space, {user}!</h2>
              <p className="text-amber-600 font-serif italic">Select an option above to get started</p>
            </div>
          )}

          {activeSection === "memory" && (
            <div>
              <h2 className="text-2xl font-serif text-amber-800 mb-6">Memory Book</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                  <h3 className="font-serif text-amber-800 mb-4">Special People</h3>
                  <p className="text-amber-700">
                    Keep track of important people in your life and your memories with them.
                  </p>
                  <Button className="mt-4 bg-amber-700 hover:bg-amber-600 text-white">Add Person</Button>
                </div>
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                  <h3 className="font-serif text-amber-800 mb-4">Important Dates</h3>
                  <p className="text-amber-700">Remember birthdays, anniversaries, and other special occasions.</p>
                  <Button className="mt-4 bg-amber-700 hover:bg-amber-600 text-white">Add Date</Button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "storage" && (
            <div>
              <h2 className="text-2xl font-serif text-amber-800 mb-6">Storage Box</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Sent Letters */}
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 text-center">
                  <Archive className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-serif text-amber-800 mb-2">Sent Letters</h3>
                  <p className="text-2xl font-bold text-amber-900 mb-1">12</p>
                  <p className="text-sm text-amber-700 mb-4">letters sent</p>
                  <Button className="bg-green-600 hover:bg-green-700 text-white text-sm w-full">View All</Button>
                </div>

                {/* Received Letters */}
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 text-center">
                  <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-lg font-serif text-amber-800 mb-2">Received Letters</h3>
                  <p className="text-2xl font-bold text-amber-900 mb-1">8</p>
                  <p className="text-sm text-amber-700 mb-4">letters received</p>
                  <Button className="bg-red-600 hover:bg-red-700 text-white text-sm w-full">View All</Button>
                </div>

                {/* Unsent Letters */}
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 text-center">
                  <div className="relative mx-auto mb-4">
                    <Archive className="w-12 h-12 text-blue-600" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-serif text-amber-800 mb-2">Unsent Letters</h3>
                  <p className="text-2xl font-bold text-amber-900 mb-1">3</p>
                  <p className="text-sm text-amber-700 mb-4">ready to send</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm w-full">View All</Button>
                </div>

                {/* Draft Letters */}
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 text-center">
                  <div className="relative mx-auto mb-4">
                    <PenTool className="w-12 h-12 text-purple-600" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-serif text-amber-800 mb-2">Draft Letters</h3>
                  <p className="text-2xl font-bold text-amber-900 mb-1">2</p>
                  <p className="text-sm text-amber-700 mb-4">in progress</p>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm w-full">Continue</Button>
                </div>
              </div>

              {/* Detailed Storage Info */}
              <div className="mt-8 bg-white p-6 rounded-lg border border-amber-200">
                <h3 className="text-xl font-serif text-amber-800 mb-4">📋 Storage Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recent Unsent Letters */}
                  <div>
                    <h4 className="font-serif text-amber-800 font-bold mb-3 flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      Recent Unsent Letters
                    </h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <p className="font-serif text-blue-800 text-sm font-bold">To: Sarah Johnson</p>
                        <p className="text-xs text-blue-600">Birthday wishes • Sealed 2 days ago</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <p className="font-serif text-blue-800 text-sm font-bold">To: Mom</p>
                        <p className="text-xs text-blue-600">Thank you letter • Sealed yesterday</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <p className="font-serif text-blue-800 text-sm font-bold">To: John Smith</p>
                        <p className="text-xs text-blue-600">Anniversary letter • Sealed 3 hours ago</p>
                      </div>
                    </div>
                  </div>

                  {/* Draft Letters in Progress */}
                  <div>
                    <h4 className="font-serif text-amber-800 font-bold mb-3 flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                      Draft Letters in Progress
                    </h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                        <p className="font-serif text-purple-800 text-sm font-bold">To: Best Friend</p>
                        <p className="text-xs text-purple-600">Step: Writing content • Last edited 1 hour ago</p>
                        <Button
                          onClick={() => setShowLetterWriter(true)}
                          className="mt-2 bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1"
                        >
                          Continue Writing
                        </Button>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                        <p className="font-serif text-purple-800 text-sm font-bold">To: Grandma</p>
                        <p className="text-xs text-purple-600">Step: Choosing envelope • Last edited 2 days ago</p>
                        <Button
                          onClick={() => setShowLetterWriter(true)}
                          className="mt-2 bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1"
                        >
                          Continue Writing
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 flex justify-center space-x-4">
                <Button
                  onClick={() => setShowLetterWriter(true)}
                  className="bg-amber-700 hover:bg-amber-600 text-white px-6 py-2"
                >
                  ✍️ Write New Letter
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">📤 Send Unsent Letters</Button>
              </div>
            </div>
          )}

          {activeSection === "profile" && (
            <div>
              <h2 className="text-2xl font-serif text-amber-800 mb-6">Your Profile</h2>
              <div className="flex items-start space-x-8">
                <div className="w-32 h-32 bg-amber-200 rounded-full flex items-center justify-center">
                  <User className="w-16 h-16 text-amber-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-serif text-amber-800 mb-2">{user}</h3>
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
                  <Button className="mt-6 bg-amber-700 hover:bg-amber-600 text-white">Edit Profile</Button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "write" && (
            <div>
              <h2 className="text-2xl font-serif text-amber-800 mb-6">Write a New Letter</h2>
              <div className="text-center py-12">
                <PenTool className="w-24 h-24 text-amber-400 mx-auto mb-6" />
                <h3 className="text-xl font-serif text-amber-700 mb-4">Ready to write a heartfelt letter?</h3>
                <p className="text-amber-600 mb-8">
                  Follow our step-by-step process to create the perfect handwritten letter
                </p>
                <Button
                  onClick={() => setShowLetterWriter(true)}
                  className="bg-amber-700 hover:bg-amber-600 text-white text-lg px-8 py-3"
                >
                  Start Letter Writing Studio
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
