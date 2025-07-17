"use client"

import { useState, useCallback } from "react"
import { generatePDF } from "../utils/pdf-generator"
import type { FormData } from "../types"
import type { PasswordConfig } from "../components/password-modal"
import type { TemplateStyle } from "../types/templates"

interface UsePDFGenerationOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function usePDFGeneration(options: UsePDFGenerationOptions = {}) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const generatePDFWithProgress = useCallback(
    async (element: HTMLElement, formData: FormData, template: TemplateStyle, passwordConfig?: PasswordConfig) => {
      if (!element) {
        throw new Error("Preview element not found")
      }

      setIsGenerating(true)
      setProgress(0)
      setError(null)

      try {
        // Simulate progress updates
        const progressInterval = setInterval(() => {
          setProgress((prev) => Math.min(prev + 10, 90))
        }, 200)

        await generatePDF(element, formData, template, passwordConfig)

        clearInterval(progressInterval)
        setProgress(100)

        // Track success analytics
        if (typeof window !== "undefined" && (window as any).gtag) {
          ;(window as any).gtag("event", "pdf_generated", {
            event_category: "engagement",
            event_label: template.name,
          })
        }

        options.onSuccess?.()
      } catch (err) {
        const error = err instanceof Error ? err : new Error("PDF generation failed")
        setError(error.message)

        // Track error analytics
        if (typeof window !== "undefined" && (window as any).gtag) {
          ;(window as any).gtag("event", "pdf_generation_error", {
            event_category: "error",
            event_label: error.message,
          })
        }

        options.onError?.(error)
        throw error
      } finally {
        setIsGenerating(false)
        setTimeout(() => setProgress(0), 1000)
      }
    },
    [options],
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isGenerating,
    progress,
    error,
    generatePDFWithProgress,
    clearError,
  }
}
