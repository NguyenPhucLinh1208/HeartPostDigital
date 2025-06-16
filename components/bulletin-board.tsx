"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bell, Users, MessageSquare, Heart, Pin, X, Send } from "lucide-react"

interface BulletinBoardProps {
  user: string
  onNavigate: (view: "main" | "personal" | "postoffice" | "bulletin") => void
}

export function BulletinBoard({ user, onNavigate }: BulletinBoardProps) {
  const [activeTab, setActiveTab] = useState<"official" | "community">("official")
  const [showStoryForm, setShowStoryForm] = useState(false)
  const [storyTitle, setStoryTitle] = useState("")
  const [storyContent, setStoryContent] = useState("")
  const [storyCategory, setStoryCategory] = useState<"experience" | "tip" | "gratitude" | "question">("experience")

  const handleShareStory = () => {
    if (storyTitle.trim() && storyContent.trim()) {
      // Here you would normally send to backend
      alert(`Thank you for sharing your story, ${user}! Your post "${storyTitle}" has been submitted for review.`)
      setShowStoryForm(false)
      setStoryTitle("")
      setStoryContent("")
      setStoryCategory("experience")
    }
  }

  const storyCategories = [
    { id: "experience", name: "My Experience", icon: "💌", desc: "Share your HeartPost journey" },
    { id: "tip", name: "Writing Tips", icon: "✍️", desc: "Help others write better letters" },
    { id: "gratitude", name: "Gratitude", icon: "🙏", desc: "Thank someone or express appreciation" },
    { id: "question", name: "Question", icon: "❓", desc: "Ask the community for advice" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-amber-200 p-6">
      {/* Back Button */}
      <Button onClick={() => onNavigate("main")} className="mb-6 bg-amber-700 hover:bg-amber-600 text-amber-100">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Hall
      </Button>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-amber-800 mb-4">HeartPost Bulletin Board</h1>
          <p className="text-amber-700 font-serif italic">Stay connected with our community</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-amber-800 p-1 rounded-lg shadow-lg">
            <button
              onClick={() => setActiveTab("official")}
              className={`px-6 py-3 rounded-md font-serif transition-all duration-300 ${
                activeTab === "official" ? "bg-amber-100 text-amber-800 shadow-md" : "text-amber-100 hover:bg-amber-700"
              }`}
            >
              <Bell className="w-4 h-4 inline mr-2" />
              Official News
            </button>
            <button
              onClick={() => setActiveTab("community")}
              className={`px-6 py-3 rounded-md font-serif transition-all duration-300 ${
                activeTab === "community"
                  ? "bg-amber-100 text-amber-800 shadow-md"
                  : "text-amber-100 hover:bg-amber-700"
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Community
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 min-h-96">
          {activeTab === "official" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-amber-800 mb-6">Official Announcements</h2>

              {/* Notice 1 */}
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <h3 className="text-xl font-serif text-amber-800 font-bold">System Maintenance</h3>
                  </div>
                  <span className="text-sm text-amber-600">Dec 15, 2024</span>
                </div>
                <p className="text-amber-700 font-serif">
                  Our system will undergo scheduled maintenance from 2:00 AM to 4:00 AM on December 16, 2024. During
                  this time, some services may be temporarily unavailable.
                </p>
              </div>

              {/* Notice 2 */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <h3 className="text-xl font-serif text-amber-800 font-bold">New Feature: Scheduled Letters</h3>
                  </div>
                  <span className="text-sm text-amber-600">Dec 10, 2024</span>
                </div>
                <p className="text-amber-700 font-serif">
                  You can now schedule your letters to be sent at a future date! Perfect for birthdays, anniversaries,
                  and special occasions.
                </p>
              </div>

              {/* Notice 3 */}
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <h3 className="text-xl font-serif text-amber-800 font-bold">Happy New Year 2025!</h3>
                  </div>
                  <span className="text-sm text-amber-600">Jan 1, 2025</span>
                </div>
                <p className="text-amber-700 font-serif">
                  Wishing all our HeartPost family a wonderful new year filled with meaningful connections and beautiful
                  letters!
                </p>
              </div>
            </div>
          )}

          {activeTab === "community" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-amber-800">Community Stories</h2>
                <Button onClick={() => setShowStoryForm(true)} className="bg-amber-700 hover:bg-amber-600 text-white">
                  <Pin className="w-4 h-4 mr-2" />
                  Share Your Story
                </Button>
              </div>

              <div className="space-y-6">
                {/* Post 1 */}
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-amber-300 rounded-full flex items-center justify-center mr-4">
                      <span className="font-serif font-bold text-amber-800">MA</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-serif font-bold text-amber-800">Mai Anh</h4>
                        <span className="text-sm text-amber-600">2 hours ago</span>
                      </div>
                      <p className="text-amber-700 font-serif mb-4">
                        "Thank you HeartPost for helping me reconnect with my childhood friend after 15 years! The joy
                        of receiving a handwritten letter brought tears to my eyes. There's something magical about
                        seeing someone's handwriting again."
                      </p>
                      <div className="flex items-center space-x-6 text-sm">
                        <button className="flex items-center text-amber-600 hover:text-amber-800">
                          <Heart className="w-4 h-4 mr-1" />
                          24 likes
                        </button>
                        <button className="flex items-center text-amber-600 hover:text-amber-800">
                          <MessageSquare className="w-4 h-4 mr-1" />5 comments
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post 2 */}
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-amber-300 rounded-full flex items-center justify-center mr-4">
                      <span className="font-serif font-bold text-amber-800">TM</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-serif font-bold text-amber-800">Tuan Minh</h4>
                        <span className="text-sm text-amber-600">5 hours ago</span>
                      </div>
                      <p className="text-amber-700 font-serif mb-4">
                        "My 8-year-old daughter received her first letter from her grandmother today. Watching her
                        carefully read each word and then run to call grandma was priceless. HeartPost is creating
                        beautiful memories across generations!"
                      </p>
                      <div className="flex items-center space-x-6 text-sm">
                        <button className="flex items-center text-amber-600 hover:text-amber-800">
                          <Heart className="w-4 h-4 mr-1" />
                          18 likes
                        </button>
                        <button className="flex items-center text-amber-600 hover:text-amber-800">
                          <MessageSquare className="w-4 h-4 mr-1" />3 comments
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post 3 */}
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-amber-300 rounded-full flex items-center justify-center mr-4">
                      <span className="font-serif font-bold text-amber-800">LC</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-serif font-bold text-amber-800">Linh Chi</h4>
                        <span className="text-sm text-amber-600">1 day ago</span>
                      </div>
                      <p className="text-amber-700 font-serif mb-4">
                        "I love the new envelope designs! Could we get more vintage patterns and maybe some traditional
                        motifs? It would be wonderful to have options that reflect our cultural heritage."
                      </p>
                      <div className="flex items-center space-x-6 text-sm">
                        <button className="flex items-center text-amber-600 hover:text-amber-800">
                          <Heart className="w-4 h-4 mr-1" />
                          31 likes
                        </button>
                        <button className="flex items-center text-amber-600 hover:text-amber-800">
                          <MessageSquare className="w-4 h-4 mr-1" />8 comments
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share Story Modal */}
      {showStoryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-serif text-amber-800 font-bold">Share Your Story</h2>
              <Button
                onClick={() => setShowStoryForm(false)}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Category Selection */}
              <div>
                <h3 className="font-serif text-amber-800 font-bold mb-4">Choose Story Category</h3>
                <div className="grid grid-cols-2 gap-3">
                  {storyCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setStoryCategory(category.id as any)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                        storyCategory === category.id
                          ? "border-amber-500 bg-amber-50 scale-105"
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
                  className="w-full p-3 border border-amber-300 rounded-lg font-serif text-amber-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400"
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
                  className="w-full p-3 border border-amber-300 rounded-lg font-serif text-amber-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-400 resize-none"
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
                      <div className="w-10 h-10 bg-amber-300 rounded-full flex items-center justify-center mr-3">
                        <span className="font-serif font-bold text-amber-800 text-sm">
                          {user.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
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
            <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
              <Button onClick={() => setShowStoryForm(false)} className="bg-gray-600 hover:bg-gray-700 text-white">
                Cancel
              </Button>
              <Button
                onClick={handleShareStory}
                disabled={!storyTitle.trim() || !storyContent.trim()}
                className="bg-amber-700 hover:bg-amber-600 text-white disabled:opacity-50"
              >
                <Send className="w-4 h-4 mr-2" />
                Share Story
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
