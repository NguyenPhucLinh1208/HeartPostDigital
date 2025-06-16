"use client"

import React, { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Stamp, Send, Clock, CreditCard, CheckCircle, Mail, User } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"

interface PostOfficeProps {
  user: string
  onNavigate: (view: "main" | "personal" | "postoffice" | "bulletin") => void
}

interface UnsentLetter {
  id: string
  recipient: string
  subject: string
  envelope: string
  paper: string
  sealedDate: string
  estimatedCost: number
}

export const PostOffice = React.memo<PostOfficeProps>(({ user, onNavigate }) => {
  const [step, setStep] = useState<"select" | "counter" | "stamping" | "payment" | "sending">("select")
  const [selectedLetter, setSelectedLetter] = useState<UnsentLetter | null>(null)
  const [sendOption, setSendOption] = useState<"now" | "scheduled" | null>(null)
  const [stampingProgress, setStampingProgress] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash" | "">("")
  const [showScheduler, setShowScheduler] = useState(false)
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")

  // Mock data for unsent letters
  const unsentLetters: UnsentLetter[] = [
    {
      id: "1",
      recipient: "Sarah Johnson",
      subject: "Birthday wishes",
      envelope: "Romantic Pink",
      paper: "Floral Border",
      sealedDate: "2 days ago",
      estimatedCost: 2.5,
    },
    {
      id: "2",
      recipient: "Mom",
      subject: "Thank you letter",
      envelope: "Classic White",
      paper: "Lined Paper",
      sealedDate: "Yesterday",
      estimatedCost: 2.5,
    },
    {
      id: "3",
      recipient: "John Smith",
      subject: "Anniversary letter",
      envelope: "Elegant Blue",
      paper: "Vintage Paper",
      sealedDate: "3 hours ago",
      estimatedCost: 3.0,
    },
  ]

  const handleSelectLetter = useCallback((letter: UnsentLetter) => {
    setSelectedLetter(letter)
    setStep("counter")
  }, [])

  const handleStamp = useCallback(() => {
    setStep("stamping")
    setStampingProgress(0)

    // Animate stamping progress
    const interval = setInterval(() => {
      setStampingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setStep("payment"), 500)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }, [])

  const handlePayment = useCallback(() => {
    setTimeout(() => setStep("sending"), 1000)
  }, [])

  const handleSend = useCallback(
    (option: "now" | "scheduled") => {
      setSendOption(option)
      if (option === "scheduled") {
        setShowScheduler(true)
      } else {
        setTimeout(() => {
          alert(`Your letter to ${selectedLetter?.recipient} has been sent successfully!`)
          onNavigate("main")
        }, 2000)
      }
    },
    [selectedLetter, onNavigate],
  )

  const handleScheduleConfirm = useCallback(() => {
    if (scheduledDate && scheduledTime) {
      setShowScheduler(false)
      setTimeout(() => {
        alert(
          `Your letter to ${selectedLetter?.recipient} has been scheduled for ${scheduledDate} at ${scheduledTime}!`,
        )
        onNavigate("main")
      }, 2000)
    }
  }, [scheduledDate, scheduledTime, selectedLetter, onNavigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 flex flex-col">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-amber-200/50"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-amber-800/20 to-transparent"></div>
      </div>

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-gradient-to-r from-amber-50/95 via-orange-50/95 to-amber-100/95 backdrop-blur-md border-b border-amber-200/50 shadow-lg">
        <div className="px-6 py-3">
          <FadeIn delay={300}>
            <div className="flex items-center justify-center relative max-w-4xl mx-auto">
              {/* Left side - Back Button */}
              <div className="absolute left-0">
                <Button
                  onClick={() => (step === "select" ? onNavigate("main") : setStep("select"))}
                  className="bg-amber-700 hover:bg-amber-600 text-amber-100"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {step === "select" ? "Back to Hall" : "Back to Selection"}
                </Button>
              </div>

              {/* Center - Title */}
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-amber-600 mr-2 animate-pulse" />
                <div>
                  <h1 className="text-lg font-serif text-amber-800 font-bold leading-tight">Digital Post Office</h1>
                  <p className="text-xs text-amber-600 font-serif italic leading-tight">
                    Send letters and postal services
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pt-16 relative">
        <div className="flex h-full items-center justify-center p-4 sm:p-6">
          <div className="relative w-full max-w-5xl">
            {/* Step 1: Select Letter */}
            {step === "select" && (
              <FadeIn>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 border border-amber-200/50">
                  <div className="text-center mb-8">
                    <Mail className="w-12 h-12 sm:w-16 sm:h-16 text-amber-600 mx-auto mb-4" />
                    <h2 className="text-2xl sm:text-3xl font-serif text-amber-800 mb-4">Digital Post Office</h2>
                    <p className="text-amber-700 font-serif text-lg">Select a letter to send</p>
                  </div>

                  {unsentLetters.length > 0 ? (
                    <div className="space-y-4">
                      <h3 className="text-lg sm:text-xl font-serif text-amber-800 mb-6 text-center">
                        Your Unsent Letters
                      </h3>
                      {unsentLetters.map((letter, index) => (
                        <FadeIn key={letter.id} delay={300 + index * 100}>
                          <div
                            className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-6 hover:bg-amber-100 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                            onClick={() => handleSelectLetter(letter)}
                          >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex items-center space-x-4 flex-1">
                                {/* Letter Preview */}
                                <div className="w-12 h-8 sm:w-16 sm:h-12 bg-white rounded shadow-md border border-gray-200 relative flex-shrink-0">
                                  <div className="absolute inset-1 bg-gradient-to-br from-amber-50 to-white rounded">
                                    <div className="absolute top-1 right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full opacity-80"></div>
                                  </div>
                                </div>

                                {/* Letter Details */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center mb-2">
                                    <User className="w-4 h-4 text-amber-600 mr-2 flex-shrink-0" />
                                    <h4 className="font-serif text-amber-800 font-bold text-sm sm:text-lg truncate">
                                      {letter.recipient}
                                    </h4>
                                  </div>
                                  <p className="text-amber-700 font-serif mb-1 text-sm sm:text-base">
                                    {letter.subject}
                                  </p>
                                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-amber-600">
                                    <span>📮 {letter.envelope}</span>
                                    <span>📄 {letter.paper}</span>
                                    <span>🔒 Sealed {letter.sealedDate}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Cost & Action */}
                              <div className="text-center sm:text-right flex-shrink-0">
                                <div className="text-xl sm:text-2xl font-bold text-green-700 mb-2">
                                  ${letter.estimatedCost}
                                </div>
                                <Button className="bg-amber-600 hover:bg-amber-700 text-white group-hover:scale-105 transition-transform">
                                  Select Letter
                                </Button>
                              </div>
                            </div>
                          </div>
                        </FadeIn>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-serif text-gray-600 mb-4">No Unsent Letters</h3>
                      <p className="text-gray-500 mb-6">You don't have any letters ready to send.</p>
                      <Button
                        onClick={() => onNavigate("personal")}
                        className="bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        Write a New Letter
                      </Button>
                    </div>
                  )}
                </div>
              </FadeIn>
            )}

            {/* Step 2: Counter Processing */}
            {step === "counter" && selectedLetter && (
              <FadeIn>
                <div className="text-center">
                  {/* Letter on Counter */}
                  <div className="relative mx-auto mb-8">
                    <div className="w-64 h-40 sm:w-80 sm:h-52 bg-gradient-to-br from-white to-amber-50 rounded-lg shadow-2xl border border-amber-200 relative overflow-hidden">
                      {/* Letter Content Simulation */}
                      <div className="absolute inset-4 sm:inset-6 space-y-2 sm:space-y-3">
                        <div className="h-0.5 sm:h-1 bg-blue-200 opacity-60 rounded"></div>
                        <div className="h-0.5 sm:h-1 bg-blue-200 opacity-60 rounded w-4/5"></div>
                        <div className="h-0.5 sm:h-1 bg-blue-200 opacity-60 rounded w-3/4"></div>
                        <div className="h-0.5 sm:h-1 bg-blue-200 opacity-60 rounded w-5/6"></div>
                      </div>

                      {/* Recipient Address Area */}
                      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-amber-100 p-2 sm:p-3 rounded border border-amber-300">
                        <p className="text-xs font-serif text-amber-800 font-bold">To: {selectedLetter.recipient}</p>
                        <p className="text-xs text-amber-600">{selectedLetter.subject}</p>
                      </div>

                      {/* Seal */}
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-red-600 rounded-full opacity-90 flex items-center justify-center">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 border-2 border-red-200 rounded-full"></div>
                      </div>
                    </div>

                    {/* Letter Shadow */}
                    <div className="absolute -bottom-2 left-4 sm:left-8 right-4 sm:right-8 h-4 bg-black opacity-10 blur-lg rounded-full"></div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 sm:p-8 max-w-md mx-auto border border-amber-200/50">
                    <h2 className="text-xl sm:text-2xl font-serif text-amber-800 mb-4">Post Office Counter</h2>
                    <div className="space-y-3 text-left mb-6">
                      <p className="flex justify-between">
                        <span className="text-amber-700">Recipient:</span>
                        <span className="font-bold text-amber-800">{selectedLetter.recipient}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-amber-700">Subject:</span>
                        <span className="font-bold text-amber-800">{selectedLetter.subject}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-amber-700">Postage:</span>
                        <span className="font-bold text-green-700">${selectedLetter.estimatedCost}</span>
                      </p>
                    </div>

                    <Button
                      onClick={handleStamp}
                      className="bg-amber-700 hover:bg-amber-600 text-amber-100 text-lg px-8 py-4 w-full btn-hover-lift"
                    >
                      <Stamp className="w-6 h-6 mr-2" />
                      Authenticate & Process
                    </Button>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Step 3: Stamping Process */}
            {step === "stamping" && selectedLetter && (
              <FadeIn>
                <div className="text-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 max-w-lg mx-auto border border-amber-200/50">
                    <h2 className="text-xl sm:text-2xl font-serif text-amber-800 mb-6">Authentication in Progress</h2>

                    {/* Stamping Animation */}
                    <div className="relative mx-auto mb-8">
                      <div className="w-48 h-32 sm:w-64 sm:h-40 bg-gradient-to-br from-white to-amber-50 rounded-lg shadow-lg border border-amber-200 relative overflow-hidden">
                        {/* Stamp Effect with Animation */}
                        <div
                          className={`absolute top-2 sm:top-4 right-2 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-lg transition-all duration-300 ${
                            stampingProgress > 50 ? "opacity-90 scale-100" : "opacity-60 scale-95"
                          }`}
                        >
                          <div className="absolute inset-1 sm:inset-2 border-2 border-red-200 rounded flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-red-100 font-bold text-xs">HEARTPOST</div>
                              <div className="text-red-200 text-xs">{new Date().getFullYear()}</div>
                            </div>
                          </div>
                        </div>

                        {/* Verification Checkmarks */}
                        {stampingProgress > 30 && (
                          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                        )}

                        {stampingProgress > 60 && (
                          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Stamp Machine */}
                      <div
                        className={`absolute -top-8 sm:-top-12 right-8 sm:right-16 w-16 h-20 sm:w-20 sm:h-24 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg shadow-xl transition-transform duration-200 ${
                          stampingProgress > 20 && stampingProgress < 80 ? "transform translate-y-2" : ""
                        }`}
                      >
                        <div className="absolute bottom-0 w-full h-4 sm:h-6 bg-red-600 rounded-b-lg"></div>
                        <div className="absolute top-1 sm:top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-amber-700 mb-2">
                        <span>Authenticating...</span>
                        <span>{stampingProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all duration-200"
                          style={{ width: `${stampingProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Status Messages */}
                    <div className="space-y-2 text-sm">
                      {stampingProgress > 20 && (
                        <p className="text-green-600 font-serif">✓ Letter authenticity verified</p>
                      )}
                      {stampingProgress > 50 && <p className="text-blue-600 font-serif">✓ Postage calculated</p>}
                      {stampingProgress > 80 && <p className="text-purple-600 font-serif">✓ Ready for payment</p>}
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Step 4: Payment */}
            {step === "payment" && selectedLetter && (
              <FadeIn>
                <div className="text-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 max-w-lg mx-auto border border-amber-200/50">
                    <h2 className="text-xl sm:text-2xl font-serif text-amber-800 mb-6">Payment</h2>

                    {/* Payment Summary */}
                    <div className="bg-amber-50 p-4 sm:p-6 rounded-lg border border-amber-200 mb-6">
                      <h3 className="font-serif text-amber-800 font-bold mb-4">Payment Summary</h3>
                      <div className="space-y-2 text-left">
                        <div className="flex justify-between">
                          <span className="text-amber-700">Standard Postage:</span>
                          <span className="text-amber-800">${(selectedLetter.estimatedCost - 0.5).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-amber-700">Authentication Fee:</span>
                          <span className="text-amber-800">$0.50</span>
                        </div>
                        <div className="border-t border-amber-300 pt-2 mt-2">
                          <div className="flex justify-between font-bold">
                            <span className="text-amber-800">Total:</span>
                            <span className="text-green-700 text-xl">${selectedLetter.estimatedCost}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="mb-6">
                      <h3 className="font-serif text-amber-800 font-bold mb-4">Choose Payment Method</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setPaymentMethod("card")}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                            paymentMethod === "card"
                              ? "border-blue-500 bg-blue-50 scale-105"
                              : "border-gray-200 hover:border-blue-300 hover:bg-blue-25"
                          }`}
                        >
                          <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2" />
                          <p className="font-serif text-amber-800 text-sm sm:text-base">Credit Card</p>
                        </button>

                        <button
                          onClick={() => setPaymentMethod("cash")}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                            paymentMethod === "cash"
                              ? "border-green-500 bg-green-50 scale-105"
                              : "border-gray-200 hover:border-green-300 hover:bg-green-25"
                          }`}
                        >
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white font-bold text-sm">$</span>
                          </div>
                          <p className="font-serif text-amber-800 text-sm sm:text-base">Cash</p>
                        </button>
                      </div>
                    </div>

                    <Button
                      onClick={handlePayment}
                      disabled={!paymentMethod}
                      className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 w-full disabled:opacity-50 btn-hover-lift"
                    >
                      Complete Payment
                    </Button>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Step 5: Sending Options */}
            {step === "sending" && selectedLetter && !showScheduler && (
              <FadeIn>
                <div className="text-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 max-w-lg mx-auto border border-amber-200/50">
                    <h2 className="text-xl sm:text-2xl font-serif text-amber-800 mb-8">Choose Delivery Method</h2>

                    <div className="grid grid-cols-2 gap-6 sm:gap-8">
                      {/* Send Now */}
                      <div className="text-center">
                        <div
                          className={`w-24 h-36 sm:w-32 sm:h-48 bg-gradient-to-b from-gray-600 to-gray-800 rounded-lg shadow-2xl cursor-pointer transition-all duration-300 mx-auto mb-4 relative ${
                            sendOption === "now" ? "transform scale-110 shadow-xl" : "hover:scale-105"
                          }`}
                          onClick={() => handleSend("now")}
                        >
                          {/* Lever Handle */}
                          <div className="absolute top-4 sm:top-6 left-1/2 transform -translate-x-1/2 w-12 h-6 sm:w-16 sm:h-8 bg-red-600 rounded-full shadow-lg"></div>

                          {/* Lever Body */}
                          <div className="absolute top-10 sm:top-14 left-1/2 transform -translate-x-1/2 w-1.5 h-12 sm:w-2 sm:h-20 bg-gray-400 rounded"></div>

                          {/* Icon */}
                          <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
                            <Send className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300" />
                          </div>

                          {/* Base */}
                          <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 bg-gray-900 rounded-b-lg"></div>
                        </div>
                        <h3 className="font-serif text-amber-800 font-bold text-sm sm:text-base">SEND NOW</h3>
                        <p className="text-xs sm:text-sm text-amber-600">Immediate delivery</p>
                      </div>

                      {/* Schedule Delivery */}
                      <div className="text-center">
                        <div
                          className={`w-24 h-36 sm:w-32 sm:h-48 bg-gradient-to-b from-gray-600 to-gray-800 rounded-lg shadow-2xl cursor-pointer transition-all duration-300 mx-auto mb-4 relative ${
                            sendOption === "scheduled" ? "transform scale-110 shadow-xl" : "hover:scale-105"
                          }`}
                          onClick={() => handleSend("scheduled")}
                        >
                          {/* Lever Handle */}
                          <div className="absolute top-4 sm:top-6 left-1/2 transform -translate-x-1/2 w-12 h-6 sm:w-16 sm:h-8 bg-blue-600 rounded-full shadow-lg"></div>

                          {/* Lever Body */}
                          <div className="absolute top-10 sm:top-14 left-1/2 transform -translate-x-1/2 w-1.5 h-12 sm:w-2 sm:h-20 bg-gray-400 rounded"></div>

                          {/* Icon */}
                          <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
                            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300" />
                          </div>

                          {/* Base */}
                          <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 bg-gray-900 rounded-b-lg"></div>
                        </div>
                        <h3 className="font-serif text-amber-800 font-bold text-sm sm:text-base">SCHEDULE</h3>
                        <p className="text-xs sm:text-sm text-amber-600">Choose delivery time</p>
                      </div>
                    </div>

                    {sendOption === "now" && (
                      <div className="mt-8">
                        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                        <p className="text-amber-700 font-serif mt-4">Sending letter immediately...</p>
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Schedule Time Picker */}
            {step === "sending" && showScheduler && (
              <FadeIn>
                <div className="text-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 max-w-lg mx-auto border border-amber-200/50">
                    <div className="mb-6">
                      <Clock className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto mb-4" />
                      <h2 className="text-xl sm:text-2xl font-serif text-amber-800 mb-2">Schedule Delivery</h2>
                      <p className="text-amber-700 font-serif">
                        Choose when to send your letter to {selectedLetter?.recipient}
                      </p>
                    </div>

                    {/* Date and Time Picker */}
                    <div className="space-y-6">
                      {/* Date Picker */}
                      <div className="bg-amber-50 p-4 sm:p-6 rounded-lg border border-amber-200">
                        <h3 className="font-serif text-amber-800 font-bold mb-4 flex items-center justify-center">
                          📅 Select Date
                        </h3>
                        <input
                          type="date"
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full p-3 border border-amber-300 rounded-lg font-serif text-amber-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>

                      {/* Time Picker */}
                      <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200">
                        <h3 className="font-serif text-amber-800 font-bold mb-4 flex items-center justify-center">
                          🕐 Select Time
                        </h3>
                        <input
                          type="time"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                          className="w-full p-3 border border-blue-300 rounded-lg font-serif text-amber-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Preview */}
                      {scheduledDate && scheduledTime && (
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <h4 className="font-serif text-green-800 font-bold mb-2">📬 Delivery Preview</h4>
                          <p className="text-green-700 font-serif text-sm">
                            Your letter will be delivered on{" "}
                            <span className="font-bold">
                              {new Date(scheduledDate).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>{" "}
                            at <span className="font-bold">{scheduledTime}</span>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                      <Button
                        onClick={() => {
                          setShowScheduler(false)
                          setSendOption(null)
                        }}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleScheduleConfirm}
                        disabled={!scheduledDate || !scheduledTime}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 btn-hover-lift"
                      >
                        Confirm Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

PostOffice.displayName = "PostOffice"
