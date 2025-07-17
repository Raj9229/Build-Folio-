"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, FileText } from "lucide-react"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const handleGetStarted = () => {
    const element = document.getElementById("build-profile")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
              BuildFolio
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("templates")}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform"
            >
              Templates
            </button>
            <button
              onClick={() => scrollToSection("build-profile")}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform"
            >
              Resume
            </button>
            <button
              onClick={() => scrollToSection("build-profile")}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform"
            >
              Portfolio
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:bg-blue-50 transition-colors duration-200"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 transform rotate-180 transition-transform duration-200" />
              ) : (
                <Menu className="w-5 h-5 transform rotate-0 transition-transform duration-200" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1 text-left hover:bg-blue-50 rounded-md"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("templates")}
                className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1 text-left hover:bg-blue-50 rounded-md"
              >
                Templates
              </button>
              <button
                onClick={() => scrollToSection("build-profile")}
                className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1 text-left hover:bg-blue-50 rounded-md"
              >
                Resume
              </button>
              <button
                onClick={() => scrollToSection("build-profile")}
                className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1 text-left hover:bg-blue-50 rounded-md"
              >
                Portfolio
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
