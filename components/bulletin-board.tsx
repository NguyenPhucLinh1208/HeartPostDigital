"use client"

import React, { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bell, Users, MessageSquare, Heart, Pin, X, Send } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"

interface BulletinBoardProps {
  user: string
  onNavigate: (view: "main" | "personal" | "postoffice" | "bulletin") => void
}

export const BulletinBoard = React.memo<BulletinBoardProps>(({ user, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<"friends" | "community">("friends")
  const [showStoryForm, setShowStoryForm] = useState(false)
  const [storyTitle, setStoryTitle] = useState("")
  const [storyContent, setStoryContent] = useState("")
  const [storyCategory, setStoryCategory] = useState<"experience" | "tip" | "gratitude" | "question">("experience")

  const handleShareStory = useCallback(() => {
    if (storyTitle.trim() && storyContent.trim()) {
      alert(`Thank you for sharing your story, ${user}! Your post "${storyTitle}" has been submitted for review.`)
      setShowStoryForm(false)
      setStoryTitle("")
      setStoryContent("")
      setStoryCategory("experience")
    }
  }, [storyTitle, storyContent, user])

  const storyCategories = [
    { id: "experience", name: "My Experience", icon: "💌", desc: "Share your HeartPost journey" },
    { id: "tip", name: "Writing Tips", icon: "✍️", desc: "Help others write better letters" },
    { id: "gratitude", name: "Gratitude", icon: "🙏", desc: "Thank someone or express appreciation" },
    { id: "question", name: "Question", icon: "❓", desc: "Ask the community for advice" },
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

      <div className="max-w-4xl mx-auto">
        {/* Enhanced Header */}
        <FadeIn delay={200}>
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-serif text-amber-800 mb-4">HeartPost Bulletin Board</h1>
            <p className="text-amber-700 font-serif italic">Stay connected with our community</p>
          </div>
        </FadeIn>

        {/* Enhanced Tab Navigation */}
        <FadeIn delay={400}>
          <div className="flex justify-center mb-8">
            <div className="bg-amber-800/90 backdrop-blur-sm p-1 rounded-xl shadow-lg border border-amber-700">
              <button
                onClick={() => setActiveTab("friends")}
                className={`px-4 sm:px-6 py-3 rounded-lg font-serif transition-all duration-300 ${
                  activeTab === "friends"
                    ? "bg-amber-100 text-amber-800 shadow-md scale-105"
                    : "text-amber-100 hover:bg-amber-700/50"
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                <span className="hidden sm:inline">My Friends</span>
                <span className="sm:hidden">Friends</span>
              </button>
              <button
                onClick={() => setActiveTab("community")}
                className={`px-4 sm:px-6 py-3 rounded-lg font-serif transition-all duration-300 ${
                  activeTab === "community"
                    ? "bg-amber-100 text-amber-800 shadow-md scale-105"
                    : "text-amber-100 hover:bg-amber-700/50"
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                <span className="hidden sm:inline">Community</span>
                <span className="sm:hidden">Community</span>
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Enhanced Content */}
        <FadeIn delay={600}>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 min-h-96 border border-amber-200/50">
            {activeTab === "friends" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-serif text-amber-800">My Friends</h2>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Add Friend
                  </Button>
                </div>

                {/* Friends List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Sarah Johnson",
                      avatar: "S",
                      color: "bg-blue-500",
                      status: "online",
                      lastLetter: "2 days ago",
                      mutualFriends: 5,
                    },
                    {
                      name: "Mike Chen",
                      avatar: "M",
                      color: "bg-green-500",
                      status: "offline",
                      lastLetter: "1 week ago",
                      mutualFriends: 3,
                    },
                    {
                      name: "Emma Wilson",
                      avatar: "E",
                      color: "bg-purple-500",
                      status: "online",
                      lastLetter: "Yesterday",
                      mutualFriends: 8,
                    },
                    {
                      name: "David Brown",
                      avatar: "D",
                      color: "bg-orange-500",
                      status: "offline",
                      lastLetter: "3 days ago",
                      mutualFriends: 2,
                    },
                  ].map((friend, index) => (
                    <FadeIn key={friend.name} delay={700 + index * 100}>
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 hover:shadow-md transition-all duration-300 group">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div
                              className={`w-12 h-12 ${friend.color} rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                            >
                              <span className="font-serif font-bold text-white">{friend.avatar}</span>
                            </div>
                            <div
                              className={`absolute -bottom-1 -right-1 w-4 h-4 ${friend.status === "online" ? "bg-green-500" : "bg-gray-400"} rounded-full border-2 border-white`}
                            ></div>
                          </div>

                          <div className="flex-1">
                            <h4 className="font-serif text-amber-800 font-bold">{friend.name}</h4>
                            <p className="text-xs text-amber-600">Last letter: {friend.lastLetter}</p>
                            <p className="text-xs text-amber-500">{friend.mutualFriends} mutual friends</p>
                          </div>

                          <div className="flex flex-col space-y-2">
                            <Button className="bg-amber-600 hover:bg-amber-700 text-white text-xs px-3 py-1">
                              Write Letter
                            </Button>
                            <Button variant="ghost" className="text-amber-600 hover:bg-amber-100 text-xs px-3 py-1">
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>

                {/* Friend Requests */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-serif text-blue-800 font-bold mb-3 flex items-center">
                    <Bell className="w-4 h-4 mr-2" />
                    Friend Requests (2)
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: "Anna Lee", avatar: "A", mutualFriends: 4 },
                      { name: "Tom Wilson", avatar: "T", mutualFriends: 1 },
                    ].map((request, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded border border-blue-200 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="font-serif font-bold text-white text-sm">{request.avatar}</span>
                          </div>
                          <div>
                            <p className="font-serif text-blue-800 font-bold text-sm">{request.name}</p>
                            <p className="text-xs text-blue-600">{request.mutualFriends} mutual friends</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1">
                            Accept
                          </Button>
                          <Button className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-2 py-1">
                            Decline
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "community" && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-xl sm:text-2xl font-serif text-amber-800">Community Stories</h2>
                  <Button
                    onClick={() => setShowStoryForm(true)}
                    className="bg-amber-700 hover:bg-amber-600 text-white btn-hover-lift w-full sm:w-auto"
                  >
                    <Pin className="w-4 h-4 mr-2" />
                    Share Your Story
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Enhanced Community Posts */}
                  {[
                    {
                      author: "Mai Anh",
                      initials: "MA",
                      time: "2 hours ago",
                      content:
                        "Thank you HeartPost for helping me reconnect with my childhood friend after 15 years! The joy of receiving a handwritten letter brought tears to my eyes. There's something magical about seeing someone's handwriting again.",
                      likes: 24,
                      comments: 5,
                    },
                    {
                      author: "Tuan Minh",
                      initials: "TM",
                      time: "5 hours ago",
                      content:
                        "My 8-year-old daughter received her first letter from her grandmother today. Watching her carefully read each word and then run to call grandma was priceless. HeartPost is creating beautiful memories across generations!",
                      likes: 18,
                      comments: 3,
                    },
                    {
                      author: "Linh Chi",
                      initials: "LC",
                      time: "1 day ago",
                      content:
                        "I love the new envelope designs! Could we get more vintage patterns and maybe some traditional motifs? It would be wonderful to have options that reflect our cultural heritage.",
                      likes: 31,
                      comments: 8,
                    },
                  ].map((post, index) => (
                    <FadeIn key={post.author} delay={700 + index * 100}>
                      <div className="bg-amber-50 p-4 sm:p-6 rounded-lg border border-amber-200 hover:shadow-md transition-all duration-300 group">
                        <div className="flex items-start mb-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0 shadow-md">
                            <span className="font-serif font-bold text-white text-sm sm:text-base">
                              {post.initials}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                              <h4 className="font-serif font-bold text-amber-800">{post.author}</h4>
                              <span className="text-sm text-amber-600">{post.time}</span>
                            </div>
                            <p className="text-amber-700 font-serif mb-4 text-sm sm:text-base">{post.content}</p>
                            <div className="flex items-center space-x-4 sm:space-x-6 text-sm">
                              <button className="flex items-center text-amber-600 hover:text-amber-800 transition-colors group-hover:scale-105">
                                <Heart className="w-4 h-4 mr-1" />
                                {post.likes} likes
                              </button>
                              <button className="flex items-center text-amber-600 hover:text-amber-800 transition-colors group-hover:scale-105">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                {post.comments} comments
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </div>

      {/* Enhanced Share Story Modal */}
      {showStoryForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <FadeIn>
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-amber-200">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50">
                <h2 className="text-xl sm:text-2xl font-serif text-amber-800 font-bold">Share Your Story</h2>
                <Button
                  onClick={() => setShowStoryForm(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 space-y-6">
                {/* Category Selection */}
                <div>
                  <h3 className="font-serif text-amber-800 font-bold mb-4">Choose Story Category</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {storyCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setStoryCategory(category.id as any)}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                          storyCategory === category.id
                            ? "border-amber-500 bg-amber-50 scale-105 shadow-md"
                            : "border-gray-200 hover:border-amber-300 hover:bg-amber-25"
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3">{category.icon}</span>
                          <h4 className="font-serif text-amber-800 font-bold">{category.name}</h4>
                        </div>
                        <p className="text-sm text-amber-600">{category.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Story Title */}
                <div>
                  <label className="block font-serif text-amber-800 font-bold mb-2">Story Title</label>
                  <input
                    type="text"
                    value={storyTitle}
                    onChange={(e) => setStoryTitle(e.target.value)}
                    placeholder="Give your story a meaningful title..."
                    className="w-full p-3 border border-amber-300 rounded-lg font-serif text-amber-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 transition-all duration-200"
                    maxLength={100}
                  />
                  <p className="text-sm text-amber-600 mt-1">{storyTitle.length}/100 characters</p>
                </div>

                {/* Story Content */}
                <div>
                  <label className="block font-serif text-amber-800 font-bold mb-2">Your Story</label>
                  <textarea
                    value={storyContent}
                    onChange={(e) => setStoryContent(e.target.value)}
                    placeholder="Share your experience, thoughts, or advice with the HeartPost community..."
                    rows={8}
                    className="w-full p-3 border border-amber-300 rounded-lg font-serif text-amber-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 resize-none transition-all duration-200"
                    maxLength={1000}
                  />
                  <p className="text-sm text-amber-600 mt-1">{storyContent.length}/1000 characters</p>
                </div>

                {/* Preview */}
                {storyTitle.trim() && storyContent.trim() && (
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h4 className="font-serif text-amber-800 font-bold mb-2">Preview</h4>
                    <div className="bg-white p-4 rounded border border-amber-200">
                      <div className="flex items-start mb-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-300 rounded-full flex items-center justify-center mr-3">
                          <span className="font-serif font-bold text-amber-800 text-xs sm:text-sm">
                            {user.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                            <h5 className="font-serif font-bold text-amber-800">{user}</h5>
                            <span className="text-xs text-amber-600">now</span>
                          </div>
                          <div className="flex items-center mb-2">
                            <span className="text-lg mr-2">
                              {storyCategories.find((c) => c.id === storyCategory)?.icon}
                            </span>
                            <span className="text-sm font-serif text-amber-700 font-bold">{storyTitle}</span>
                          </div>
                          <p className="text-amber-700 font-serif text-sm">{storyContent}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Guidelines */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-serif text-blue-800 font-bold mb-2">📝 Community Guidelines</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Be respectful and kind to all community members</li>
                    <li>• Share authentic experiences and genuine advice</li>
                    <li>• Keep content appropriate for all ages</li>
                    <li>• Stories will be reviewed before publication</li>
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
                <Button
                  onClick={() => setShowStoryForm(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white order-2 sm:order-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleShareStory}
                  disabled={!storyTitle.trim() || !storyContent.trim()}
                  className="bg-amber-700 hover:bg-amber-600 text-white disabled:opacity-50 btn-hover-lift order-1 sm:order-2"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Share Story
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      )}
    </div>
  )
})

BulletinBoard.displayName = "BulletinBoard"
