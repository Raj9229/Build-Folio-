"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  const handleGetStarted = () => {
    const element = document.getElementById("build-profile")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-6 h-6 text-yellow-500 mr-2 animate-pulse" />
            <span className="text-sm font-medium text-gray-600 bg-white/50 px-3 py-1 rounded-full border">
              ✨ Professional Resume Builder
            </span>
            <Sparkles className="w-6 h-6 text-yellow-500 ml-2 animate-pulse delay-500" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-in fade-in-0 slide-in-from-bottom-6 duration-1000 delay-200">
            Build Your{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x bg-300% bg-gradient-to-r">
              Portfolio & Resume
            </span>{" "}
            in Minutes
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-bottom-8 duration-1000 delay-400">
            Create stunning portfolios and professional resumes that stand out. Perfect for students and job seekers
            ready to make their mark in the industry.
          </p>

          <div className="animate-in fade-in-0 slide-in-from-bottom-10 duration-1000 delay-600">
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-lg px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-32 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-1500"></div>
        <div className="absolute bottom-20 left-20 w-5 h-5 bg-indigo-400 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute bottom-32 right-10 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-500"></div>
      </div>
    </section>
  )
}
