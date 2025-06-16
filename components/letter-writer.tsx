"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Upload, Mic, FileText, Send, Archive, Sparkles, Heart } from "lucide-react"

interface LetterWriterProps {
  user: string
  onNavigate: (view: "main" | "personal" | "postoffice" | "bulletin") => void
}

type Step = "envelope" | "paper" | "content" | "attachments" | "seal" | "finish"

export function LetterWriter({ user, onNavigate }: LetterWriterProps) {
  const [currentStep, setCurrentStep] = useState<Step>("envelope")
  const [selectedEnvelope, setSelectedEnvelope] = useState<string>("")
  const [selectedPaper, setSelectedPaper] = useState<string>("")
  const [contentMethod, setContentMethod] = useState<"scan" | "write" | "">("")
  const [attachments, setAttachments] = useState<string[]>([])
  const [sealStyle, setSealStyle] = useState<string>("")

  const steps = [
    { id: "envelope", title: "Choose Envelope", icon: "📮" },
    { id: "paper", title: "Select Paper", icon: "📄" },
    { id: "content", title: "Write Content", icon: "✍️" },
    { id: "attachments", title: "Add Attachments", icon: "📎" },
    { id: "seal", title: "Seal Letter", icon: "🔒" },
    { id: "finish", title: "Complete", icon: "✨" },
  ]

  const envelopes = [
    { id: "classic", name: "Classic White", color: "bg-white", border: "border-gray-300" },
    { id: "vintage", name: "Vintage Cream", color: "bg-amber-50", border: "border-amber-200" },
    { id: "elegant", name: "Elegant Blue", color: "bg-blue-50", border: "border-blue-200" },
    { id: "romantic", name: "Romantic Pink", color: "bg-pink-50", border: "border-pink-200" },
    { id: "nature", name: "Nature Green", color: "bg-green-50", border: "border-green-200" },
    { id: "royal", name: "Royal Purple", color: "bg-purple-50", border: "border-purple-200" },
  ]

  const papers = [
    { id: "lined", name: "Lined Paper", pattern: "lined", desc: "Classic ruled paper" },
    { id: "blank", name: "Blank Paper", pattern: "blank", desc: "Pure white canvas" },
    { id: "dotted", name: "Dotted Paper", pattern: "dotted", desc: "Subtle dot grid" },
    { id: "vintage", name: "Vintage Paper", pattern: "vintage", desc: "Aged appearance" },
    { id: "floral", name: "Floral Border", pattern: "floral", desc: "Decorative edges" },
    { id: "minimalist", name: "Minimalist", pattern: "minimal", desc: "Clean and simple" },
  ]

  const sealStyles = [
    { id: "wax", name: "Wax Seal", icon: "🔴", desc: "Traditional red wax" },
    { id: "heart", name: "Heart Seal", icon: "❤️", desc: "Love and care" },
    { id: "star", name: "Star Seal", icon: "⭐", desc: "Special moments" },
    { id: "flower", name: "Flower Seal", icon: "🌸", desc: "Gentle beauty" },
    { id: "initial", name: "Initial Seal", icon: "🔤", desc: "Personal touch" },
    { id: "vintage", name: "Vintage Seal", icon: "🏛️", desc: "Classic elegance" },
  ]

  const getCurrentStepIndex = () => steps.findIndex((step) => step.id === currentStep)
  const canGoNext = () => {
    switch (currentStep) {
      case "envelope":
        return selectedEnvelope !== ""
      case "paper":
        return selectedPaper !== ""
      case "content":
        return contentMethod !== ""
      case "attachments":
        return true // Optional step
      case "seal":
        return sealStyle !== ""
      default:
        return false
    }
  }

  const nextStep = () => {
    const currentIndex = getCurrentStepIndex()
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id as Step)
    }
  }

  const prevStep = () => {
    const currentIndex = getCurrentStepIndex()
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id as Step)
    }
  }

  const handleFinish = (action: "send" | "save") => {
    if (action === "send") {
      onNavigate("postoffice")
    } else {
      alert("Letter saved to your storage!")
      onNavigate("personal")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-200 p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        {/* Mobile responsive adjustments */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <Button onClick={() => onNavigate("personal")} className="bg-amber-700 hover:bg-amber-600 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Personal Space
            </Button>
            <h1 className="text-2xl sm:text-3xl font-serif text-amber-800 font-bold text-center">
              Letter Writing Studio
            </h1>
            <div className="w-32 hidden sm:block"></div> {/* Spacer for desktop */}
          </div>

          {/* Progress Steps - Fixed responsive layout */}
          <div className="bg-white rounded-lg shadow-lg p-4 mb-8 overflow-x-auto">
            <div className="flex items-center justify-between min-w-max px-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                        currentStep === step.id
                          ? "bg-amber-600 text-white scale-110 shadow-lg"
                          : getCurrentStepIndex() > index
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {getCurrentStepIndex() > index ? "✓" : step.icon}
                    </div>
                    <div className="mt-2 text-center min-w-0">
                      <p
                        className={`font-serif text-xs ${
                          currentStep === step.id ? "text-amber-800 font-bold" : "text-gray-600"
                        } truncate max-w-20`}
                      >
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-1 mx-3 rounded transition-colors duration-300 ${
                        getCurrentStepIndex() > index ? "bg-green-500" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 min-h-96">
          {/* Step 1: Choose Envelope */}
          {currentStep === "envelope" && (
            <div>
              <h2 className="text-2xl font-serif text-amber-800 mb-6 text-center">Choose Your Envelope</h2>
              <p className="text-amber-700 text-center mb-8 font-serif italic">
                "The first impression of your heartfelt message"
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {envelopes.map((envelope) => (
                  <div
                    key={envelope.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedEnvelope === envelope.id ? "scale-105 shadow-xl" : "hover:scale-102 hover:shadow-lg"
                    }`}
                    onClick={() => setSelectedEnvelope(envelope.id)}
                  >
                    <div
                      className={`w-full h-32 ${envelope.color} ${envelope.border} border-2 rounded-lg shadow-md relative overflow-hidden`}
                    >
                      {/* Envelope flap */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-16 ${envelope.color} opacity-80 transform rotate-180`}
                        style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                      ></div>
                      {selectedEnvelope === envelope.id && (
                        <div className="absolute inset-0 bg-amber-400 bg-opacity-20 flex items-center justify-center">
                          <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg">✓</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-center mt-3 font-serif text-amber-800">{envelope.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Paper */}
          {currentStep === "paper" && (
            <div>
              <h2 className="text-2xl font-serif text-amber-800 mb-6 text-center">Select Your Paper</h2>
              <p className="text-amber-700 text-center mb-8 font-serif italic">"Choose the canvas for your thoughts"</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {papers.map((paper) => (
                  <div
                    key={paper.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedPaper === paper.id ? "scale-105 shadow-xl" : "hover:scale-102 hover:shadow-lg"
                    }`}
                    onClick={() => setSelectedPaper(paper.id)}
                  >
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 h-40 relative overflow-hidden shadow-md">
                      {/* Paper pattern simulation */}
                      {paper.pattern === "lined" && (
                        <div className="space-y-3">
                          {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-px bg-blue-200"></div>
                          ))}
                        </div>
                      )}
                      {paper.pattern === "dotted" && (
                        <div className="grid grid-cols-8 gap-2 h-full">
                          {[...Array(64)].map((_, i) => (
                            <div key={i} className="w-1 h-1 bg-gray-300 rounded-full"></div>
                          ))}
                        </div>
                      )}
                      {paper.pattern === "vintage" && (
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 opacity-60"></div>
                      )}
                      {paper.pattern === "floral" && (
                        <div className="absolute inset-0 border-4 border-pink-200 rounded-lg">
                          <div className="absolute top-2 left-2 text-pink-300">🌸</div>
                          <div className="absolute top-2 right-2 text-pink-300">🌸</div>
                          <div className="absolute bottom-2 left-2 text-pink-300">🌸</div>
                          <div className="absolute bottom-2 right-2 text-pink-300">🌸</div>
                        </div>
                      )}

                      {selectedPaper === paper.id && (
                        <div className="absolute inset-0 bg-amber-400 bg-opacity-20 flex items-center justify-center">
                          <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg">✓</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-center mt-3">
                      <p className="font-serif text-amber-800 font-bold">{paper.name}</p>
                      <p className="text-sm text-amber-600">{paper.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Write Content */}
          {currentStep === "content" && (
            <div>
              <h2 className="text-2xl font-serif text-amber-800 mb-6 text-center">How will you write your letter?</h2>
              <p className="text-amber-700 text-center mb-8 font-serif italic">
                "Authentic handwriting makes every word special"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div
                  className={`cursor-pointer p-8 rounded-lg border-2 transition-all duration-300 ${
                    contentMethod === "scan"
                      ? "border-amber-500 bg-amber-50 scale-105 shadow-xl"
                      : "border-gray-200 hover:border-amber-300 hover:bg-amber-25 hover:scale-102"
                  }`}
                  onClick={() => setContentMethod("scan")}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-serif text-amber-800 font-bold mb-3">Scan Handwritten</h3>
                    <p className="text-amber-700 text-sm mb-4">
                      Write your letter by hand on real paper, then scan or photograph it to preserve the authentic feel
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-700 font-serif italic">
                        "Nothing beats the personal touch of real handwriting"
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`cursor-pointer p-8 rounded-lg border-2 transition-all duration-300 ${
                    contentMethod === "write"
                      ? "border-amber-500 bg-amber-50 scale-105 shadow-xl"
                      : "border-gray-200 hover:border-amber-300 hover:bg-amber-25 hover:scale-102"
                  }`}
                  onClick={() => setContentMethod("write")}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-serif text-amber-800 font-bold mb-3">Digital Writing</h3>
                    <p className="text-amber-700 text-sm mb-4">
                      Use our digital pen tool to write directly on screen with handwriting-style fonts
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-green-700 font-serif italic">
                        "Quick and convenient for immediate sending"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {contentMethod && (
                <div className="mt-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                    <p className="font-serif text-amber-800">
                      Great choice! {contentMethod === "scan" ? "Handwritten letters" : "Digital writing"} will make
                      your message truly special.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Attachments */}
          {currentStep === "attachments" && (
            <div>
              <h2 className="text-2xl font-serif text-amber-800 mb-6 text-center">Add Special Attachments</h2>
              <p className="text-amber-700 text-center mb-8 font-serif italic">
                "Make your letter even more memorable (optional)"
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-amber-400 transition-colors cursor-pointer">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-serif text-amber-800 font-bold mb-2">Attach Files</h3>
                    <p className="text-sm text-amber-600 mb-4">Photos, documents, or other files</p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Choose Files</Button>
                  </div>
                </div>

                <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-amber-400 transition-colors cursor-pointer">
                  <div className="text-center">
                    <Mic className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-serif text-amber-800 font-bold mb-2">Voice Message</h3>
                    <p className="text-sm text-amber-600 mb-4">Record a personal audio message</p>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">Record Audio</Button>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-amber-600 font-serif italic">You can skip this step if you prefer a simple letter</p>
              </div>
            </div>
          )}

          {/* Step 5: Seal Letter */}
          {currentStep === "seal" && (
            <div>
              <h2 className="text-2xl font-serif text-amber-800 mb-6 text-center">Seal Your Letter</h2>
              <p className="text-amber-700 text-center mb-8 font-serif italic">"Add the final touch of authenticity"</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {sealStyles.map((seal) => (
                  <div
                    key={seal.id}
                    className={`cursor-pointer p-6 rounded-lg border-2 transition-all duration-300 text-center ${
                      sealStyle === seal.id
                        ? "border-amber-500 bg-amber-50 scale-105 shadow-xl"
                        : "border-gray-200 hover:border-amber-300 hover:bg-amber-25 hover:scale-102"
                    }`}
                    onClick={() => setSealStyle(seal.id)}
                  >
                    <div className="text-4xl mb-3">{seal.icon}</div>
                    <h3 className="font-serif text-amber-800 font-bold mb-2">{seal.name}</h3>
                    <p className="text-sm text-amber-600">{seal.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Finish */}
          {currentStep === "finish" && (
            <div className="text-center">
              <div className="mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-3xl font-serif text-amber-800 mb-4">Your Letter is Ready!</h2>
                <p className="text-amber-700 font-serif italic text-lg">
                  "A beautiful letter crafted with love and care"
                </p>
              </div>

              {/* Letter Preview */}
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 mb-8 max-w-md mx-auto">
                <h3 className="font-serif text-amber-800 font-bold mb-4">Letter Summary</h3>
                <div className="space-y-2 text-left text-sm">
                  <p>
                    <strong>Envelope:</strong> {envelopes.find((e) => e.id === selectedEnvelope)?.name}
                  </p>
                  <p>
                    <strong>Paper:</strong> {papers.find((p) => p.id === selectedPaper)?.name}
                  </p>
                  <p>
                    <strong>Content:</strong> {contentMethod === "scan" ? "Handwritten (Scanned)" : "Digital Writing"}
                  </p>
                  <p>
                    <strong>Attachments:</strong> {attachments.length > 0 ? `${attachments.length} files` : "None"}
                  </p>
                  <p>
                    <strong>Seal:</strong> {sealStyles.find((s) => s.id === sealStyle)?.name}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-6">
                <Button
                  onClick={() => handleFinish("send")}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Now
                </Button>
                <Button
                  onClick={() => handleFinish("save")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  <Archive className="w-5 h-5 mr-2" />
                  Save to Storage
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {currentStep !== "finish" && (
          <div className="flex justify-between mt-8">
            <Button
              onClick={prevStep}
              disabled={getCurrentStepIndex() === 0}
              className="bg-gray-600 hover:bg-gray-700 text-white disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={nextStep}
              disabled={!canGoNext()}
              className="bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
