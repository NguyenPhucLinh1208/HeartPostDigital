"use client"

import React, { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Book, Archive, User, PenTool, Heart, Calendar, Bell, X } from "lucide-react"
import { LetterWriter } from "./letter-writer"
import { FadeIn } from "@/components/ui/fade-in"

interface PersonalSpaceProps {
  user: string
  onNavigate: (view: "main" | "personal" | "postoffice" | "bulletin") => void
}

export const PersonalSpace = React.memo<PersonalSpaceProps>(({ user, onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>("welcome")
  const [showLetterWriter, setShowLetterWriter] = useState(false)

  const [selectedPerson, setSelectedPerson] = useState<any>(null)
  const [showPersonModal, setShowPersonModal] = useState(false)
  const [editingDescription, setEditingDescription] = useState(false)
  const [personDescription, setPersonDescription] = useState("")
  const [showAddDateForm, setShowAddDateForm] = useState(false)
  const [newDateTitle, setNewDateTitle] = useState("")
  const [newDate, setNewDate] = useState("")
  const [newDateDescription, setNewDateDescription] = useState("")

  const [editingProfile, setEditingProfile] = useState(false)
  const [userProfile, setUserProfile] = useState({
    birthday: "",
    location: "",
    bio: "",
    emailNotifications: true,
    publicProfile: false,
  })
  const [editedProfile, setEditedProfile] = useState({
    displayName: user,
    birthday: "",
    location: "",
    bio: "",
    emailNotifications: true,
    publicProfile: false,
  })

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

  const handlePersonClick = useCallback((person: any) => {
    setSelectedPerson(person)
    setPersonDescription(person.description || `${person.name} - ${person.relationship}`)
    setShowPersonModal(true)
  }, [])

  const handleSaveDescription = useCallback(() => {
    setEditingDescription(false)
    // Here you would save to your data store
  }, [])

  const handleAddSpecialDate = useCallback(() => {
    if (newDate && newDateTitle && newDateDescription) {
      // Add the new date to the person's special dates
      // This would typically update your data store
      alert(`Added special date: ${newDateTitle} on ${newDate}`)
      setShowAddDateForm(false)
      setNewDate("")
      setNewDateTitle("")
      setNewDateDescription("")
    }
  }, [newDate, newDateTitle, newDateDescription])

  const handleSaveProfile = useCallback(() => {
    setUserProfile({
      birthday: editedProfile.birthday,
      location: editedProfile.location,
      bio: editedProfile.bio,
      emailNotifications: editedProfile.emailNotifications,
      publicProfile: editedProfile.publicProfile,
    })
    setEditingProfile(false)
    alert("Profile updated successfully!")
  }, [editedProfile])

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
    <>
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 flex flex-col">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-30 bg-gradient-to-r from-amber-50/95 via-orange-50/95 to-amber-100/95 backdrop-blur-md border-b border-amber-200/50 shadow-lg">
          <div className="px-6 py-3">
            <FadeIn delay={300}>
              <div className="flex items-center justify-center relative max-w-4xl mx-auto">
                {/* Left side - Back Button */}
                <div className="absolute left-0">
                  <Button onClick={() => onNavigate("main")} className="bg-amber-700 hover:bg-amber-600 text-amber-100">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Hall
                  </Button>
                </div>

                {/* Center - Title */}
                <div className="flex items-center">
                  <Heart className="w-6 h-6 text-amber-600 mr-2 animate-pulse" />
                  <div>
                    <h1 className="text-lg font-serif text-amber-800 font-bold leading-tight">Your Personal Space</h1>
                    <p className="text-xs text-amber-600 font-serif italic leading-tight">
                      Memory book, storage, and profile
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto pt-16">
          <div className="p-4 sm:p-6">
            <div className="max-w-6xl mx-auto">
              <FadeIn delay={200}>
                <h1 className="text-2xl sm:text-3xl font-serif text-amber-800 mb-8 text-center">
                  Your Personal Space
                </h1>
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
                          <h3 className="font-serif text-amber-800 font-bold text-sm sm:text-base mb-1">
                            {item.title}
                          </h3>
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
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Special People Section */}
                        <div className="space-y-4">
                          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-serif text-amber-800 text-lg flex items-center">
                                <Heart className="w-5 h-5 mr-2 text-red-500" />
                                Special People
                              </h3>
                              <Button className="bg-amber-700 hover:bg-amber-600 text-white text-sm px-3 py-1">
                                Add Person
                              </Button>
                            </div>
                            <p className="text-amber-700 mb-4 text-sm">
                              Keep track of important people in your life and their special moments.
                            </p>

                            {/* People List */}
                            <div className="space-y-3">
                              {[
                                {
                                  name: "Mom",
                                  relationship: "Family",
                                  birthday: "March 15",
                                  avatar: "M",
                                  color: "bg-red-500",
                                  description: "My wonderful mother",
                                },
                                {
                                  name: "Sarah Johnson",
                                  relationship: "Best Friend",
                                  birthday: "July 22",
                                  avatar: "S",
                                  color: "bg-blue-500",
                                  description: "My best friend since childhood",
                                },
                                {
                                  name: "John Smith",
                                  relationship: "Partner",
                                  birthday: "December 10",
                                  avatar: "J",
                                  color: "bg-green-500",
                                  description: "My loving partner",
                                },
                                {
                                  name: "Grandma",
                                  relationship: "Family",
                                  birthday: "September 5",
                                  avatar: "G",
                                  color: "bg-purple-500",
                                  description: "My sweet grandma",
                                },
                              ].map((person, index) => (
                                <FadeIn key={person.name} delay={1000 + index * 100}>
                                  <div
                                    className="bg-white p-4 rounded-lg border border-amber-200 hover:bg-amber-25 hover:shadow-sm transition-all duration-300 cursor-pointer group"
                                    onClick={() => handlePersonClick(person)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-3">
                                        <div
                                          className={`w-10 h-10 ${person.color} rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                                        >
                                          <span className="font-serif font-bold text-white">{person.avatar}</span>
                                        </div>
                                        <div>
                                          <h4 className="font-serif text-amber-800 font-bold">{person.name}</h4>
                                          <p className="text-xs text-amber-600">{person.relationship}</p>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-xs text-amber-700 font-serif">🎂 {person.birthday}</p>
                                        <Button className="bg-amber-600 hover:bg-amber-700 text-white text-xs px-2 py-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                          View Dates
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </FadeIn>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Calendar Section */}
                        <div className="space-y-4">
                          <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-md">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-serif text-amber-800 text-lg flex items-center">
                                <Calendar className="w-5 h-5 mr-2 text-amber-600" />
                                {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                              </h3>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm" className="text-amber-600 hover:bg-amber-50">
                                  ‹
                                </Button>
                                <Button variant="ghost" size="sm" className="text-amber-600 hover:bg-amber-50">
                                  ›
                                </Button>
                              </div>
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                <div
                                  key={day}
                                  className="text-center text-xs font-serif text-amber-600 py-2 font-bold"
                                >
                                  {day}
                                </div>
                              ))}
                            </div>

                            <div className="grid grid-cols-7 gap-1">
                              {(() => {
                                const today = new Date()
                                const currentMonth = today.getMonth()
                                const currentYear = today.getFullYear()
                                const firstDay = new Date(currentYear, currentMonth, 1)
                                const lastDay = new Date(currentYear, currentMonth + 1, 0)
                                const startDate = new Date(firstDay)
                                startDate.setDate(startDate.getDate() - firstDay.getDay())

                                const days = []
                                const specialDates = [15, 22, 10, 5] // Mock special dates

                                for (let i = 0; i < 42; i++) {
                                  const date = new Date(startDate)
                                  date.setDate(startDate.getDate() + i)
                                  const isCurrentMonth = date.getMonth() === currentMonth
                                  const isToday = date.toDateString() === today.toDateString()
                                  const isSpecial = isCurrentMonth && specialDates.includes(date.getDate())

                                  days.push(
                                    <div
                                      key={i}
                                      className={`
                                  aspect-square flex items-center justify-center text-sm font-serif cursor-pointer transition-all duration-200 rounded
                                  ${isCurrentMonth ? "text-amber-800" : "text-gray-300"}
                                  ${isToday ? "bg-amber-600 text-white font-bold shadow-md" : "hover:bg-amber-50"}
                                  ${isSpecial && !isToday ? "bg-red-100 text-red-700 font-bold" : ""}
                                `}
                                    >
                                      {date.getDate()}
                                      {isSpecial && !isToday && (
                                        <div className="absolute w-1 h-1 bg-red-500 rounded-full mt-4"></div>
                                      )}
                                    </div>,
                                  )
                                }
                                return days
                              })()}
                            </div>

                            {/* Calendar Legend */}
                            <div className="mt-4 pt-4 border-t border-amber-200">
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center">
                                    <div className="w-3 h-3 bg-amber-600 rounded mr-2"></div>
                                    <span className="text-amber-700 font-serif">Today</span>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="w-3 h-3 bg-red-100 border border-red-300 rounded mr-2"></div>
                                    <span className="text-amber-700 font-serif">Special Date</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Upcoming Events */}
                          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                            <h4 className="font-serif text-amber-800 font-bold mb-3 flex items-center">
                              <Bell className="w-4 h-4 mr-2" />
                              Upcoming Events
                            </h4>
                            <div className="space-y-2">
                              {[
                                { name: "Mom's Birthday", date: "March 15", days: 12, person: "Mom" },
                                { name: "Sarah's Birthday", date: "July 22", days: 45, person: "Sarah" },
                              ].map((event, index) => (
                                <div
                                  key={index}
                                  className="bg-white p-3 rounded border border-amber-200 hover:shadow-sm transition-shadow"
                                >
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="font-serif text-amber-800 font-bold text-sm">{event.name}</p>
                                      <p className="text-xs text-amber-600">{event.date}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-xs text-amber-700">{event.days} days</p>
                                      <Button className="bg-amber-600 hover:bg-amber-700 text-white text-xs px-2 py-1 mt-1">
                                        Remind
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
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
                          {
                            title: "Received Letters",
                            count: 8,
                            icon: Heart,
                            color: "red",
                            desc: "letters received",
                          },
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

                      {!editingProfile ? (
                        // View Profile Mode
                        <div>
                          <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-8 mb-8">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg mx-auto sm:mx-0">
                              <User className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                              <h3 className="text-xl sm:text-2xl font-serif text-amber-800 mb-2">{user}</h3>
                              <p className="text-amber-700 mb-4">HeartPost Member since 2024</p>

                              {/* Personal Info */}
                              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-4">
                                <div className="space-y-3 text-left">
                                  <div className="flex justify-between items-center">
                                    <span className="font-serif text-amber-800 font-bold">Birthday:</span>
                                    <span className="text-amber-700">{userProfile.birthday || "Not set"}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="font-serif text-amber-800 font-bold">Location:</span>
                                    <span className="text-amber-700">{userProfile.location || "Not set"}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="font-serif text-amber-800 font-bold">Joined:</span>
                                    <span className="text-amber-700">January 2024</span>
                                  </div>
                                </div>
                              </div>

                              {/* Bio Section */}
                              <div className="bg-white p-4 rounded-lg border border-amber-200 mb-4">
                                <h4 className="font-serif text-amber-800 font-bold mb-2">About Me</h4>
                                <p className="text-amber-700 font-serif italic text-sm">
                                  {userProfile.bio || "No bio added yet. Click Edit Profile to add your story!"}
                                </p>
                              </div>

                              {/* Stats */}
                              <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-center">
                                  <p className="text-2xl font-bold text-green-700">12</p>
                                  <p className="text-sm text-green-600 font-serif">Letters Sent</p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center">
                                  <p className="text-2xl font-bold text-blue-700">8</p>
                                  <p className="text-sm text-blue-600 font-serif">Letters Received</p>
                                </div>
                              </div>

                              <Button
                                onClick={() => setEditingProfile(true)}
                                className="bg-amber-700 hover:bg-amber-600 text-white btn-hover-lift"
                              >
                                Edit Profile
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Edit Profile Mode
                        <div className="max-w-2xl mx-auto">
                          <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-sm">
                            <h3 className="text-xl font-serif text-amber-800 font-bold mb-6">Edit Your Profile</h3>

                            <div className="space-y-6">
                              {/* Profile Picture Section */}
                              <div className="text-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                                  <User className="w-12 h-12 text-white" />
                                </div>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
                                  Change Avatar
                                </Button>
                              </div>

                              {/* Basic Info */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block font-serif text-amber-800 font-bold mb-2">
                                    Display Name
                                  </label>
                                  <input
                                    type="text"
                                    value={editedProfile.displayName}
                                    onChange={(e) =>
                                      setEditedProfile({ ...editedProfile, displayName: e.target.value })
                                    }
                                    className="w-full p-3 border border-amber-300 rounded-lg font-serif text-amber-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    placeholder="Your display name"
                                  />
                                </div>

                                <div>
                                  <label className="block font-serif text-amber-800 font-bold mb-2">Birthday</label>
                                  <input
                                    type="date"
                                    value={editedProfile.birthday}
                                    onChange={(e) =>
                                      setEditedProfile({ ...editedProfile, birthday: e.target.value })
                                    }
                                    className="w-full p-3 border border-amber-300 rounded-lg font-serif text-amber-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block font-serif text-amber-800 font-bold mb-2">Location</label>
                                <input
                                  type="text"
                                  value={editedProfile.location}
                                  onChange={(e) =>
                                    setEditedProfile({ ...editedProfile, location: e.target.value })
                                  }
                                  className="w-full p-3 border border-amber-300 rounded-lg font-serif text-amber-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                  placeholder="Your city, country"
                                />
                              </div>

                              {/* Bio Section */}
                              <div>
                                <label className="block font-serif text-amber-800 font-bold mb-2">About Me</label>
                                <textarea
                                  value={editedProfile.bio}
                                  onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                                  className="w-full p-3 border border-amber-300 rounded-lg font-serif text-amber-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                                  rows={4}
                                  placeholder="Tell us about yourself, your interests, why you love writing letters..."
                                  maxLength={500}
                                />
                                <p className="text-sm text-amber-600 mt-1">{editedProfile.bio.length}/500 characters</p>
                              </div>

                              {/* Preferences */}
                              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                                <h4 className="font-serif text-amber-800 font-bold mb-3">Preferences</h4>
                                <div className="space-y-3">
                                  <label className="flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={editedProfile.emailNotifications}
                                      onChange={(e) =>
                                        setEditedProfile({ ...editedProfile, emailNotifications: e.target.checked })
                                      }
                                      className="mr-3 text-amber-600 focus:ring-amber-500"
                                    />
                                    <span className="font-serif text-amber-800">Receive email notifications</span>
                                  </label>

                                  <label className="flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={editedProfile.publicProfile}
                                      onChange={(e) =>
                                        setEditedProfile({ ...editedProfile, publicProfile: e.target.checked })
                                      }
                                      className="mr-3 text-amber-600 focus:ring-amber-500"
                                    />
                                    <span className="font-serif text-amber-800">Make profile visible to community</span>
                                  </label>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                  onClick={handleSaveProfile}
                                  className="flex-1 bg-green-600 hover:bg-green-700 text-white btn-hover-lift"
                                >
                                  Save Changes
                                </Button>
                                <Button
                                  onClick={() => {
                                    setEditingProfile(false)
                                    setEditedProfile({
                                      displayName: user,
                                      birthday: userProfile.birthday || "",
                                      location: userProfile.location || "",
                                      bio: userProfile.bio || "",
                                      emailNotifications: userProfile.emailNotifications || true,
                                      publicProfile: userProfile.publicProfile || false,
                                    })
                                  }}
                                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
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
        </div>
      </div>

      {/* Person Details Modal */}
      {showPersonModal && selectedPerson && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <FadeIn>
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-amber-200">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-16 h-16 ${selectedPerson.color} rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <span className="font-serif font-bold text-white text-2xl">{selectedPerson.avatar}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif text-amber-800 font-bold">{selectedPerson.name}</h2>
                    <p className="text-amber-600">{selectedPerson.relationship}</p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowPersonModal(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Description Section */}
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif text-amber-800 font-bold">Là ai?</h3>
                    <Button
                      onClick={() => (editingDescription ? handleSaveDescription() : setEditingDescription(true))}
                      className="bg-amber-600 hover:bg-amber-700 text-white text-sm px-3 py-1"
                    >
                      {editingDescription ? "Save" : "Edit"}
                    </Button>
                  </div>
                  {editingDescription ? (
                    <textarea
                      value={personDescription}
                      onChange={(e) => setPersonDescription(e.target.value)}
                      className="w-full p-3 border border-amber-300 rounded-lg font-serif text-amber-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                      rows={3}
                      placeholder="Mô tả về người này..."
                    />
                  ) : (
                    <p className="font-serif text-amber-700 italic">"{personDescription}"</p>
                  )}
                </div>

                {/* Special Dates Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-amber-800 font-bold text-lg">Ngày Đặc Biệt</h3>
                    <Button
                      onClick={() => setShowAddDateForm(true)}
                      className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1"
                    >
                      + Thêm Ngày
                    </Button>
                  </div>

                  {/* Existing Special Dates */}
                  <div className="space-y-3">
                    {[
                      {
                        title: "Sinh nhật",
                        date: selectedPerson.birthday,
                        description: `Đây là ngày sinh nhật của ${selectedPerson.name}, một ngày rất đặc biệt để tôi thể hiện tình yêu thương.`,
                      },
                      {
                        title: "Ngày kỷ niệm",
                        date: "January 20",
                        description: `Ngày đầu tiên tôi gặp ${selectedPerson.name}, một kỷ niệm không thể nào quên.`,
                      },
                    ].map((specialDate, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg border border-amber-200 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-serif text-amber-800 font-bold flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-amber-600" />
                              {specialDate.title}
                            </h4>
                            <p className="text-sm text-amber-600 mb-2">📅 {specialDate.date}</p>
                            <p className="text-sm font-serif text-amber-700 italic">"{specialDate.description}"</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Date Form */}
                  {showAddDateForm && (
                    <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-serif text-green-800 font-bold mb-3">Thêm Ngày Đặc Biệt Mới</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block font-serif text-green-800 font-bold mb-1">Tên sự kiện</label>
                          <input
                            type="text"
                            value={newDateTitle}
                            onChange={(e) => setNewDateTitle(e.target.value)}
                            placeholder="Ví dụ: Sinh nhật, Kỷ niệm..."
                            className="w-full p-2 border border-green-300 rounded-lg font-serif text-green-800 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block font-serif text-green-800 font-bold mb-1">Ngày</label>
                          <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="w-full p-2 border border-green-300 rounded-lg font-serif text-green-800 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block font-serif text-green-800 font-bold mb-1">Mô tả</label>
                          <textarea
                            value={newDateDescription}
                            onChange={(e) => setNewDateDescription(e.target.value)}
                            placeholder={`Đây là ngày đặc biệt của ${selectedPerson.name}, là ngày...`}
                            className="w-full p-2 border border-green-300 rounded-lg font-serif text-green-800 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            rows={3}
                          />
                        </div>
                        <div className="flex space-x-3">
                          <Button
                            onClick={handleAddSpecialDate}
                            disabled={!newDate || !newDateTitle || !newDateDescription}
                            className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                          >
                            Thêm Ngày
                          </Button>
                          <Button
                            onClick={() => {
                              setShowAddDateForm(false)
                              setNewDate("")
                              setNewDateTitle("")
                              setNewDateDescription("")
                            }}
                            className="bg-gray-600 hover:bg-gray-700 text-white"
                          >
                            Hủy
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <h4 className="font-serif text-amber-800 font-bold mb-3">Hành động nhanh</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
                      📝 Viết thư cho {selectedPerson.name}
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm">
                      📞 Đặt lịch nhắc nhở
                    </Button>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white text-sm">
                      🎁 Lên kế hoạch quà tặng
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      )}
    </>
  )
})

PersonalSpace.displayName = "PersonalSpace"