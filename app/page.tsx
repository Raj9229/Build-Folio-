"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Share2, Zap, Save, AlertCircle } from "lucide-react"
import { Navigation } from "../components/navigation"
import { HeroSection } from "../components/hero-section"
import { TemplateSection } from "../components/template-section"
import { FormSection } from "../components/form-section"
import { TemplatePreview } from "../components/template-preview"
import { PasswordModal, type PasswordConfig } from "../components/password-modal"
import { PDFProgressModal } from "../components/pdf-progress-modal"
import { generatePortfolioHTML } from "../utils/pdf-generator"
import { useFormData } from "../hooks/useFormData"
import { usePDFGeneration } from "../hooks/usePDFGeneration"
import { useToast } from "../hooks/use-toast"
import { TEMPLATE_STYLES } from "../types/templates"
import { APP_CONFIG } from "../lib/constants"
import { useState } from "react"

export default function PortfolioResumeBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATE_STYLES[0])
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const {
    formData,
    isDirty,
    isValid,
    validationErrors,
    updateFormData,
    addEducation,
    removeEducation,
    addProject,
    removeProject,
    addExperience,
    removeExperience,
    updateSkills,
    saveToLocalStorage,
    loadFromLocalStorage,
  } = useFormData()

  const { isGenerating, progress, generatePDFWithProgress } = usePDFGeneration({
    onSuccess: () => {
      toast({
        title: "PDF Generated Successfully!",
        description: "Your professional resume has been downloaded.",
        variant: "success",
      })
      setShowPasswordModal(false)
    },
    onError: (error) => {
      toast({
        title: "PDF Generation Failed",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  // Auto-save functionality
  useEffect(() => {
    if (isDirty) {
      const timeoutId = setTimeout(() => {
        saveToLocalStorage()
      }, 2000)
      return () => clearTimeout(timeoutId)
    }
  }, [formData, isDirty, saveToLocalStorage])

  // Load saved data on mount
  useEffect(() => {
    const hasLoadedData = loadFromLocalStorage()
    if (hasLoadedData) {
      toast({
        title: "Welcome back!",
        description: "Your previous work has been restored.",
        variant: "success",
      })
    }
  }, [loadFromLocalStorage, toast])

  const handleDownloadPDF = () => {
    if (!isValid) {
      toast({
        title: "Please complete required fields",
        description: "Full name is required to generate your resume.",
        variant: "destructive",
      })
      return
    }
    setShowPasswordModal(true)
  }

  const handlePasswordConfirm = async (passwordConfig: PasswordConfig) => {
    if (!previewRef.current) return

    try {
      await generatePDFWithProgress(previewRef.current, formData, selectedTemplate, passwordConfig)
    } catch (error) {
      console.error("PDF generation failed:", error)
    }
  }

  const handlePublishPortfolio = async () => {
    if (!isValid) {
      toast({
        title: "Please complete required fields",
        description: "Full name is required to publish your portfolio.",
        variant: "destructive",
      })
      return
    }

    setIsPublishing(true)
    try {
      const portfolioHTML = generatePortfolioHTML(formData, selectedTemplate)
      const blob = new Blob([portfolioHTML], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${formData.fullName?.replace(/\s+/g, "_") || "Portfolio"}_Portfolio.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Portfolio Published!",
        description: "Your HTML portfolio has been downloaded successfully.",
        variant: "success",
      })
    } catch (error) {
      console.error("Portfolio publishing failed:", error)
      toast({
        title: "Publishing Failed",
        description: "Failed to publish portfolio. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPublishing(false)
    }
  }

  const handleSaveProgress = () => {
    saveToLocalStorage()
    toast({
      title: "Progress Saved!",
      description: "Your work has been saved locally.",
      variant: "success",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />
      <HeroSection />
      <TemplateSection selectedTemplate={selectedTemplate} onTemplateSelect={setSelectedTemplate} />

      {/* Form and Preview Section */}
      <section id="build-profile" className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-blue-50/50"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Build Your Profile</h2>
                <p className="text-gray-600 mb-4">
                  Fill in your information to create your personalized resume and portfolio
                </p>

                {/* Validation Status */}
                {validationErrors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center mb-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                      <span className="text-sm font-medium text-red-800">Please fix the following errors:</span>
                    </div>
                    <ul className="text-sm text-red-700 space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index}>• {error.message}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Auto-save indicator */}
                {isDirty && (
                  <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center">
                      <Save className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm text-blue-800">Auto-saving your progress...</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSaveProgress}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Save Now
                    </Button>
                  </div>
                )}
              </div>

              <FormSection
                formData={formData}
                validationErrors={validationErrors}
                onUpdate={updateFormData}
                onAddEducation={addEducation}
                onRemoveEducation={removeEducation}
                onAddProject={addProject}
                onRemoveProject={removeProject}
                onAddExperience={addExperience}
                onRemoveExperience={removeExperience}
                onUpdateSkills={updateSkills}
              />
            </div>

            {/* Preview Section */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                      Live Preview
                    </div>
                    <div className="text-sm text-gray-500">{selectedTemplate.name}</div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 max-h-96 overflow-y-auto border rounded-lg">
                    <TemplatePreview ref={previewRef} formData={formData} template={selectedTemplate} />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <div className="flex space-x-3">
                      <Button
                        onClick={handleDownloadPDF}
                        disabled={isGenerating || !isValid}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button
                        onClick={handlePublishPortfolio}
                        disabled={isPublishing || !isValid}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        {isPublishing ? "Publishing..." : "Publish Portfolio"}
                      </Button>
                    </div>

                    {!isValid && (
                      <p className="text-sm text-gray-500 text-center">Complete required fields to enable downloads</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onConfirm={handlePasswordConfirm}
        isGenerating={isGenerating}
      />

      <PDFProgressModal isOpen={isGenerating} progress={progress} isComplete={progress === 100} />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x bg-300%"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">{APP_CONFIG.name}</span>
          </div>
          <p className="text-gray-400 mb-4">{APP_CONFIG.description}</p>
          <p className="text-gray-300 mb-4">Made with ❤️ by {APP_CONFIG.author}</p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-blue-400 transition-colors duration-200 hover:scale-105 transform">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-200 hover:scale-105 transform">
              Terms of Service
            </a>
            <a
              href={APP_CONFIG.contact}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-200 hover:scale-105 transform"
            >
              Contact
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            © 2024 {APP_CONFIG.name}. All rights reserved. v{APP_CONFIG.version}
          </p>
        </div>
      </footer>
    </div>
  )
}
